import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IComponent, ILayoutItem } from "../types";
import Column from "./Column";
import DropZone from "./DropZone";
import { ROW } from "../constant/type";

interface IProps {
  data: ILayoutItem;
  components: Record<string, IComponent>;
  path: string;
}

const Row: React.FC<IProps> = (props) => {
  const { data, path, components } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: data.id,
      data: {
        id: data.id,
        type: ROW,
        path,
        children: data.children || [],
      },
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  const renderColumn = (column: ILayoutItem, currentPath: string) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div
      className="base draggable row"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {data.id}
      <div className="columns">
        {data?.children?.map((col, colIndex) => {
          const currentPath = `${path}-${colIndex}`;
          return (
            <Fragment key={col.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data?.children?.length || 0,
                }}
                className="horizontalDrag"
              />
              {renderColumn(col as ILayoutItem, currentPath)}
            </Fragment>
          );
        })}

        <DropZone
          data={{
            path: `${path}-${data?.children?.length}`,
            childrenCount: data?.children?.length || 0,
          }}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};

export default Row;
