import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: setErrorMessage(e.target),
    });
    setIsValid(e.target.closest("form").checkValidity());
  };

  function setErrorMessage(target) {
    if (
      target.name === "name" &&
      target.validationMessage === "Введите данные в указанном формате."
    ) {
      return "Пожалуйста, используйте только латиницу, кириллицу, пробел или дефис";
    } else if (
      target.name === "email" &&
      target.validationMessage === "Введите данные в указанном формате."
    ) {
      return "Введите корректный адрес электронной почты";
    } else {
      return target.validationMessage;
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const clearErrors = useCallback(
    (newErrors = {}, newIsValid = true) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    clearErrors,
  };
}
