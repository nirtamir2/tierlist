import { createAsync } from "@solidjs/router";
import type { VoidComponent } from "solid-js";
import { For, Suspense } from "solid-js";
import { Card } from "./Card";
import { getCategoriesWithTierlists } from "./tierlist/server";

export const TierListGroupPage: VoidComponent = () => {
  const categories = createAsync(async () => {
    return await getCategoriesWithTierlists();
  });
  return (
    <div class="flex flex-col items-center gap-6 p-6">
      <div class="container flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold">Tierlists</div>
          <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Suspense fallback={<div>Loading</div>}>
              <For each={categories()}>
                {(item) => (
                  <Card
                    href={`tierlist/${item.id}`}
                    imageSrc={item.imageSrc}
                    title={item.title}
                  />
                )}
              </For>
            </Suspense>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold">Template</div>
          <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <For each={items}>
              {(item) => (
                <Card
                  href={`template/${item.id}`}
                  imageSrc={item.imageSrc}
                  title={item.title}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};
