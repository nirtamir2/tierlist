import type { JSX } from "solid-js";
import { batch, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { TierData } from "../../server/hello/TierData";
import {
  containersFromTiersStore,
  getIndex,
  getTierItemIdToTierDataRecord,
} from "./_TierList";

type ContextValue = [
  { tiers: Array<TierData> },
  {
    updateTiers: (args: {
      droppableContainer: string;
      draggableId: string;
      droppableId: string;
      draggableContainer: string;
    }) => void;
  },
];
export const TiersContext = createContext<ContextValue>([
  { tiers: [] as Array<TierData> },
  {
    updateTiers: () => {
      //no-op
    },
  },
]);

export function TiersProvider(props: {
  initialTiers: Array<TierData>;
  children: JSX.Element;
}) {
  const [tiersStore, setTiersStore] = createStore<{ tiers: Array<TierData> }>({
    tiers: props.initialTiers,
  });
  const contextValue: ContextValue = [
    tiersStore,
    {
      updateTiers({
        droppableContainer,
        draggableId,
        droppableId,
        draggableContainer,
      }: {
        droppableContainer: string;
        draggableId: string;
        droppableId: string;
        draggableContainer: string;
      }) {
        const containerItemIds =
          containersFromTiersStore(tiersStore)[droppableContainer];
        if (containerItemIds == null) {
          return;
        }

        const draggableTierItemData = getTierItemIdToTierDataRecord(
          tiersStore.tiers,
        )[draggableId];
        if (draggableTierItemData == null) {
          return;
        }

        batch(() => {
          const index = getIndex(containerItemIds, droppableId);
          const draggableTierIndex = tiersStore.tiers.findIndex(
            (tier) => tier.id === draggableContainer,
          );
          const droppableTierIndex = tiersStore.tiers.findIndex(
            (tier) => tier.id === droppableContainer,
          );

          setTiersStore("tiers", draggableTierIndex, "items", (items) => {
            // eslint-disable-next-line sonarjs/no-nested-functions
            return items.filter((item) => item.id !== draggableId);
          });

          setTiersStore("tiers", droppableTierIndex, "items", (items) => {
            return [
              ...items.slice(0, index),
              draggableTierItemData,
              ...items.slice(index),
            ];
          });
        });
      },
    },
  ];

  return (
    <TiersContext.Provider value={contextValue}>
      {props.children}
    </TiersContext.Provider>
  );
}

export function useTiersContext() {
  const context = useContext(TiersContext);
  if (context == null) {
    throw new Error("useTiersContext: cannot find a TiersContext");
  }
  return context;
}
