import { useEffect } from "react";
import { MachineContext } from "../provider/XStateProvider";
import { initialData } from "../../constant/initialData";

// 初始化store数据
export const useInitData = () => {
  const { send } = MachineContext.useActorRef();
  useEffect(() => {
    send({
      type: "INIT_DATA",
      payload: {
        layout: initialData.layout,
        components: initialData.components,
      },
    });
  }, []);
};
