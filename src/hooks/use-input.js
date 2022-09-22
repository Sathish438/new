import { useEffect, useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const onBlurHandler = (e) => {
    console.log("touched");
    setIsTouched(true);
  };

  const isValid = validateInput(enteredValue);
  useEffect(() => {
    setHasError(!isValid && isTouched);
  }, [isValid, isTouched]);

  useEffect(() => console.log("input"), []);

  return {
    hasError,
    onBlurHandler,
    onChangeHandler,
    value: enteredValue,
    isValid,
  };
};

export default useInput;
