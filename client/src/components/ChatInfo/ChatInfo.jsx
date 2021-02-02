import React from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

import { Modal } from "../Modal/Modal";
import { ModalHeader } from "../Modal/ModalHeader";

export const ChatInfo = ({ activeChat }) => {
  const [showInfo, setShowInfo] = React.useState(false);
  const users = useSelector((state) => state.chat.activeChat.users);
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <div className={styles.chatInfo} onClick={handleInfoClick}>
        <h5>{activeChat.name}</h5>
        <span>{activeChat.users.length + " members"}</span>
      </div>
      <Modal open={showInfo} setOpen={setShowInfo}>
        <ModalHeader>Chat information</ModalHeader>
        <div className={styles.chatInfoBlock}>
          <div
            className={styles.photo}
            style={{ backgroundColor: activeChat.color || "#7965c1" }}
          >
            <span>{activeChat.name[0]}</span>
          </div>
          <div className={styles.info}>
            <h5>{activeChat.name}</h5>
          </div>
        </div>
        <div className={styles.membersBlock}>
          <div className={styles.members}>
            <div className={styles.membersHeader}>
              <FontAwesomeIcon className={styles.users} icon={faUserFriends} />
              <span>{activeChat.users.length + " members"}</span>
            </div>
            <ul>
              {users.map((user) => (
                <div className={styles.userBlock} key={user._id || ""}>
                  <li>{user.name}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};
