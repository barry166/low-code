import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { COLUMN, COMPONENT, ROW, SIDEBAR_ITEM } from "../constant/type";
import { useDndDataContext } from "./provider";
import { ClearCanNoDropId, SetCanNoDropId } from "./hooks/useDndData";

interface IData {
  path: string;
  childrenCount: number;
}

interface IProps {
  data: IData;
  className?: string;
  isLast?: boolean;
}

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN];

const canDrop = (item: IData, data: IData) => {
  const dropZonePath = data.path;
  const splitDropZonePath = dropZonePath.split("-");
  const itemPath = item.path;

  // sidebar items can always be dropped anywhere
  if (!itemPath) {
    // if (data.childrenCount >= 3) {
    //  return false;
    // }
    return true;
  }

  const splitItemPath = itemPath.split("-");

  // limit columns when dragging from one row to another row
  const dropZonePathRowIndex = splitDropZonePath[0];
  const itemPathRowIndex = splitItemPath[0];
  const diffRow = dropZonePathRowIndex !== itemPathRowIndex;
  if (diffRow && splitDropZonePath.length === 2 && data?.childrenCount >= 3) {
    return false;
  }

  // Invalid (Can't drop a parent element (row) into a child (column))
  const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
  if (parentDropInChild) return false;

  // Current item can't possible move to it's own location
  if (itemPath === dropZonePath) return false;

  // Current area
  if (splitItemPath.length === splitDropZonePath.length) {
    const pathToItem = splitItemPath.slice(0, -1).join("-");
    const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

    const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
    const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

    if (pathToItem === pathToDropZone) {
      const nextDropZoneIndex = currentItemIndex + 1;
      if (nextDropZoneIndex === currentDropZoneIndex) return false;
    }
  }

  return true;
};

function DropZone(props: IProps) {
  const { data, className, isLast } = props;
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useDndDataContext();

  const { setNodeRef } = useDroppable({
    id: data.path,
    data: data,
  });

  useDndMonitor({
    onDragMove: (event) => {
      const { active, over } = event;
      if (!ACCEPTS.includes(active.data?.current?.type)) return;
      // 多个dropzone中，如果正在over的是当前的放置区域，则高亮显示
      if (over?.id !== data.path) {
        setIsActive(false);
        // console.log("当前容器不可以放置！！", "over", over, "data", data);
        return;
      } else {
        const isCanDrop = canDrop(active.data.current! as IData, data);
        if (isCanDrop) {
          //   console.log(
          //     "当前容器可以放置isCanDrop",
          //     isCanDrop,
          //     "over",
          //     over,
          //     "data",
          //     data
          //   );
          setIsActive(true);
          if (state.canNoDropId === over?.id) {
            dispatch({ type: ClearCanNoDropId });
          }
        } else {
          dispatch({
            type: SetCanNoDropId,
            payload: over?.id,
          });
        }
      }
    },
    onDragEnd: () => {
      setIsActive(false);
      dispatch({ type: ClearCanNoDropId });
    },
  });

  const classes = `dropZone ${isActive ? "active" : ""} ${
    isLast ? isLast : ""
  } ${className ? className : ""}`;

  return (
    <div ref={setNodeRef} className={classes}>
      {data.path}
    </div>
  );
}

export default DropZone;
