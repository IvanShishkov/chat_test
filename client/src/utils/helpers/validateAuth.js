export const validateAuth = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Nickname is required";
  }
  if (values.name && parseInt(values.name[0])) {
    errors.name = "The nickname must start with a letter, not a number";
  }
  if (values.name && values.name.length < 3) {
    errors.name = "Nickname at least 3 characters";
  }
  if (values.name && values.name.length >= 10) {
    errors.name = "Nickname up to 10 characters";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Password at least 6 characters";
  }
  return errors;
};
