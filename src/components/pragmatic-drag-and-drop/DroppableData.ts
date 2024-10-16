export type DroppableData<T extends "item" | "tier"> = {
  type: T;
  droppableItemId: T extends "item" ? string : null;
  tierId: string;
  tierIndex: number;
  itemIndex: T extends "item" ? number : null;
};
