import Slider from "./slider";
import Canvas from "./canvas";
import PropertySetting from "./propertySetting";
import { RootProvider } from "./provider";

const Editor = () => {
  return (
    <RootProvider>
      <Slider />
      <Canvas />
      <PropertySetting />
    </RootProvider>
  );
};

export default Editor;
