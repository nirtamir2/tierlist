import { clsx } from "clsx";

export function Separator(props: { isVisible: boolean }) {
  return (
    <div
      class={clsx(
        "pointer-events-none w-1 select-none",
        props.isVisible ? "bg-white" : "bg-transparent",
      )}
    />
  );
}
