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
    <ul class="flex flex-col gap-2 bg-gray-800">
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
                "background-image": `linear-gradient(
                to bottom,
                color-mix(in lch, ${tier.color}, transparent 80%),
                color-mix(in lch, ${tier.color}, transparent 99%)
                )`,
              }}
            >
              <ul class="flex flex-wrap gap-2">
                <For each={tier.items}>
                  {(item) => (
                    <li>
                      <Show
                        when={item.imageSrc}
                        fallback={
                          <div class="flex aspect-square min-w-28 cursor-pointer items-center justify-center rounded-xl border-4 border-transparent bg-gradient-to-r from-gray-800 to-gray-700 p-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-700 hover:to-gray-600 hover:shadow-md">
                            {item.text}
                          </div>
                        }
                      >
                        <img
                          class="aspect-square min-w-28 rounded-xl object-fill drop-shadow-md"
                          src={item.imageSrc}
                          alt={item.text}
                          height={112}
                          width={112}
                        />
                      </Show>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
