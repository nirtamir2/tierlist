import type { VoidComponent } from "solid-js";
import { Show } from "solid-js";
import { helloQuery } from "~/server/hello/hello.queries";
import { TierList } from "../components/TierList";

const Home: VoidComponent = () => {
  const tiers = helloQuery(() => ({ hello: "from pRPC" }));
  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <h1 class="mb-6 text-center text-3xl font-bold">Tier List</h1>
      <Show when={tiers.data}>
        {(data) => {
          return <TierList tiers={data()} />;
        }}
      </Show>
    </div>
  );
};

export default Home;
