import { For } from "solid-js";

const tiers = [
  {
    id: "S",
    color: "from-red-600 to-red-500",
    items: ["Item 1", "Item 2", "Item 3"],
  },
  {
    id: "A",
    color: "from-orange-600 to-orange-500",
    items: ["Item 4", "Item 5", "Item 6"],
  },
  {
    id: "B",
    color: "from-yellow-600 to-yellow-500",
    items: ["Item 7", "Item 8"],
  },
  {
    id: "C",
    color: "from-green-600 to-green-500",
    items: ["Item 9", "Item 10"],
  },
  { id: "D", color: "from-blue-600 to-blue-500", items: ["Item 11"] },
  { id: "F", color: "from-purple-600 to-purple-500", items: ["Item 12"] },
];

export function TierList() {
  return (
    <ul class="space-y-2">
      <For each={tiers}>
        {(tier) => (
          <li class="flex">
            <div
              class={`flex size-20 items-center justify-center bg-gradient-to-r text-2xl font-bold ${tier.color} rounded-l-lg`}
            >
              {tier.id}
            </div>
            <div class="grow rounded-r-lg bg-gradient-to-r from-gray-800 to-gray-700 p-2">
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
