import { componentsListMap } from "../maps";

export const getPropertyComp = (type: string) => {
  const targetComp = componentsListMap[type as keyof typeof componentsListMap];
  if (!targetComp) {
    // console.warn(`组件${type}不存在`);
    return null;
  }
  return targetComp.Setter;
};
