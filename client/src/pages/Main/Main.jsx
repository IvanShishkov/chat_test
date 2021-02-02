import React from "react";

import styles from "./styles.module.scss";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { DialogsList } from "../../components/DialogsList/DialogsList";
import { Dialog } from "../../components/Dialog/Dialog";

import { initSocket } from "../../utils/helpers/socket";

export const Main = () => {
  React.useEffect(() => {
    initSocket();
  }, []);
  return (
    <>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <DialogsList />
        <Dialog />
      </div>
    </>
  );
};
