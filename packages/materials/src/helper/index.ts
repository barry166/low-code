// 帮助函数，用于创建带有额外静态属性的组件
export function withStaticProps<T, P>(
  Component: React.FC<T>,
  props: P
): React.FC<T> & P {
  const CompoundedComponent = Component as React.FC<T> & P;
  Object.assign(CompoundedComponent, props);
  return CompoundedComponent;
}
