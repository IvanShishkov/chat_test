import { combineReducers } from "redux";

import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  chat: chatReducer,
});
