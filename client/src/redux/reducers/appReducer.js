import { SHOW_ALERT, HIDE_ALERT, SHOW_DIALOG } from "../actions/types";

const initialState = {
  alert: {
    code: 0,
    message: "",
  },
  showDialog: true,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, alert: { ...action.payload } };
    case HIDE_ALERT:
      return { ...state, alert: { ...initialState.alert } };
    case SHOW_DIALOG:
      return { ...state, showDialog: true };
    default:
      return state;
  }
};
