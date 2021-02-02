import { useState, useEffect } from "react";

export const useForm = (callback, validations) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [callback, isSubmitting, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validations) {
      setErrors(validations(values));
      setIsSubmitting(true);
    } else {
      callback();
    }
  };
  const handleChange = (e) => {
    e.persist();
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  return {
    handleSubmit,
    handleChange,
    values,
    errors,
  };
};
