import { createMachine, assign } from "xstate";
import { IComponent, ILayout } from "../types";

type ComponentContext = {
  activeComponentData: IComponent | null;
  layout: ILayout;
  components: Record<string, IComponent>;
};

type ComponentEvent =
  | {
      type: "INIT_DATA";
      payload: {
        layout: ILayout;
        components: Record<string, IComponent>;
      };
    }
  | { type: "SELECT_COMPONENT"; payload: IComponent }
  | {
      type: "UPDATE_COMPONENT";
      payload: { id: string; controlProps: any };
    };

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
        INIT_DATA: {
          actions: assign({
            layout: (context) => {
              return (context as any).event?.payload?.layout;
            },
            components: (context) => {
              return (context as any).event?.payload?.components;
            },
          }),
        },
        SELECT_COMPONENT: {
          actions: assign({
            activeComponentData: (context) => {
              console.log("context", context);
              return (context as any).event?.payload;
            },
          }),
        },
        UPDATE_COMPONENT: {
          actions: assign({
            components: (context) => {
              console.log("UPDATE_COMPONENT context", context);
              const { id, controlProps } = (context as any)?.event?.payload;
              const { components } = context?.context;
              if (!components[id]) {
                console.warn("store 上不存在该组件 ", id);
              }
              components[id] = {
                ...components[id],
                controlProps: {
                  ...controlProps,
                },
              };
              return components;
            },
            // todo：每次都需要手动更新 activeComponentData，是否可以自动计算更新
            activeComponentData: (context) => {
              const { id } = (context as any)?.event?.payload;
              const { components, activeComponentData } = context?.context;
              if (activeComponentData && activeComponentData.id === id) {
                return {
                  ...activeComponentData,
                  controlProps: {
                    ...components[id].controlProps,
                  },
                };
              }
              return activeComponentData;
            },
          }),
        },
      },
    },
  },
});

export default componentMachine;
