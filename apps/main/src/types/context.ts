import { IComponent, ILayout } from ".";

export interface IState {
  canNoDropId: string;
}

export interface IAction {
  payload?: any;
  type: string;
}

export interface IDndDataContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
  layout: ILayout;
  components: Record<string, IComponent>;
}
