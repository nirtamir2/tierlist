import { useParams } from "@solidjs/router";
import type { VoidComponent } from "solid-js";
import { TierList } from "../../components/tierlist/TierList";

const TierRoute: VoidComponent = () => {
  const params = useParams() as { id: string };

  return (
    <div class="flex flex-col gap-6 p-6">
      <div class="flex w-full items-center justify-center">
        <h1 class="inline-block bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-6xl font-bold text-transparent">
          Tier List {params.id}
        </h1>
      </div>
      <TierList />
    </div>
  );
};

export default TierRoute;
