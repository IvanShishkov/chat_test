import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";

import { deleteChat, leaveChat } from "../../redux/actions/chatActions";

import { Modal } from "../Modal/Modal";
import { ModalHeader } from "../Modal/ModalHeader";
import { ModalDescription } from "../Modal/ModalDescription";
import { InviteLink } from "../InviteLink/InviteLink";

export const ChatSettings = ({ chat }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const divRef = React.useRef();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleLeaveChat = (chatId) => {
    dispatch(leaveChat(chatId, history));
  };
  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId, history));
  };
  const handleInviteLink = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.wrapper} ref={divRef}>
        <ul>
          <li onClick={handleInviteLink}>Invite link</li>
          {chat.creatorId === JSON.parse(localStorage.getItem("user"))._id ? (
            <li onClick={() => handleDeleteChat(chat._id)}>Delete chat</li>
          ) : (
            <li onClick={() => handleLeaveChat(chat._id)}>Leave chat</li>
          )}
        </ul>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <ModalHeader>Invite Link</ModalHeader>
        <ModalDescription>
          This is an invitation link to this chat
        </ModalDescription>
        <InviteLink />
      </Modal>
    </>
  );
};
