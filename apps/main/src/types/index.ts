export enum ICompType {
  SIDEBAR_ITEM = "sidebarItem",
  ROW = "row",
  COLUMN = "column",
  COMPONENT = "component",
}

export interface ISliderItem {
  id: string;
  type: ICompType;
  component: {
    type: string;
    content: string;
  };
}

export interface ILayoutItem {
  type: ICompType;
  id: string;
  children?: ILayoutItem[] | IComponent[];
}

export type ILayout = ILayoutItem[];

export interface IComponent {
  id: string;
  type: ICompType | string;
  content: string;
  controlProps?: any;
}
