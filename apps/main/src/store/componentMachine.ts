import { createMachine, assign } from "xstate";
import { IComponent, ILayout } from "../types";

type ComponentContext = {
  activeComponentData: IComponent | null;
  layout: ILayout;
  components: Record<string, IComponent>;
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
    layout: [],
    components: {},
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

export default componentMachine;
