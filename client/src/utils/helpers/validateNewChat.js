export const validateNewChat = (values) => {
  let errors = {};
  if (!values.newchat) {
    errors.newchat = "Chat name is required";
  }
  if (values.newchat && parseInt(values.newchat[0])) {
    errors.newchat = "The chat name must start with a letter, not a number";
  }
  if (values.newchat && values.newchat.length < 3) {
    errors.newchat = "Chat name at least 3 characters";
  }
  if (values.newchat && values.newchat.length >= 10) {
    errors.newchat = "Chat name up to 10 characters";
  }
  return errors;
};
