import type { VoidComponent } from "solid-js";
import { For } from "solid-js";
import { Card } from "../components/Card";

const items = Array.from({ length: 6 }, (_, index) => {
  return {
    imageSrc:
      "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg",
    title: `item ${index}`,
  };
});

const Home: VoidComponent = () => {
  return (
    <div class="flex flex-col items-center gap-6 p-6">
      <div class="container">
        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <For each={items}>
            {(item) => <Card imageSrc={item.imageSrc} title={item.title} />}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Home;
