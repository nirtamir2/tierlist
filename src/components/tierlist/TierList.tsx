import { mockTiers } from "../../server/hello/mockTiers";
import { ClientOnlyTierList } from "./ClientOnlyTierList";
import { TiersProvider } from "./TiersContext";

export function TierList() {
  return (
    <TiersProvider initialTiers={mockTiers}>
      <ClientOnlyTierList />
    </TiersProvider>
  );
}
