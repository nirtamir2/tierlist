import type { Store } from "solid-js/store";
import type { TierData } from "../../server/hello/TierData";

export function containersFromTiersStore(
  tiersStore: Store<{ tiers: Array<TierData> }>,
) {
  return Object.fromEntries(
    tiersStore.tiers.map((tier) => [
      tier.id,
      tier.items.map((tier) => tier.id),
    ]),
  );
}
