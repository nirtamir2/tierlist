import { clsx } from "clsx";
import { Show } from "solid-js";

export function Separator(props: {
  isVisible: boolean;
  direction: "left" | "right";
}) {
  return (
    <div class="pointer-events-none w-2 select-none">
      <Show when={props.isVisible}>
        <div
          class={clsx(
            "absolute h-full w-1 bg-white",
            props.direction === "left"
              ? "-left-1 translate-x-1/2"
              : "-right-1 -translate-x-1/2",
          )}
        />
      </Show>
    </div>
  );
}
