import type { VoidComponent } from "solid-js";
import { For } from "solid-js";
import { Card } from "../components/Card";

const items = Array.from({ length: 6 }, (_, index) => {
  return {
    imageSrc: "",
    title: `item ${index}`,
  };
});

const Home: VoidComponent = () => {
  return (
    <div class="flex flex-col items-center gap-6 p-6">
      <div class="container">
        <div class="grid grid-cols-4 gap-6">
          <For each={items}>
            {(item) => <Card imageSrc={item.imageSrc} title={item.title} />}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Home;
