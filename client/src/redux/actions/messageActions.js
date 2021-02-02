import { ADD_MESSAGE } from "./types";

import { socketSendMessage } from "../../utils/helpers/socket";
import api from "../../utils/helpers/axios";
import { showAlert, hideAlert } from "./appActions";
import { authHeader } from "../../utils/helpers/authHeader";

export function sendMessage(chatId, text) {
  return async (dispatch) => {
    try {
      const { name } = JSON.parse(localStorage.getItem("user"));
      const res = await api.post(
        `/api/chats/${chatId}/messages`,
        { text, name },
        { headers: authHeader() }
      );
      socketSendMessage(res.data);
      dispatch({ type: ADD_MESSAGE, payload: res.data });
    } catch (error) {
      if (error.response) {
        dispatch(showAlert(error.response.status, error.response.data.message));
        setTimeout(() => {
          dispatch(hideAlert());
        }, 2000);
      } else {
        console.error(error);
      }
    }
  };
}
