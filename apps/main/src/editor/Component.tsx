import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IComponent } from "../types";
import { COMPONENT } from "../constant/type";

const componentStyle = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};

interface IProps {
  data: IComponent;
  components: Record<string, IComponent>;
  path: string;
}
const Component: React.FC<IProps> = (props) => {
  const { data, components, path } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: data.id,
      data: {
        id: data.id,
        type: COMPONENT,
        path,
      },
    });
  const style = {
    ...componentStyle,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  const component = components[data.id];

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="component draggable"
      {...listeners}
      {...attributes}
    >
      <div>{data.id}</div>
      <div>{component?.content}</div>
    </div>
  );
};
export default Component;
