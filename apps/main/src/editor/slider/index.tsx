import SliderBarItem from "./sliderBarItem";
import "./index.scss";
import { SIDEBAR_ITEMS } from "../../constant/initialData";

const Slider = () => {
  return (
    <div className="sliderbar">
      {Object.values(SIDEBAR_ITEMS).map((item, index) => (
        <SliderBarItem key={index} data={item} />
      ))}
    </div>
  );
};

export default Slider;
