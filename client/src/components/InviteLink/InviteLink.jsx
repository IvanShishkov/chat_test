import React from "react";
import { useSelector } from "react-redux";

import styles from "./styles.module.scss";

export const InviteLink = () => {
  const [alertCopy, setAlertCopy] = React.useState(false);
  const linkRef = React.useRef();
  const inviteId = useSelector((state) => state.chat.activeChat.inviteId);

  const handleCopyClick = () => {
    linkRef.current.select();
    document.execCommand("copy");
    setAlertCopy(true);
    setTimeout(() => {
      setAlertCopy(false);
    }, 1500);
  };
  return (
    <div className={styles.content}>
      <div className={styles.inviteBlock}>
        <input
          ref={linkRef}
          className={styles.inviteLink}
          type="text"
          defaultValue={
            "http://" + window.location.hostname + ":3000/invite/" + inviteId
          }
        />
        <button className={styles.inviteBtn} onClick={handleCopyClick}>
          Copy
        </button>
        <div className={[styles.copied, alertCopy && styles.show].join(" ")}>
          Copied!
        </div>
      </div>
    </div>
  );
};
