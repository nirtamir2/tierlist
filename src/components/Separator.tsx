import { clsx } from "clsx";

export function Separator(props: {
  isVisible: boolean;
  direction: "left" | "right";
}) {
  return (
    <div class="pointer-events-none relative select-none">
      <div
        class={clsx(
          "transition-w duration-300",
          props.isVisible ? "w-36" : "w-2",
        )}
      />
    </div>
  );
}
