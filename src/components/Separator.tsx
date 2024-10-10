import { clsx } from "clsx";

export function Separator(props: { isVisible: boolean }) {
  return (
    // <div class={clsx("transition-[width]", props.isVisible ? "size-28" : "w-0")} />
    <div
      class={clsx(
        "h-full w-4 bg-red-200",
        props.isVisible ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
