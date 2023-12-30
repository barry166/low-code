import Slider from "./slider";
import Canvas from "./canvas";
import PropertySetting from "./propertySetting";
import RootProvider from "./provider";
import ErrorBoundary from "../components/header/errorBoundary";
import { IMode } from "../types";
import { useMachine } from "@xstate/react";
import componentMachine from "../store/componentMachine";

interface IProps {
  // 模式：编辑模式、预览模式
  mode: IMode;
}

const Editor: React.FC<IProps> = (props) => {
  const [state] = useMachine(componentMachine);
  console.log("Editor state", state);

  return (
    <ErrorBoundary>
      <RootProvider mode={props.mode}>
        <Slider />
        <Canvas />
        <PropertySetting />
      </RootProvider>
    </ErrorBoundary>
  );
};

Editor.defaultProps = {
  mode: "edit",
};

export default Editor;
