import type { VoidComponent } from "solid-js";
import { Show } from "solid-js";
import { helloQuery } from "~/server/hello/hello.queries";
import { ClientOnlyTierList } from "../components/ClientOnlyTierList";

const Home: VoidComponent = () => {
  const tiers = helloQuery(() => ({ hello: "from pRPC" }));
  return (
    <div class="flex flex-col gap-6 p-6">
      <div class="flex w-full items-center justify-center">
        <h1 class="inline-block bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-6xl font-bold text-transparent">
          Tier List
        </h1>
      </div>
      <Show when={tiers.data}>
        {(data) => {
          return <ClientOnlyTierList tiers={data()} />;
        }}
      </Show>
    </div>
  );
};

export default Home;
