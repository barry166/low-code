import { IMode } from "../../types";
import DndProvider from "./DndProvider";
import XStateProvider from "./XStateProvider";

const RootProvider = (props: { mode: IMode; children: React.ReactNode }) => {

  return (
    <XStateProvider>
      <DndProvider>{props.children}</DndProvider>
    </XStateProvider>
  );
};

export default RootProvider;
