import { createActorContext } from "@xstate/react";
import { componentMachine } from "../../store";

export const MachineContext = createActorContext(componentMachine);

function XStateProvider(props: { children: React.ReactNode }) {
  return <MachineContext.Provider>{props.children}</MachineContext.Provider>;
}

export default XStateProvider;
