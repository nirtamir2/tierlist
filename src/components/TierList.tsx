import { For } from "solid-js";

const tiers = [
  {
    id: "S",
    color: "#DC2626",
    items: ["Item 1", "Item 2", "Item 3"],
  },
  {
    id: "A",
    color: "#EA580D",
    items: ["Item 4", "Item 5", "Item 6"],
  },
  {
    id: "B",
    color: "#CA8A05",
    items: [
      "Item 7",
      "Item 8",
      "Item 81",
      "Item 82",
      "Item 7",
      "Item 8",
      "Item 81",
      "Item 82",
    ],
  },
  {
    id: "C",
    color: "#12A34A",
    items: ["Item 9", "Item 10", "#12A34A"],
  },
  { id: "D", color: "#2563EB", items: ["Item 11"] },
  { id: "F", color: "#9333EA", items: ["Item 12"] },
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
                "background-image": `linear-gradient(to right, ${tier.color}, color-mix(in lch, ${tier.color}, transparent 10%))`,
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
                    <div class="cursor-pointer rounded bg-gradient-to-r from-gray-700 to-gray-600 p-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-gray-600 hover:to-gray-500 hover:shadow-md">
                      {item}
                    </div>
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
