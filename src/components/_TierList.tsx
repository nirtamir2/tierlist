import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { For, createEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import type { TierData } from "../server/hello/TierData";
import { mockTiers } from "../server/hello/mockTiers";
import type { DraggableData } from "./DraggableData";
import type { DroppableData } from "./DroppableData";
import { TierRow } from "./TierRow";

export default function _TierList() {
  const [tiersStore, setTiersStore] = createStore<{ tiers: Array<TierData> }>({
    tiers: mockTiers,
  });

  function reorderItem({
    finishIndex,
    startIndex,
    tierId,
  }: {
    finishIndex: number;
    startIndex: number;
    tierId: string;
  }) {
    setTiersStore((prevData) => {
      return {
        tiers: prevData.tiers.map((tier) => {
          if (tier.id !== tierId) {
            return tier;
          }
          return {
            ...tier,
            items: reorder({
              list: tier.items,
              startIndex,
              finishIndex,
            }),
          };
        }),
      };
    });
  }

  function moveItemToOtherTier({
    startTierId,
    finishTierId,
    itemIndexInStartColumn,
    itemIndexInFinishColumn,
  }: {
    finishTierId: string;
    itemIndexInStartColumn: number;
    itemIndexInFinishColumn: number;
    startTierId: string;
  }) {
    setTiersStore((prevData) => {
      const sourceTier = prevData.tiers.find((tier) => tier.id === startTierId);
      const destinationTier = prevData.tiers.find(
        (tier) => tier.id === finishTierId,
      );
      const item = sourceTier.items[itemIndexInStartColumn];

      const destinationItems = [...destinationTier.items];
      destinationItems.splice(itemIndexInFinishColumn, 0, item);

      return {
        tiers: prevData.tiers.map((tier) => {
          if (tier.id === startTierId) {
            return {
              ...tier,
              // eslint-disable-next-line sonarjs/no-nested-functions
              items: tier.items.filter((i) => i.id !== item.id),
            };
          }
          if (tier.id === finishTierId) {
            return {
              ...tier,
              items: destinationItems,
            };
          }
          return tier;
        }),
      };
    });
  }

  createEffect(() => {
    const cleanup = combine(
      monitorForElements({
        onDrop: (args) => {
          const { location, source } = args;

          // didn't drop on anything
          if (location.current.dropTargets.length === 0) {
            return;
          }

          const draggableData = source.data as DraggableData;

          const { itemId } = draggableData;
          // TODO: these lines not needed if item has columnId on it
          const [startTier] = location.initial.dropTargets;

          const startTierData = startTier.data as DroppableData<"tier">;
          const sourceId = startTierData.tierId;
          const sourceTier = tiersStore.tiers.find(
            (tier) => tier.id === sourceId,
          );
          const itemIndex = sourceTier.items.findIndex(
            (item) => item.id === itemId,
          );

          // Drop on tier without card
          if (location.current.dropTargets.length === 1) {
            const [destinationTier] = location.current.dropTargets;
            const destinationTierData =
              destinationTier.data as DroppableData<"tier">;
            const destinationTierId = destinationTierData.tierId;
            const destinationColumn = tiersStore.tiers.find(
              (tier) => tier.id === destinationTierId,
            );
            // reordering in same column
            if (sourceTier === destinationColumn) {
              const destinationIndex = getReorderDestinationIndex({
                startIndex: itemIndex,
                indexOfTarget: sourceTier.items.length - 1,
                closestEdgeOfTarget: null,
                axis: "horizontal",
              });
              reorderItem({
                tierId: sourceTier.id,
                startIndex: itemIndex,
                finishIndex: destinationIndex,
              });
              return;
            }
            // moving to a new column
            moveItemToOtherTier({
              itemIndexInStartColumn: itemIndex,
              itemIndexInFinishColumn: destinationColumn.items.length, //put it as the end
              startTierId: sourceTier.id,
              finishTierId: destinationColumn.id,
            });
            return;
          }
          // dropping in a column (relative to a card)
          if (location.current.dropTargets.length === 2) {
            const [destinationItemRecord, destinationTierRecord] =
              location.current.dropTargets;
            const destinationTierData =
              destinationTierRecord.data as DroppableData<"tier">;
            const destinationTierId = destinationTierData.tierId;

            const destinationItemData =
              destinationItemRecord.data as DroppableData<"item">;

            const destinationTier = tiersStore.tiers.find(
              (tier) => tier.id === destinationTierId,
            );
            const indexOfTarget = destinationTier.items.findIndex(
              (item) => item.id === destinationItemData.droppableItemId,
            );
            const closestEdgeOfTarget: Edge | null =
              extractClosestEdge(destinationItemData);
            // case 1: ordering in the same column
            if (sourceTier === destinationTier) {
              const destinationIndex = getReorderDestinationIndex({
                startIndex: itemIndex,
                indexOfTarget,
                closestEdgeOfTarget,
                axis: "horizontal",
              });
              reorderItem({
                tierId: sourceTier.id,
                startIndex: itemIndex,
                finishIndex: destinationIndex,
              });
              return;
            }
            // case 2: moving into a new column relative to a card
            const destinationIndex =
              closestEdgeOfTarget === "bottom"
                ? indexOfTarget + 1
                : indexOfTarget;
            moveItemToOtherTier({
              itemIndexInStartColumn: itemIndex,
              startTierId: sourceTier.id,
              finishTierId: destinationTier.id,
              itemIndexInFinishColumn: destinationIndex,
            });
          }
        },
      }),
    );
    onCleanup(cleanup);
  });

  return (
    <ul class="flex flex-col gap-2 bg-gray-800">
      <For
        each={tiersStore.tiers}
        children={(tier, index) => (
          <li class="flex">
            <div
              class="flex min-h-32 min-w-16 items-center justify-center rounded-l-lg text-2xl font-bold sm:min-w-32"
              style={{
                "background-image": `linear-gradient(to right, ${tier.color}, color-mix(in lch, ${tier.color}, transparent 20%))`,
              }}
            >
              {tier.name}
            </div>
            <TierRow index={index()} tier={tier} />
          </li>
        )}
      />
    </ul>
  );
}
