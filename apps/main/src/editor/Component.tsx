import { memo, useCallback, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IComponent } from "../types";
import { COMPONENT } from "../constant/type";
import { getTargetComponent } from "./maps";
import { MachineContext } from "./provider/XStateProvider";

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
const Component: React.FC<IProps> = memo((props) => {
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

  const component = useMemo(() => components[data.id], [components, data.id]);

  const { send } = MachineContext.useActorRef();

  const handleComponentClick = useCallback(() => {
    send({ type: "SELECT_COMPONENT", data: component });
  }, [component, send]);

  const style = useMemo(
    () => ({
      ...componentStyle,
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.4 : 1,
    }),
    [transform, isDragging]
  );

  const renderComponent = useCallback(() => {
    const Comp = getTargetComponent(component?.type);
    if (!Comp) return null;
    const compProps = component;
    return <Comp {...(compProps as any).controlProps} />;
  }, [component]);

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="component draggable"
      {...listeners}
      {...attributes}
      onClick={handleComponentClick}
    >
      <div className="component-wrapper" style={{ pointerEvents: "none" }}>
        {renderComponent()}
      </div>
    </div>
  );
});

export default Component;
