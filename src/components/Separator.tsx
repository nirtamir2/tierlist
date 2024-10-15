import { clsx } from "clsx";
import type { JSXElement } from "solid-js";
import { Show } from "solid-js";

export function Separator(props: {
  isVisible: boolean;
  direction: "left" | "right";
  size: number;
  item: JSXElement;
}) {
  return (
    <div class="pointer-events-none relative select-none">
      <div
        class={clsx(
          "transition-w opacity-25 duration-300",
          props.direction === "right" ? "translate-x-1" : "-translate-x-1",
          !props.isVisible && "w-2",
        )}
      >
        <Show when={props.isVisible}>{props.item}</Show>
      </div>
    </div>
  );
}
