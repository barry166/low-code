import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IComponent, ILayoutItem } from "../types";
import Component from "./Component";
import DropZone from "./DropZone";
import { COLUMN } from "../constant/type";

interface IProps {
  data: ILayoutItem;
  components: Record<string, IComponent>;
  path: string;
}

const Column: React.FC<IProps> = (props) => {
  const { data, path, components } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: data.id,
      data: {
        id: data.id,
        type: COLUMN,
        path,
        children: data.children || [],
      },
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  const renderComponent = (component: IComponent, currentPath: string) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
    8;
  };

  return (
    <div
      className="base draggable column"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {data.id}
      {data?.children?.map((component, colIndex) => {
        const currentPath = `${path}-${colIndex}`;
        return (
          <Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data?.children?.length || 0,
              }}
            />
            {renderComponent(component as IComponent, currentPath)}
          </Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data?.children?.length}`,
          childrenCount: data?.children?.length || 0,
        }}
        isLast
      />
    </div>
  );
};

export default Column;
