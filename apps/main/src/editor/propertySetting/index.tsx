import { useMachine } from "@xstate/react";
import componentMachine from "../../store/componentMachine";

const PropertySetting = () => {
  const [state] = useMachine(componentMachine);

  console.log("x state", state.context.activeComponentData);

  return <div className="property-wrapper">PropertySetting</div>;
};

export default PropertySetting;
