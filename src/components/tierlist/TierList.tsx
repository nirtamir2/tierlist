import { createAsync } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { ClientOnlyTierList } from "./ClientOnlyTierList";
import { TIERS_BANK_ID } from "./TIERS_BANK_ID";
import { TiersProvider } from "./TiersContext";
import { getAllTierlistsWithRelations } from "./server";

export function TierList() {
  const a = createAsync(async () => {
    return { mockTiers: await getAllTierlistsWithRelations() };
  });
  return (
    <Suspense>
      <Show when={a()} fallback={<div>Loading tierlist</div>}>
        {(a) => (
          <TiersProvider
            initialTiers={[
              { id: TIERS_BANK_ID, color: "transparent", name: "", items: [] },
              ...a().mockTiers[0].tierRows,
            ]}
          >
            <ClientOnlyTierList />
          </TiersProvider>
        )}
      </Show>
    </Suspense>
  );
}
