import { Empty } from "antd";
import { getPropertyComp } from "../utils/property";
import { MachineContext } from "../provider/XStateProvider";

const PropertySetting = () => {
  const activeComponent = MachineContext.useSelector(
    (state) => state.context.activeComponentData
  );

  console.log("x state activeComponent", activeComponent);

  const renderPropertySetter = () => {
    if (!activeComponent) return <Empty />;
    const SetterComp = getPropertyComp(activeComponent.type);
    if (!SetterComp) return <Empty />;
    const { controlProps } = activeComponent;
    return <SetterComp {...controlProps} />;
  };

  return (
    <div className="property-wrapper">
      {JSON.stringify(activeComponent)}
      {renderPropertySetter()}
    </div>
  );
};

export default PropertySetting;
