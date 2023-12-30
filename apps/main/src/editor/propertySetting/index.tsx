import { Empty } from "antd";
import { getPropertyComp } from "../utils/property";
import { MachineContext } from "../provider/XStateProvider";

const PropertySetting = () => {
  const activeComponent = MachineContext.useSelector(
    (state) => state.context.activeComponentData
  );

  // property改变时触发
  const onPropertyChange = (value: any) => {
    console.log("onPropertyChange", value);
    // 改变全局xstate的值
  };

  const renderPropertySetter = () => {
    if (!activeComponent) return <Empty />;
    const SetterComp = getPropertyComp(activeComponent.type);
    if (!SetterComp) return <Empty />;
    const { controlProps } = activeComponent;
    return <SetterComp {...controlProps} onChange={onPropertyChange} />;
  };

  return (
    <div className="property-wrapper">
      {JSON.stringify(activeComponent)}
      {renderPropertySetter()}
    </div>
  );
};

export default PropertySetting;
