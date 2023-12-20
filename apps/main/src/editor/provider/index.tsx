import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  closestCorners,
} from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { IDndDataContext } from "../../types/context";
import useDndData, { ClearCanNoDropId } from "../hooks/useDndData";
import { IComponent, ILayout, IMode } from "../../types";
import { initialData } from "../../constant/initialData";
import { COLUMN, COMPONENT, SIDEBAR_ITEM } from "../../constant/type";
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from "../utils/helper";

export const DndDataContext = createContext<IDndDataContext | null>(null);

export const RootProvider = (props: {
  mode: IMode;
  children: React.ReactNode;
}) => {
  const [layout, setLayout] = useState<ILayout>(initialData.layout);
  const [components, setComponents] = useState<Record<string, IComponent>>(
    initialData.components
  );

  const mouseSensor = useSensor(MouseSensor, {
    // 激活条件
    activationConstraint: {
      distance: 3, // 设置最小拖拽距离为 10 像素
    },
  });
  const sensors = useSensors(mouseSensor);

  const dndContextData = useDndData();
  const { state, dispatch } = dndContextData;

  const handleDrop = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const dropZone = over?.data.current;
      const item = active.data.current;
      console.log("dropZone111", dropZone);
      console.log("item", item);

      if (!item || !dropZone) return;

      if (state.canNoDropId === dropZone.path) {
        console.log("handleDrop 当前容器不能操作", dropZone.path);
        dispatch({ type: ClearCanNoDropId });

        return;
      }
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, children: undefined };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: nanoid(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components, state.canNoDropId, dispatch]
  );

  const contextData = useMemo(
    () => ({
      ...dndContextData,
      layout,
      components,
      mode: props.mode,
    }),
    [dndContextData, layout, components, props.mode]
  );

  return (
    <DndDataContext.Provider value={contextData}>
      <DndContext
        onDragEnd={handleDrop}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        {props.children}
      </DndContext>
    </DndDataContext.Provider>
  );
};

export const useDndDataContext = () => {
  const dndData = useContext(DndDataContext);
  if (!dndData) {
    throw new Error("must be use in DndDataContext");
  }
  return dndData;
};
