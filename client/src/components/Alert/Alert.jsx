import React from "react";
import { useSelector } from "react-redux";

import styles from "./styles.module.scss";

export const Alert = () => {
  const alert = useSelector((state) => state.app.alert);
  if (alert.code) {
    return (
      <div className={styles.alertWrapper}>
        <span>{alert.message}</span>
      </div>
    );
  } else {
    return "";
  }
};
