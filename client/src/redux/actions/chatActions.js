import { INIT_CHAT, NEW_CHAT, DELETE_CHAT, SET_ACTIVE_CHAT } from "./types";

import { socketJoinChat, socketLeaveChat } from "../../utils/helpers/socket";
import api from "../../utils/helpers/axios";
import { authHeader } from "../../utils/helpers/authHeader";
import { showAlert, hideAlert, showDialog } from "./appActions";

export function initChats(chatId) {
  return async (dispatch) => {
    try {
      const { _id: userId, name } = JSON.parse(localStorage.getItem("user"));
      const { data: chats } = await api.get(`/api/chats`, {
        headers: authHeader(),
        params: { userId },
      });

      chats.forEach((chat) => {
        socketJoinChat(chat._id, userId, name);
      });

      dispatch({ type: INIT_CHAT, payload: chats });

      if (chatId) {
        const usersList = await api.get(`/api/chats/${chatId}/users/`, {
          headers: authHeader(),
        });
        const activeChat = chats.filter((chat) => chat._id === chatId);
        const activeChatWithUsers = { ...activeChat[0], users: usersList.data };
        dispatch(setActiveChat(activeChatWithUsers));
      }
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

export function createChat(name, color, history) {
  return async (dispatch) => {
    try {
      const { name: userName, _id: userId } = JSON.parse(
        localStorage.getItem("user")
      );
      const res = await api.post(
        "/api/chats",
        { name, userId, color },
        { headers: authHeader() }
      );
      dispatch({ type: NEW_CHAT, payload: { ...res.data } });

      const usersList = await api.get(`/api/chats/${res.data._id}/users/`, {
        headers: authHeader(),
      });
      const activeChatWithUsers = { ...res.data, users: usersList.data };
      dispatch(setActiveChat(activeChatWithUsers));
      history.push("/chats/" + res.data._id);
      socketJoinChat(res.data._id, userId, userName);
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

export function deleteChat(chatId, history) {
  return async (dispatch) => {
    try {
      const { _id: userId } = JSON.parse(localStorage.getItem("user"));
      const res = await api.delete(`/api/chats/${chatId}`, {
        headers: authHeader(),
      });
      history.push("/");
      dispatch({ type: DELETE_CHAT, payload: res.data });
      socketLeaveChat({ chatId: res.data, userId });
      dispatch(setActiveChat({}));
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

export function leaveChat(chatId, history) {
  return async (dispatch) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const res = await api.delete(`/api/chats/${chatId}/users/${userId}`, {
        headers: authHeader(),
      });
      history.push("/");
      dispatch({ type: DELETE_CHAT, payload: res.data });
      socketLeaveChat({ chatId: res.data, userId });
      dispatch(setActiveChat({}));
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

export function enterChat(chatId, history) {
  return async (dispatch) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const res = await api.put(`/api/chats/${chatId}/users/${userId}`, null, {
        headers: authHeader(),
      });
      await dispatch(initChats(res.data._id));
      history.push(`/chats/${res.data._id}`);
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

export function getChatByInviteId(inviteId) {
  return async (dispatch) => {
    try {
      const res = await api.get("/api/chats/", {
        headers: authHeader(),
        params: { inviteId },
      });
      const { _id, name, color } = res.data;
      dispatch(setActiveChat({ _id, name, color }));
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

export function setActiveChat(chat) {
  return async (dispatch) => {
    if (chat._id) {
      const usersList = await api.get(`/api/chats/${chat._id}/users/`, {
        headers: authHeader(),
      });
      const activeChatWithUsers = { ...chat, users: usersList.data };
      dispatch({ type: SET_ACTIVE_CHAT, payload: activeChatWithUsers });
    } else {
      dispatch({ type: SET_ACTIVE_CHAT, payload: chat });
    }

    dispatch(showDialog());
  };
}
