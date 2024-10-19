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
import { createEffect, createSignal, onCleanup } from "solid-js";
import { Separator } from "../Separator";
import { TierItem } from "../TierItem";
import type { DraggableData } from "./DraggableData";
import type { DroppableData } from "./DroppableData";

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
            element,
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
    <>
      <Separator
        size={size()}
        direction="left"
        isVisible={isDropping() ? droppingDirection() === "left" : null}
        item={<TierItem imageSrc="" text="LEFT" size={size()} />}
      />
      <div
        ref={ref}
        class={clsx(
          "relative flex h-full",
          isDragging() && !isDropping() && "hidden",
          isDragging() && isDropping() && "opacity-20",
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
      >
        <TierItem imageSrc={props.imageSrc} text={props.text} size={size()} />
      </div>
      <Separator
        size={size()}
        direction="right"
        isVisible={isDropping() ? droppingDirection() === "right" : null}
        item={<TierItem imageSrc="" text="RIGHT" size={size()} />}
      />
    </>
  );
}
