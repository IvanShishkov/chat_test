import React from "react";

import styles from "./styles.module.scss";

import { useDate } from "../../utils/hooks/useDate";

export const Message = ({ message }) => {
  const { _id: userId } = JSON.parse(localStorage.getItem("user"));
  const { dateFormat } = useDate(message.date);
  return (
    <div
      className={[
        styles.msgWrapper,
        message.senderId === userId && styles.me,
      ].join(" ")}
    >
      <div className={styles.msgBlock}>
        <h5 className={styles.name}>{message.senderName}</h5>
        <span className={styles.msg}>{message.text}</span>
      </div>
      <span className={styles.data}>{dateFormat}</span>
    </div>
  );
};
