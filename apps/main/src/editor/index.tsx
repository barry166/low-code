import Slider from "./slider";
import Canvas from "./canvas";
import PropertySetting from "./propertySetting";
import { RootProvider } from "./provider";
import ErrorBoundary from "../components/header/errorBoundary";

const Editor = () => {
  return (
    <ErrorBoundary>
      <RootProvider>
        <Slider />
        <Canvas />
        <PropertySetting />
      </RootProvider>
    </ErrorBoundary>
  );
};

export default Editor;
