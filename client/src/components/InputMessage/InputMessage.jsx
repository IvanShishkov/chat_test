import React from "react";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";

import { useForm } from "../../utils/hooks/useForm";
import { sendMessage } from "../../redux/actions/messageActions";

export const InputMessage = ({ chat }) => {
  const { values, handleChange, handleSubmit } = useForm(callback);
  const dispatch = useDispatch();
  function callback() {
    if (values.message) {
      dispatch(sendMessage(chat._id, values.message));
      values.message = "";
    }
  }
  return (
    <div className={styles.content__footer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Message"
            autoComplete="off"
            name="message"
            value={values.message || ""}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
