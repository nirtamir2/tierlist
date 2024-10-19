import type { TierData } from "../../server/hello/TierData";

export function getTierItemIdToTierDataRecord(tierData: Array<TierData>) {
  return Object.fromEntries(
    tierData.flatMap((tier) => {
      return tier.items.map((item) => {
        return [item.id, item];
      });
    }),
  );
}
