import React from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

import { Message } from "../Message/Message";
import { ChatInfo } from "../ChatInfo/ChatInfo";
import { ChatSettings } from "../ChatSettings/ChatSettings";
import { InputMessage } from "../InputMessage/InputMessage";

export const Dialog = () => {
  const [chatSettigs, setChatSettings] = React.useState(false);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const showDialog = useSelector((state) => state.app.showDialog);
  const chatRef = React.useRef({});

  const handleSettingsChat = () => {
    setChatSettings(!chatSettigs);
  };

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = 99999999;
    }
  }, [activeChat.messages]);

  if (Object.keys(activeChat).length === 0) {
    return (
      <div className={styles.emptyChat}>
        <h3>Select chat</h3>
      </div>
    );
  }
  return (
    <div
      className={[
        styles.dialogWrapper,
        showDialog ? "" : styles.hiddenDialog,
      ].join(" ")}
    >
      <div className={styles.header}>
        <ChatInfo activeChat={activeChat} />
        <div className={styles.chatSettings} onClick={handleSettingsChat}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {chatSettigs && (
          <ChatSettings chat={activeChat} setChatSettings={setChatSettings} />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.content__messages}>
          <ul ref={chatRef}>
            {activeChat.messages &&
              activeChat.messages.map((message) => (
                <li key={message._id}>
                  <Message message={message} />
                </li>
              ))}
          </ul>
        </div>
        <InputMessage chat={activeChat} />
      </div>
    </div>
  );
};
