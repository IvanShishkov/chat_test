import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import { useForm } from "../../utils/hooks/useForm";

import { loginUser } from "../../redux/actions/userActions";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors, values, handleSubmit, handleChange } = useForm(callback);
  function callback() {
    dispatch(loginUser(values.name, values.password, history));
  }
  return (
    <div className={styles.authWrapper}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={[styles.inputForm, errors.name && styles.errorInput].join(
            " "
          )}
        >
          <input
            type="text"
            placeholder="Nickname"
            name="name"
            onChange={handleChange}
            value={values.name || ""}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>
        <div
          className={[
            styles.inputForm,
            errors.password && styles.errorInput,
          ].join(" ")}
        >
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password || ""}
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register" className={styles.link}>
        Not registered yet? Go to Register
      </Link>
    </div>
  );
};
