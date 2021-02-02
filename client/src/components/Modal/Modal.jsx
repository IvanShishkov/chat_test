import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

export const Modal = ({ children, open, setOpen }) => {
  const modalRef = React.useRef();
  const handleCloseModal = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setOpen(false);
    };
  }, [setOpen]);

  if (!open) {
    return "";
  }
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalBlock} ref={modalRef}>
        <div className={styles.closeModal} onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {children}
      </div>
    </div>
  );
};
