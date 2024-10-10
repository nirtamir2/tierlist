import { clsx } from "clsx";

export function Separator(props: { isVisible: boolean }) {
  return (
    <div
      class={clsx(
        "pointer-events-none select-none transition-[width]",
        props.isVisible ? "size-14" : "w-0",
      )}
    />
  );
}
