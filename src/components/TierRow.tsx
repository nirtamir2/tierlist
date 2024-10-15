import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { clsx } from "clsx";
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import type { TierData } from "../server/hello/TierData";
import { DraggableItem } from "./DraggableItem";
import type { DroppableData } from "./DroppableData";

export function TierRow(props: { index: number; tier: TierData }) {
  let tierRef: HTMLDivElement = null!;
  const [isDropping, setIsDropping] = createSignal(false);

  createEffect(() => {
    const cleanup = combine(
      dropTargetForElements({
        element: tierRef,
        onDragLeave: () => {
          setIsDropping(false);
        },
        onDragEnter: () => {
          setIsDropping(true);
        },
        getData: () => {
          const data: DroppableData<"tier"> = {
            type: "tier",
            droppableItemId: null,
            tierId: props.tier.id,
            tierIndex: props.index,
            itemIndex: null,
          };
          return data;
        },
        onDropTargetChange: (args) => {
          const droppableData = args.self.data as DroppableData<"tier">;
          setIsDropping(droppableData.tierId === props.tier.id);
        },
      }),
    );
    onCleanup(cleanup);
  });

  return (
    <div
      ref={tierRef}
      class={clsx(
        "grow rounded-r-lg border bg-gradient-to-r from-gray-800 to-gray-700 p-2",
        isDropping() ? "border-white" : "border-transparent",
      )}
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
        <For
          each={props.tier.items}
          children={(item, index) => (
            <DraggableItem
              itemIndex={index()}
              tierId={props.tier.id}
              tierIndex={props.index}
              text={item.text}
              id={item.id}
              imageSrc={item.imageSrc}
            />
          )}
        />
      </ul>
    </div>
  );
}
