import { createMediaQuery } from "@solid-primitives/media";
import { Show } from "solid-js";

export function TierItem(props: {
  imageSrc: string | undefined;
  text: string;
}) {
  const isSmallScreen = createMediaQuery("(max-width: 767px)");
  const size = () => (isSmallScreen() ? 56 : 112);

  return (
    <Show
      when={props.imageSrc}
      fallback={
        <div class="flex aspect-square size-14 cursor-pointer select-none items-center justify-center rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-800 to-gray-700 p-2 text-center transition-all duration-300 ease-in-out hover:from-gray-700 hover:to-gray-600 hover:shadow-md sm:size-28">
          {props.text}
        </div>
      }
      children={
        <img
          class="pointer-events-none aspect-square size-14 select-none rounded-xl object-fill drop-shadow-md sm:size-28"
          src={props.imageSrc}
          alt={props.text}
          height={size()}
          width={size()}
        />
      }
    />
  );
}
