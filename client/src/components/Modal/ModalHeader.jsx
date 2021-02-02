import React from "react";

import styles from "./styles.module.scss";

export const ModalHeader = ({ children }) => {
  return (
    <>
      <div className={styles.modalHeader}>
        <h3>{children}</h3>
      </div>
      <div className={styles.hr}></div>
    </>
  );
};
