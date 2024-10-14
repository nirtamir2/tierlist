import { Show } from "solid-js";

interface Props {
  imageSrc: string;
  title: string;
  href: string;
}
export function Card(props: Props) {
  return (
    <a
      href={props.href}
      class="group/card relative flex h-36 flex-col justify-between overflow-hidden rounded-md border border-gray-900 bg-transparent shadow-inner shadow-white transition duration-300 hover:bg-white/20"
    >
      <div class="absolute left-0 top-0 size-full bg-gradient-to-b from-transparent to-gray-800" />
      <Show when={props.imageSrc}>
        <img
          src={props.imageSrc}
          alt={props.title}
          class="-z-10 size-full object-cover transition group-hover/card:scale-105"
        />
      </Show>
      <p class="absolute bottom-0 left-0 z-10 truncate p-4 text-xl font-bold text-gray-50 drop-shadow md:text-2xl">
        {props.title}
      </p>
    </a>
  );
}
