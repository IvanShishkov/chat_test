import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import styles from "./styles.module.scss";

import { DialogsItem } from "./DialogsItem";

import { setActiveChat, initChats } from "../../redux/actions/chatActions";

export const DialogsList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const chats = useSelector((state) => state.chat.chats);
  const showDialog = useSelector((state) => state.app.showDialog);

  const handleChatCLick = (item) => {
    dispatch(setActiveChat(item));
  };
  React.useEffect(() => {
    dispatch(initChats(id && id));
  }, [dispatch, id]);
  return (
    <div
      className={[
        styles.dialogsWrapper,
        showDialog ? "" : styles.showDialogList,
      ].join(" ")}
    >
      <div className={styles.dialogs}>
        <ul>
          {chats.map((item) => (
            <Link
              to={"/chats/" + item._id}
              key={item._id}
              onClick={() => handleChatCLick(item)}
            >
              <DialogsItem {...item} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
