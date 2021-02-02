import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import { validateAuth } from "../../utils/helpers/validateAuth";
import { useForm } from "../../utils/hooks/useForm";

import { registerUser } from "../../redux/actions/userActions";

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors, values, handleSubmit, handleChange } = useForm(
    callback,
    validateAuth
  );
  function callback() {
    dispatch(registerUser(values.name, values.password, history));
  }
  return (
    <div className={styles.authWrapper}>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
        <Link to="/login" className={styles.link}>
          Already registered? Go to Login
        </Link>
      </form>
    </div>
  );
};
