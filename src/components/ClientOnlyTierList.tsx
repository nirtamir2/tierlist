import { clientOnly } from "@solidjs/start";

// @See https://github.com/atlassian/pragmatic-drag-and-drop/issues/136#issue-2571522042
export const ClientOnlyTierList = clientOnly(() => import("./_TierList"));
