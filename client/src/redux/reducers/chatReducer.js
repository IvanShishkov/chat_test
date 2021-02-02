import {
  INIT_CHAT,
  NEW_CHAT,
  DELETE_CHAT,
  SET_ACTIVE_CHAT,
  ADD_MESSAGE,
} from "../actions/types";

const initialState = {
  chats: [],
  activeChat: {},
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CHAT:
      return { ...state, chats: action.payload };
    case NEW_CHAT:
      return { ...state, chats: state.chats.concat(action.payload) };
    case DELETE_CHAT:
      const res = state.chats.filter((chat) => chat._id !== action.payload);
      return { ...state, chats: res };
    case SET_ACTIVE_CHAT:
      return { ...state, activeChat: action.payload };
    case ADD_MESSAGE:
      if (
        Object.keys(state.activeChat).length > 0 &&
        state.activeChat._id === action.payload.inChatId
      ) {
        return {
          ...state,
          activeChat: {
            ...state.activeChat,
            messages: state.activeChat.messages.concat(action.payload.message),
          },
          chats: state.chats.map((chat) =>
            chat._id === action.payload.inChatId
              ? {
                  ...chat,
                  messages: chat.messages.concat(action.payload.message),
                }
              : chat
          ),
        };
      } else {
        return {
          ...state,
          chats: state.chats.map((chat) =>
            chat._id === action.payload.inChatId
              ? {
                  ...chat,
                  messages: chat.messages.concat(action.payload.message),
                }
              : chat
          ),
        };
      }

    default:
      return state;
  }
};
