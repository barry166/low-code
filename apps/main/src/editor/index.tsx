import Slider from "./slider";
import Canvas from "./canvas";
import PropertySetting from "./propertySetting";
import { RootProvider } from "./provider";
import ErrorBoundary from "../components/header/errorBoundary";
import { IMode } from "../types";

interface IProps {
  // 模式：编辑模式、预览模式
  mode: IMode;
}

const Editor: React.FC<IProps> = (props) => {
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
