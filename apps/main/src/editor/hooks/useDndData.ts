import { useReducer } from "react";
import { IAction, IState } from "../../types/context";

export const SetCanNoDropId = "SetCanNoDropId";
export const ClearCanNoDropId = "ClearCanNoDropId";

const initialData: IState = {
  canNoDropId: "",
};

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case SetCanNoDropId:
      return {
        ...state,
        canNoDropId: action.payload,
      };
    case ClearCanNoDropId:
      return {
        ...state,
        canNoDropId: "",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default function useDndData() {
  // 设置不能拖拽的dropZone id
  const [state, dispatch] = useReducer(Reducer, initialData);

  return {
    state,
    dispatch,
  };
}
