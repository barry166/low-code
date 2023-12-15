import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ISliderItem } from "../../../types";

interface IProps {
  data: ISliderItem;
}

const SliderBarItem: React.FC<IProps> = (props) => {
  const { data } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: data.id,
      data: {
        type: data.type,
      },
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div
      className="sideBarItem"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {data.component.type}
    </div>
  );
};

export default SliderBarItem;
