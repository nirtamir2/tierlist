import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  closestCenter,
  createSortable,
} from "@thisbeyond/solid-dnd";
import { For, createSignal } from "solid-js";
import { TierItem } from "./TierItem";

const Sortable = (props) => {
  const sortable = createSortable(props.item);
  return (
    <div
      use:sortable
      class="sortable"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      {props.children}
    </div>
  );
};

const SortableHorizontalListExample = () => {
  const [items, setItems] = createSignal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => items();

  const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = [...currentItems];
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <div class="relative flex w-96 bg-red-400">
      <DragDropProvider
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetector={closestCenter}
      >
        <DragDropSensors />
        <div class="flex flex-wrap gap-6">
          <SortableProvider ids={ids()}>
            <For each={items()}>
              {(item) => (
                <Sortable item={item}>
                  <TierItem text={`${item}`} size={50} imageSrc={undefined} />
                </Sortable>
              )}
            </For>
          </SortableProvider>
        </div>
        <DragOverlay>
          <div class="sortable">{activeItem()}</div>
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
};

export default SortableHorizontalListExample;
