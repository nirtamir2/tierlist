import { For, Show } from "solid-js";

type Tier = {
  id: string;
  name: string;
  color: string;
  items: Array<{
    id: string;
    text: string;
    imageSrc: string | undefined;
  }>;
};

export function TierList(props: { tiers: Array<Tier> }) {
  return (
    <ul class="flex flex-col gap-2">
      <For each={props.tiers}>
        {(tier) => (
          <li class="flex">
            <div
              class="flex min-h-32 min-w-16 items-center justify-center rounded-l-lg text-2xl font-bold sm:min-w-32"
              style={{
                "background-image": `linear-gradient(to right, ${tier.color}, color-mix(in lch, ${tier.color}, transparent 20%))`,
              }}
            >
              {tier.name}
            </div>
            <div
              class="grow rounded-r-lg bg-gradient-to-r from-gray-800 to-gray-700 p-2"
              style={{
                "box-shadow": `inset 0 2px 4px 0 color-mix(in lch, ${tier.color}, transparent 10%)`,
              }}
            >
              <div class="flex flex-wrap gap-2">
                <For each={tier.items}>
                  {(item) => (
                    <Show
                      when={item.imageSrc}
                      fallback={
                        <div class="flex aspect-square min-w-28 cursor-pointer items-center justify-center rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-700 to-gray-600 p-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-600 hover:to-gray-500 hover:shadow-md">
                          {item.text}
                        </div>
                      }
                    >
                      <img
                        class="aspect-square min-w-28 rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-700 to-gray-600 object-cover transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-600 hover:to-gray-500 hover:shadow-md"
                        src={item.imageSrc}
                        alt={item.text}
                        height={112}
                        width={112}
                      />
                    </Show>
                  )}
                </For>
              </div>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
