import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

import { getChatByInviteId, enterChat } from "../../redux/actions/chatActions";

export const Invite = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const inviteChat = useSelector((state) => state.chat.activeChat);

  React.useEffect(() => {
    dispatch(getChatByInviteId(id));
  }, [dispatch, id]);

  const handleEnterClick = () => {
    dispatch(enterChat(inviteChat._id, history));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>Invite link to chat</h2>
        <div className={styles.info}>
          <span style={{ backgroundColor: inviteChat.color }}>
            {inviteChat.name ? inviteChat.name[0] : ""}
          </span>
          <div className={styles.desc}>
            <h2>{inviteChat.name}</h2>
            <button
              type="submit"
              style={{ backgroundColor: inviteChat.color }}
              onClick={handleEnterClick}
            >
              Enter chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
