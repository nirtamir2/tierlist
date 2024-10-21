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
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import { clsx } from "clsx";
import { For, createUniqueId } from "solid-js";
import { Portal } from "solid-js/web";
import type { TierData } from "../../server/hello/TierData";
import { TierItem } from "../TierItem";
import { TIERS_BANK_ID } from "./TIERS_BANK_ID";
import { useTiersContext } from "./TiersContext";
import { containersFromTiersStore } from "./containersFromTiersStore";
import { getTierItemIdToTierDataRecord } from "./getTierItemIdToTierDataRecord";

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      droppable: boolean;
      sortable: boolean;
    }
  }
}

const Sortable = (props: {
  id: string;
  text: string;
  imageSrc: string | undefined;
}) => {
  const dragDropContext = useDragDropContext();

  if (dragDropContext == null) {
    throw new Error("Sortable: DragDropProvider not provided");
  }

  const [dragDropContextState] = dragDropContext;

  function id() {
    return props.id;
  }

  const sortable = createSortable(id());
  return (
    <div
      use:sortable
      class={clsx(
        "relative flex h-full touch-none will-change-[transform,_opacity]",
        sortable.isActiveDraggable && "opacity-20",
        dragDropContextState.active.draggable != null &&
          "transition-[transform,_opacity]",
      )}
    >
      <TierItem imageSrc={props.imageSrc} text={props.text} />
    </div>
  );
};

function getTierIds(tier: TierData) {
  return tier.items.map((tier) => tier.id);
}
function TiersDroppableItemsRow(props: { tier: TierData; id: string }) {
  function id() {
    return props.id;
  }

  const droppable = createDroppable(id());

  return (
    <div
      use:droppable
      class="size-full rounded-r-lg border bg-gradient-to-r from-gray-800 to-gray-700 p-2"
      style={{
        "border-color": props.tier.color,
        "box-shadow": `inset 0 2px 4px 0 color-mix(in lch, ${props.tier.color}, transparent 10%)`,
        "background-image": `linear-gradient(
                to bottom,
                color-mix(in lch, ${props.tier.color}, transparent 80%),
                color-mix(in lch, ${props.tier.color}, transparent 99%)
                )`,
      }}
    >
      <ul class="flex min-h-16 flex-wrap gap-y-4 sm:min-h-28">
        <SortableProvider ids={getTierIds(props.tier)}>
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
      <div class="flex-1 grow">
        <TiersDroppableItemsRow tier={props.tier} id={props.id} />
      </div>
    </div>
  );
};

function _TierList() {
  const [tiersStore, { updateTiers }] = useTiersContext();

  const bankElementId = createUniqueId();

  const containerIds = () => Object.keys(containersFromTiersStore(tiersStore));

  const isContainer = (id: string) => containerIds().includes(id);

  const getContainer = (id: string) => {
    for (const [key, items] of Object.entries(
      containersFromTiersStore(tiersStore),
    )) {
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
      const containerItemIds =
        containersFromTiersStore(tiersStore)[closestContainer.id];
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
      updateTiers({
        droppableContainer,
        draggableId,
        droppableId,
        draggableContainer,
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
    <ul class="flex flex-col gap-2">
      <DragDropProvider
        collisionDetector={closestContainerOrItem}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <DragDropSensors />
        <For each={containerIds()}>
          {(id) => {
            const tier = tiersStore.tiers.find((tier) => tier.id === id);
            if (tier == null) {
              return null;
            }

            if (id === TIERS_BANK_ID) {
              return (
                <Portal mount={document.querySelector(`#${bankElementId}`)!}>
                  <div class="flex max-h-36 min-h-32 w-full overflow-auto rounded border bg-gray-800">
                    <div class="min-w-16 sm:min-w-32" />
                    <TiersDroppableItemsRow id={id} tier={tier} />
                  </div>
                </Portal>
              );
            }

            return (
              <li class="flex bg-gray-800">
                <TierRow id={id} tier={tier} />
              </li>
            );
          }}
        </For>
        <DragOverlay>
          {(draggable) => {
            if (draggable == null || typeof draggable.id !== "string") {
              return null;
            }
            const item = getTierItemIdToTierDataRecord(tiersStore.tiers)[
              draggable.id
            ];

            if (item == null) {
              return null;
            }

            return (
              <div class="flex w-full">
                <TierItem imageSrc={item.imageSrc} text={item.text} />
              </div>
            );
          }}
        </DragOverlay>
        <div class="sticky bottom-0 w-full" id={bankElementId} />
      </DragDropProvider>
    </ul>
  );
}

export default _TierList;
