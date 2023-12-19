import { Button, Input } from "@lowcode/materials";

// 组件物料映射，暂时写死，后期考虑从接口获取
export const componentsListMap = {
  input: Input,
  button: Button,
};

export const getTargetComponent = (type: string) => {
  const Comp = componentsListMap[type as keyof typeof componentsListMap];
  if (!Comp) {
    console.warn(`组件${type}不存在`);
    return null;
  }
  return Comp;
};
