import { Show } from "solid-js";

interface Props {
  imageSrc: string;
  title: string;
}
export function Card(props: Props) {
  return (
    <div class="group/card relative flex h-36 flex-col justify-between rounded-md p-4 shadow-inner shadow-white">
      <div class="absolute left-0 top-0 size-full transition duration-300 group-hover/card:bg-white/20" />
      <Show when={props.imageSrc}>
        <img src={props.imageSrc} alt={props.title} />
      </Show>
      <p class="relative z-10 truncate text-xl font-bold text-gray-50 md:text-2xl">
        {props.title}
      </p>
    </div>
  );
}
