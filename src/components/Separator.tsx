import { clsx } from "clsx";

export function Separator(props: { isVisible: boolean }) {
  return (
    <div
      class={clsx("transition-[width]", props.isVisible ? "size-28" : "w-0")}
    />
  );
}
