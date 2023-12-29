import { useMachine } from "@xstate/react";
import { Empty } from "antd";
import componentMachine from "../../store/componentMachine";
import { getPropertyComp } from "../utils/property";

const PropertySetting = () => {
  const [state] = useMachine(componentMachine);

  const activeComponent = state.context.activeComponentData;
  console.log("x state activeComponent", state.context.activeComponentData);

  const renderPropertySetter = () => {
    if (!activeComponent) return <Empty />;
    const SetterComp = getPropertyComp(activeComponent.type);
    if (!SetterComp) return <Empty />;
    const { controlProps } = activeComponent;
    return <SetterComp {...controlProps} />;
  };

  return <div className="property-wrapper">{renderPropertySetter()}</div>;
};

export default PropertySetting;
