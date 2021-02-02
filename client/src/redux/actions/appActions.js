import { SHOW_ALERT, HIDE_ALERT, SHOW_DIALOG } from "./types";

export function showAlert(code, message) {
  return {
    type: SHOW_ALERT,
    payload: { code, message },
  };
}
export function hideAlert() {
  return { type: HIDE_ALERT };
}

export function showDialog() {
  return { type: SHOW_DIALOG };
}
