import { createMediaQuery } from "@solid-primitives/media";
import type {
  CollisionDetector,
  DragEvent,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  closestCenter,
  createDroppable,
  createSortable,
} from "@thisbeyond/solid-dnd";
import { clsx } from "clsx";
import { For, batch } from "solid-js";
import { createStore } from "solid-js/store";
import type { TierData } from "../server/hello/TierData";
import { mockTiers } from "../server/hello/mockTiers";
import { TierItem } from "./TierItem";

const Sortable = (props: {
  id: string;
  text: string;
  imageSrc: string | undefined;
}) => {
  function id() {
    return props.id;
  }

  const sortable = createSortable(id());
  const isSmallScreen = createMediaQuery("(max-width: 767px)");
  const size = () => (isSmallScreen() ? 56 : 112);
  return (
    <div
      use:sortable
      class={clsx(
        "relative flex h-full",
        // sortable.isActiveDraggable && !sortable.isActiveDraggable() && "hidden",
        sortable.isActiveDraggable && "opacity-20",
        // isDebug && [
        //   isDropping() && "border",
        //   isDropping() &&
        //     droppingDirection() === "left" &&
        //     "after:absolute after:content-['Left']",
        //   isDropping() &&
        //     droppingDirection() === "right" &&
        //     "after:absolute after:content-['Right']",
        // ],
      )}
    >
      <TierItem imageSrc={props.imageSrc} text={props.text} size={size()} />
    </div>
  );
};

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      droppable: boolean;
      sortable: boolean;
    }
  }
}

function TiersDroppableItemsRow(props: { tier: TierData; id: string }) {
  function id() {
    return props.id;
  }

  const droppable = createDroppable(id());
  function tierIds() {
    return props.tier.items.map((tier) => tier.id);
  }

  return (
    <div
      use:droppable
      class={
        "grow rounded-r-lg border bg-gradient-to-r from-gray-800 to-gray-700 p-2"
      }
      style={{
        "box-shadow": `inset 0 2px 4px 0 color-mix(in lch, ${props.tier.color}, transparent 10%)`,
        "background-image": `linear-gradient(
                to bottom,
                color-mix(in lch, ${props.tier.color}, transparent 80%),
                color-mix(in lch, ${props.tier.color}, transparent 99%)
                )`,
      }}
    >
      <ul class="flex flex-wrap gap-y-4">
        <SortableProvider ids={tierIds()}>
          <For each={props.tier.items}>
            {(item) => {
              return (
                <Sortable
                  id={item.id}
                  imageSrc={item.imageSrc}
                  text={item.text}
                />
              );
            }}
          </For>
        </SortableProvider>
      </ul>
    </div>
  );
}

const TierRow = (props: { tier: TierData; id: string }) => {
  return (
    <div class="flex w-full">
      <div
        class="flex min-h-32 min-w-16 items-center justify-center rounded-l-lg text-2xl font-bold sm:min-w-32"
        style={{
          "background-image": `linear-gradient(to right, ${props.tier.color}, color-mix(in lch, ${props.tier.color}, transparent 20%))`,
        }}
      >
        {props.tier.name}
      </div>
      <TiersDroppableItemsRow tier={props.tier} id={props.id} />
    </div>
  );
};

function error() {
  throw new Error("Not implemented");
}

export const TierList2 = () => {
  const [tiersStore, setTiersStore] = createStore<{ tiers: Array<TierData> }>({
    tiers: mockTiers,
  });

  function containersFromTiersStore() {
    return Object.fromEntries(
      tiersStore.tiers.map((tier) => [
        tier.id,
        tier.items.map((tier) => tier.id),
      ]),
    );
  }

  const tierItemIdToToTierDataRecord = () =>
    Object.fromEntries(
      tiersStore.tiers.flatMap((tier) => {
        return tier.items.map((item) => {
          return [item.id, item];
        });
      }),
    );

  const tierItemIdToTierData = (id: string) => {
    return tierItemIdToToTierDataRecord()[id];
  };

  const containerIds = () => Object.keys(containersFromTiersStore());

  const isContainer = (id: string) => containerIds().includes(id);

  const getContainer = (id: string) => {
    for (const [key, items] of Object.entries(containersFromTiersStore())) {
      if (items.includes(id)) {
        return key;
      }
    }
    return null;
  };

  const closestContainerOrItem: CollisionDetector = (
    draggable,
    droppables,
    context,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const draggableId = draggable.id;
    if (typeof draggableId !== "string") {
      return null;
    }

    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => {
        return typeof droppable.id === "string" && isContainer(droppable.id);
      }),
      context,
    );
    if (closestContainer) {
      const containerItemIds = containersFromTiersStore()[closestContainer.id];
      if (containerItemIds == null) {
        return null;
      }
      const closestItem = closestCenter(
        draggable,
        droppables.filter(
          (droppable) =>
            typeof droppable.id === "string" &&
            containerItemIds.includes(droppable.id),
        ),
        context,
      );
      if (!closestItem) {
        return closestContainer;
      }

      if (getContainer(draggableId) !== closestContainer.id) {
        const isLastItem =
          typeof closestItem.id === "string" &&
          containerItemIds.indexOf(closestItem.id) ===
            containerItemIds.length - 1;

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y;

          if (belowLastItem) {
            return closestContainer;
          }
        }
      }
      return closestItem;
    }
    return null;
  };

  function getIndex(containerItemIds: Array<string>, droppableId: string) {
    const index = containerItemIds.indexOf(droppableId);
    if (index === -1) {
      return containerItemIds.length;
    }
    return index;
  }

  const move = (
    draggable: NonNullable<DragEvent["draggable"]>,
    droppable: NonNullable<DragEvent["droppable"]>,
    onlyWhenChangingContainer: boolean,
  ) => {
    const draggableId = draggable.id;
    const droppableId = droppable.id;
    if (typeof droppableId !== "string") {
      return;
    }
    if (typeof draggableId !== "string") {
      return;
    }
    const draggableContainer = getContainer(draggableId);

    const droppableContainer = isContainer(droppableId)
      ? droppableId
      : getContainer(droppableId);

    if (droppableContainer == null || draggableContainer == null) {
      return;
    }

    if (
      draggableContainer !== droppableContainer ||
      !onlyWhenChangingContainer
    ) {
      const containerItemIds = containersFromTiersStore()[droppableContainer];
      if (containerItemIds == null) {
        return;
      }

      const draggableTierItemData = tierItemIdToToTierDataRecord()[draggableId];
      if (draggableTierItemData == null) {
        return;
      }

      batch(() => {
        const index = getIndex(containerItemIds, droppableId);
        const draggableTierIndex = tiersStore.tiers.findIndex(
          (tier) => tier.id === draggableContainer,
        );
        const droppableTierIndex = tiersStore.tiers.findIndex(
          (tier) => tier.id === droppableContainer,
        );

        setTiersStore("tiers", draggableTierIndex, "items", (items) => {
          // eslint-disable-next-line sonarjs/no-nested-functions
          return items.filter((item) => item.id !== draggableId);
        });

        setTiersStore("tiers", droppableTierIndex, "items", (items) => {
          return [
            ...items.slice(0, index),
            draggableTierItemData,
            ...items.slice(index),
          ];
        });
      });
    }
  };

  const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, true);
    }
  };

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false);
    }
  };

  return (
    <ul class="flex flex-col gap-2 bg-gray-800">
      <DragDropProvider
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetector={closestContainerOrItem}
      >
        <DragDropSensors />
        <For each={containerIds()}>
          {(key) => {
            const tier = tiersStore.tiers.find((tier) => tier.id === key);
            if (tier == null) {
              return null;
            }
            return (
              <li class="flex">
                <TierRow id={key} tier={tier} />
              </li>
            );
          }}
        </For>
        <DragOverlay>
          {(draggable) => {
            if (draggable == null || typeof draggable.id !== "string") {
              error();
              return null;
            }
            const item = tierItemIdToTierData(draggable.id);

            if (item == null) {
              error();
              return null;
            }

            return (
              <div class="flex w-full">
                <TierItem imageSrc={item.imageSrc} text={item.text} size={16} />
              </div>
            );
          }}
        </DragOverlay>
      </DragDropProvider>
    </ul>
  );
};

export default TierList2;
