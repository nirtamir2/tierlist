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
import { createMediaQuery } from "@solid-primitives/media";
import { clsx } from "clsx";
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import type { DraggableData } from "./DraggableData";
import type { DroppableData } from "./DroppableData";
import { Separator } from "./Separator";

const allowedEdges = ["left", "right"] satisfies Array<Edge>;

const isDebug = false;

export function DraggableItem(props: {
  id: string;
  tierId: string;
  tierIndex: number;
  itemIndex: number;
  text: string;
  imageSrc: string | undefined;
}) {
  let ref: HTMLDivElement = null!;
  const [isDragging, setIsDragging] = createSignal(false);
  const [isDropping, setIsDropping] = createSignal(false);
  const [droppingDirection, setDroppingDirection] = createSignal<Edge>("left");
  const isSmallScreen = createMediaQuery("(max-width: 767px)");

  createEffect(() => {
    const cleanup = combine(
      draggable({
        element: ref,
        getInitialData: ({ input, element }) => {
          const data: DraggableData = {
            itemId: props.id,
            tierId: props.tierId,
            tierIndex: props.tierIndex,
            itemIndex: props.itemIndex,
          };
          return attachClosestEdge(data, {
            input,
            element: element.children[1],
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
        getIsSticky: () => true,
        element: ref,
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
          const data: DroppableData<"item"> = {
            type: "item",
            droppableItemId: props.id,
            tierId: props.tierId,
            tierIndex: props.tierIndex,
            itemIndex: props.itemIndex,
          };
          return attachClosestEdge(data, {
            input,
            element: element.children[1],
            allowedEdges,
          });
        },
        onDropTargetChange: (args) => {
          const droppableData = args.self.data as DroppableData<"item">;
          // const draggableData = args.source.data as DraggableData;
          setIsDropping(droppableData.droppableItemId === props.id);
          const closestEdgeOfTarget = extractClosestEdge(droppableData);
          if (closestEdgeOfTarget != null) {
            setDroppingDirection(closestEdgeOfTarget);
          }
        },
      }),
    );
    onCleanup(cleanup);
  });

  const size = () => (isSmallScreen() ? 56 : 112);

  return (
    <div
      class={clsx(
        "relative flex h-full",
        isDragging() && "opacity-20",
        isDebug && [
          isDropping() && "border",
          isDropping() &&
            droppingDirection() === "left" &&
            "after:absolute after:content-['Left']",
          isDropping() &&
            droppingDirection() === "right" &&
            "after:absolute after:content-['Right']",
        ],
      )}
      ref={ref}
    >
      <Separator
        direction="left"
        isVisible={isDropping() && droppingDirection() === "left"}
      />
      <Show
        when={props.imageSrc}
        fallback={
          <div class="flex aspect-square size-14 cursor-pointer select-none items-center justify-center rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-800 to-gray-700 p-2 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-700 hover:to-gray-600 hover:shadow-md sm:size-28">
            {props.text}
          </div>
        }
        children={
          <img
            class="pointer-events-none aspect-square size-14 select-none rounded-xl object-fill drop-shadow-md sm:size-28"
            src={props.imageSrc}
            alt={props.text}
            height={size()}
            width={size()}
          />
        }
      />
      <Separator
        direction="right"
        isVisible={isDropping() && droppingDirection() === "right"}
      />
    </div>
  );
}
