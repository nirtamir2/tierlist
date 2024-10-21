import { mockTiers } from "../../server/hello/mockTiers";
import { ClientOnlyTierList } from "./ClientOnlyTierList";
import { TIERS_BANK_ID } from "./TIERS_BANK_ID";
import { TiersProvider } from "./TiersContext";

export function TierList() {
  return (
    <TiersProvider
      initialTiers={[
        { id: TIERS_BANK_ID, color: "transparent", name: "", items: [] },
        ...mockTiers,
      ]}
    >
      <ClientOnlyTierList />
    </TiersProvider>
  );
}
