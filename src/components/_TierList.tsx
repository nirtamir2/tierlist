import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { scrollJustEnoughIntoView } from "@atlaskit/pragmatic-drag-and-drop/element/scroll-just-enough-into-view";
import { clsx } from "clsx";
import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { unwrap } from "solid-js/store";
import type { TierData } from "../server/hello/TierData";

type Tier = {
  id: string;
  name: string;
  color: string;
  items: Array<{
    id: string;
    text: string;
    imageSrc: string | undefined;
  }>;
};

type DraggableData = {
  itemId: string;
  tierId: string;
};

type DroppableeData = {
  droppableItemId: string;
  tierId: string;
};

const allowedEdges = ["left", "right"] satisfies Array<Edge>;

function getUpdatedData(data: {
  allData: Array<TierData>;
  draggableData: DraggableData;
  droppableData: DroppableeData;
  closestEdgeOfTarget: Edge;
}): Array<TierData> {
  const { draggableData, droppableData, closestEdgeOfTarget } = data;
  const allData = unwrap(data.allData);
  const fromTier = allData.find((item) => item.id === draggableData.tierId);
  if (fromTier == null) {
    throw new Error("Not valid");
  }
  const removeItem = fromTier.items.find(
    (item) => item.id === draggableData.itemId,
  );
  if (removeItem == null) {
    throw new Error("Not valid");
  }
  const removeIndex = fromTier.items.indexOf(removeItem);
  if (removeIndex === -1) {
    throw new Error("Not valid");
  }

  const toTier = allData.find((item) => item.id === droppableData.tierId);
  if (toTier == null) {
    throw new Error("Not valid");
  }

  const dropItem = toTier.items.find(
    (item) => item.id === droppableData.droppableItemId,
  );

  if (dropItem == null) {
    throw new Error("Not valid");
  }

  const dropIndex = toTier.items.indexOf(dropItem);

  if (dropIndex === -1) {
    throw new Error("Not valid");
  }

  fromTier.items.splice(removeIndex, 1);
  toTier.items.splice(
    closestEdgeOfTarget === "right"
      ? Math.min(dropIndex + 1, allData.length - 1)
      : dropIndex,
    0,
    removeItem,
  );

  return allData;
}

function DraggableItem(props: {
  id: string;
  tierId: string;
  text: string;
  imageSrc: string | undefined;
  allData: Array<TierData>;
}) {
  let ref: HTMLDivElement | HTMLImageElement = null!;
  let dropRef: HTMLDivElement = null!;
  const [isDragging, setIsDragging] = createSignal(false);
  const [isDropping, setIsDropping] = createSignal(false);
  const [droppingDirection, setDroppingDirection] = createSignal<Edge>("left");

  createEffect(() => {
    const cleanup = combine(
      draggable({
        element: ref,
        getInitialData: ({ input, element }) => {
          const data: DraggableData = {
            itemId: props.id,
            tierId: props.tierId,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges,
          });
        },
        onGenerateDragPreview({ source }) {
          scrollJustEnoughIntoView({ element: source.element });
        },
        onDragStart: () => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
      }),
      dropTargetForElements({
        element: dropRef,
        canDrop: ({ source }) => {
          const draggableData = source.data as DraggableData;
          // Make sure not to allow dragging to the same element
          return draggableData.itemId !== props.id;
        },
        onDragLeave: () => {
          setIsDropping(false);
        },
        onDragEnter: () => {
          setIsDropping(true);
        },
        getData: ({ input, element }) => {
          // your base data you want to attach to the drop target
          const data: DroppableeData = {
            droppableItemId: props.id,
            tierId: props.tierId,
          };
          // this will 'attach' the closest edge to your `data` object
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges,
          });
        },
        onDropTargetChange: (args) => {
          const droppableData = args.self.data as DroppableeData;
          // const draggableData = args.source.data as DraggableData;
          setIsDropping(droppableData.droppableItemId === props.id);
          const closestEdgeOfTarget = extractClosestEdge(droppableData);
          if (closestEdgeOfTarget != null) {
            setDroppingDirection(closestEdgeOfTarget);
          }
        },
        onDrop: (args) => {
          const closestEdgeOfTarget: Edge | null =
            extractClosestEdge(args.self.data) ?? "left";
          const droppableData = args.self.data as DroppableeData;
          const draggableData = args.source.data as DraggableData;
          setIsDropping(false);
          setIsDragging(false);

          const updatedData = getUpdatedData({
            allData: props.allData,
            draggableData,
            droppableData,
            closestEdgeOfTarget,
          });

          // eslint-disable-next-line no-console
          console.log("updatedData", updatedData);
        },
      }),
    );
    onCleanup(cleanup);
  });

  return (
    <div
      class={clsx(
        isDragging() && "opacity-20",
        isDropping() && "border",
        isDropping() &&
          droppingDirection() === "left" &&
          "after:absolute after:content-['Left']",
        isDropping() &&
          droppingDirection() === "right" &&
          "after:absolute after:content-['Right']",
      )}
      ref={dropRef}
    >
      <Show
        when={props.imageSrc}
        fallback={
          <div
            ref={ref}
            class="flex aspect-square min-w-28 cursor-pointer items-center justify-center rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-800 to-gray-700 p-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-700 hover:to-gray-600 hover:shadow-md"
          >
            {props.text}
          </div>
        }
      >
        <img
          ref={ref}
          class="aspect-square min-w-28 rounded-xl object-fill drop-shadow-md"
          src={props.imageSrc}
          alt={props.text}
          height={112}
          width={112}
        />
      </Show>
    </div>
  );
}

export default function _TierList(props: { tiers: Array<Tier> }) {
  return (
    <ul class="flex flex-col gap-2 bg-gray-800">
      <For each={props.tiers}>
        {(tier) => (
          <li class="flex">
            <div
              class="flex min-h-32 min-w-16 items-center justify-center rounded-l-lg text-2xl font-bold sm:min-w-32"
              style={{
                "background-image": `linear-gradient(to right, ${tier.color}, color-mix(in lch, ${tier.color}, transparent 20%))`,
              }}
            >
              {tier.name}
            </div>
            <div
              class="grow rounded-r-lg bg-gradient-to-r from-gray-800 to-gray-700 p-2"
              style={{
                "box-shadow": `inset 0 2px 4px 0 color-mix(in lch, ${tier.color}, transparent 10%)`,
                "background-image": `linear-gradient(
                to bottom,
                color-mix(in lch, ${tier.color}, transparent 80%),
                color-mix(in lch, ${tier.color}, transparent 99%)
                )`,
              }}
            >
              <ul class="flex flex-wrap gap-2">
                <For each={tier.items}>
                  {(item) => (
                    <li>
                      <DraggableItem
                        allData={props.tiers}
                        tierId={tier.id}
                        text={item.text}
                        id={item.id}
                        imageSrc={item.imageSrc}
                      />
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
