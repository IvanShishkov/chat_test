import React from "react";

import styles from "./styles.module.scss";

export const ModalDescription = ({ children }) => {
  return <div className={styles.modalDescription}>{children}</div>;
};
