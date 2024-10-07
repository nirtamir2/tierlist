import { For, Show } from "solid-js";

const tiers = [
  {
    id: "S",
    color: "#DC2626",
    items: [
      {
        text: "Item 1",
        imageSrc:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
      },
      {
        text: "Item 2",
        imageSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QZ5W67MtcDA25ERyU7Z-Jd2pIp-aDVB_pg&s",
      },
      { text: "Item 3", imageSrc: undefined },
    ],
  },
  {
    id: "A",
    color: "#EA580D",
    items: [
      { text: "Item 4", imageSrc: undefined },
      { text: "Item 5", imageSrc: undefined },
      { text: "Item 6", imageSrc: undefined },
    ],
  },
  {
    id: "B",
    color: "#CA8A05",
    items: [
      { text: "Item 7", imageSrc: undefined },
      { text: "Item 8", imageSrc: undefined },
      { text: "Item 81", imageSrc: undefined },
      { text: "Item 82", imageSrc: undefined },
      { text: "Item 7", imageSrc: undefined },
      { text: "Item 8", imageSrc: undefined },
      { text: "Item 81", imageSrc: undefined },
      { text: "Item 82", imageSrc: undefined },
    ],
  },
  {
    id: "C",
    color: "#12A34A",
    items: [
      { text: "Item 9", imageSrc: undefined },
      { text: "Item 10", imageSrc: undefined },
    ],
  },
  {
    id: "D",
    color: "#2563EB",
    items: [{ text: "Item 11", imageSrc: undefined }],
  },
  {
    id: "F",
    color: "#9333EA",
    items: [{ text: "Item 12", imageSrc: undefined }],
  },
];

export function TierList() {
  return (
    <ul class="flex flex-col gap-2">
      <For each={tiers}>
        {(tier) => (
          <li class="flex">
            <div
              class="flex min-h-32 min-w-16 items-center justify-center rounded-l-lg text-2xl font-bold sm:min-w-32"
              style={{
                "background-image": `linear-gradient(to right, ${tier.color}, color-mix(in lch, ${tier.color}, transparent 20%))`,
              }}
            >
              {tier.id}
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
