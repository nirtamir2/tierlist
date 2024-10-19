import { createMediaQuery } from "@solid-primitives/media";
import { clsx } from "clsx";
import type { JSXElement } from "solid-js";
import { Show } from "solid-js";

export function Separator(props: {
  isVisible: boolean;
  direction: "left" | "right";
  size: number;
  item: JSXElement;
}) {
  const isSmallScreen = createMediaQuery("(max-width: 767px)");
  return (
    <div class="pointer-events-none relative select-none">
      <div
        class={clsx(
          "opacity-40 transition-[width] duration-300",
          !isSmallScreen() && [
            props.direction === "right" ? "translate-x-1" : "-translate-x-1",
          ],
        )}
        style={
          props.isVisible
            ? {
                width: `${props.size}px`,
              }
            : {
                width: isSmallScreen() ? `0px` : "8px",
              }
        }
      >
        <Show when={props.isVisible}>{props.item}</Show>
      </div>
    </div>
  );
}
