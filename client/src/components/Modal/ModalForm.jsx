import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";

import { createChat } from "../../redux/actions/chatActions";

import { useForm } from "../../utils/hooks/useForm";
import { validateNewChat } from "../../utils/helpers/validateNewChat";

import { ColorPicker } from "../ColorPicker/ColorPicker";

export const ModalForm = ({ setOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { errors, values, handleSubmit, handleChange } = useForm(
    callback,
    validateNewChat
  );
  const [colorNum, setColorNum] = React.useState(0);
  const colors = ["#7965c1", "#cb4f87", "#4388b9", "#00A876", "#d3a924"];
  function callback() {
    dispatch(createChat(values.newchat, colors[colorNum], history));
    setOpen(false);
  }
  return (
    <div className={styles.modalContent}>
      <form onSubmit={handleSubmit}>
        <div
          className={[
            styles.inputForm,
            errors.newchat && styles.errorInput,
          ].join(" ")}
        >
          <input
            type="text"
            placeholder="Chat name"
            autoComplete="off"
            name="newchat"
            value={values.newchat || ""}
            onChange={handleChange}
          />
          {errors.newchat && (
            <span className={styles.errorText}>{errors.newchat}</span>
          )}
        </div>
        <ColorPicker
          colors={colors}
          colorNum={colorNum}
          setColorNum={setColorNum}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
