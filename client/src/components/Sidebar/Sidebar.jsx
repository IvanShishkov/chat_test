import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import styles from "./styles.module.scss";

import { setActiveChat } from "../../redux/actions/chatActions";

import { Modal } from "../Modal/Modal";
import { ModalHeader } from "../Modal/ModalHeader";
import { ModalDescription } from "../Modal/ModalDescription";
import { ModalForm } from "../Modal/ModalForm";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleBtnChats = () => {
    dispatch(setActiveChat({}));
  };
  const handleBtnNewChat = () => {
    setModalOpen(true);
  };
  const handleBtnExit = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  return (
    <>
      <div className={styles.sidebarWrapper}>
        <ul>
          <Link to="/" onClick={handleBtnChats}>
            <li className={styles.active}>
              <FontAwesomeIcon icon={faComments} />
              <span>Chats</span>
            </li>
          </Link>
          <li onClick={handleBtnNewChat}>
            <FontAwesomeIcon icon={faPlusSquare} />
            <span>New</span>
          </li>
          <li className={styles.exitBtn} onClick={handleBtnExit}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Exit</span>
          </li>
        </ul>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <ModalHeader>New chat</ModalHeader>
        <ModalDescription>
          Enter a name and select a color for a new chat
        </ModalDescription>
        <ModalForm setOpen={setModalOpen} />
      </Modal>
    </>
  );
};
