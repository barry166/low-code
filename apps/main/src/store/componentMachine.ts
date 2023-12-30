import { createMachine, assign } from "xstate";
import { IComponent } from "../types";

type ComponentContext = {
  activeComponentData: IComponent | null;
};

type ComponentEvent = { type: "SELECT_COMPONENT"; data: IComponent };

const componentMachine = createMachine<
  ComponentContext,
  ComponentEvent,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>({
  id: "component",
  initial: "idle",
  context: {
    activeComponentData: null,
  },
  states: {
    idle: {
      on: {
        SELECT_COMPONENT: {
          actions: assign({
            activeComponentData: (context) => {
              console.log("context", context);
              return (context as any).event?.data;
            },
          }),
        },
      },
    },
  },
});

export default componentMachine