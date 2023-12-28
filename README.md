# React + TypeScript + Vite

Ddn-kit 实现低代码布局编辑器

- [Dnd-kit](https://docs.dndkit.com/api-documentation/droppable/usedroppable)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## TaskList

- [x] 自由布局拖拽限制，比如列不能拖到行中

通过新增 dndDataContext 存储不能放置的容器，在 onDrop 中判断容器是否可以放置

```tsx
// App.tsx
const handleDrop = useCallback((event: DragEndEvent) => {
  const { active, over } = event;
  const dropZone = over?.data.current;
  const item = active.data.current;
  if (!item || !dropZone) return;
  if (state.canNoDropId === dropZone.path) {
    console.log("handleDrop 当前容器不能操作", dropZone.path);
    dispatch({ type: ClearCanNoDropId });
    return;
  }
  ...其他逻辑
});

```

- [x] DropZone 放置区域样式更正：拖拽容器时有时候会误触放置区域

- [x] DropZone 放置区域位置调整：容器拖拽到放置时有时需要整个容器拖到中间位置才能触发放置区域

- [x] Sliderbar 组件列表加载-远程加载组件
通过引入包加载@lowcode/materials加载

- [ ] 添加全局管理状态-组件数据存储
X-State状态管理库

- [ ] 属性编排：选中组件进行属性编排

- [ ] 表单引擎：支持表单布局构建、校验、联动、收集数据等功能

## Analysis

### DropZone 组件逻辑解耦

通过 useDndMonitor 解耦多个组件间的关系

```js
useDndMonitor({
  onDragMove: (event) => {
    const { active, over } = event;
    if (!ACCEPTS.includes(active.data?.current?.type)) return;
    if (over?.id === data.path) setIsActive(true);
    else setIsActive(false);
  },
  onDragEnd: () => {
    setIsActive(false);
  },
});
```
