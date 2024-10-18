import type { JSXElement, Signal } from "solid-js";
import { createContext, createSignal, useContext } from "solid-js";

type DragContextType = Signal<boolean>;

const DragContext = createContext<DragContextType>([
  () => false,
  () => {
    //
  },
]);

export function DragProvider(props: { children: JSXElement }) {
  const [isDragActive, setIsDragActive] = createSignal(false);
  const contextValue: DragContextType = [isDragActive, setIsDragActive];

  return (
    <DragContext.Provider value={contextValue}>
      {props.children}
    </DragContext.Provider>
  );
}

export function useDrag() {
  const context = useContext(DragContext);
  if (context == null) {
    throw new Error("useDrag: cannot find a DragContext");
  }
  return context;
}
