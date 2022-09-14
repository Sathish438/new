import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./css/Form.module.css";
import useHttp from "./hooks/use-http";
import useInput from "./hooks/use-input";
const AddProduct = () => {
  const {
    hasError: hasNameError,
    onBlurHandler: onNameBlurHandler,
    onChangeHandler: onNameChangeHandler,
    value: enteredName,
    isValid: nameIsValid,
  } = useInput((value) => value.trim().length !== 0);
  const {
    hasError: hasPriceError,
    onBlurHandler: onPriceBlurHandler,
    onChangeHandler: onPriceChangeHandler,
    value: enteredPrice,
    isValid: priceIsValid,
  } = useInput(
    (value) =>
      value.trim().length !== 0 && typeof +value === "number" && value > 100
  );
  const {
    hasError: hasQuantityError,
    onBlurHandler: onQtyBlurHandler,
    onChangeHandler: onQtyChangeHandler,
    value: enteredQty,
    isValid: qtyIsValid,
  } = useInput(
    (value) =>
      value.trim().length !== 0 && typeof +value === "number" && value > 0
  );

  const { error, loading, sendReq } = useHttp();
  const [showModal, setShowModal] = useState(false);
  // const [data, setData] = useState();
  const history = useHistory();

  let isValid = false;

  if (nameIsValid && priceIsValid && qtyIsValid) {
    isValid = true;
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let response = null;
    const product = {
      name: enteredName,
      price: enteredPrice,
      qty: enteredQty,
    };
    console.log(sendReq);
    const url =
      "https://react-auth-1s-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";
    sendReq(
      url,
      {
        method: "POST",
        body: JSON.stringify(product),
      },
      (data) => {
        console.log(data);
        if (data) {
          response = data;
          navigateToProducts(data);
          return;
        }
      }
    );
    console.log(error);
    !response && setShowModal(true);
    //   const res = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(product),
    // });
    // if (!res.ok) {
    //   const err = res.json();
    //   console.log(err);
    //   throw new Error("Can't upload product data. pls try again later");
    // }
    // const data = await res.json();
    // console.log(data);
  };
  console.log(error);

  const navigateToProducts = (data) => {
    console.log(data);
    if (data) {
      setShowModal(false);
      history.push("/products");
    } else {
      setShowModal(false);
    }
  };
  return (
    <React.Fragment>
      {showModal && (
        <div id={styles["backdrop"]} onClick={() => setShowModal(false)}></div>
      )}
      {showModal && (
        <aside>
          {error && (
            <h2>{error}. Pls click Ok to Products page! (Cancel to retry)</h2>
          )}
          {/* {data && <h2>Successfully fetched. pls check in products page</h2>} */}
          <div className={styles.formcontrol}>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={navigateToProducts}>Ok</button>
          </div>
        </aside>
      )}
      {loading && <p>Loading...</p>}
      <div className={styles.formgroup}>
        <form onSubmit={onSubmitHandler}>
          <div className={styles.formcontrol}>
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              value={enteredName}
              onChange={onNameChangeHandler}
              onBlur={onNameBlurHandler}
            />
            {hasNameError && (
              <p className={styles.error}>Please enter valid Name!</p>
            )}
          </div>
          <div className={styles.formcontrol}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              value={enteredPrice}
              onChange={onPriceChangeHandler}
              onBlur={onPriceBlurHandler}
            />
            {hasPriceError && (
              <p className={styles.error}>
                Please enter valid Price ({">"} 100Rs.) !
              </p>
            )}
          </div>
          <div className={styles.formcontrol}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              value={enteredQty}
              onChange={onQtyChangeHandler}
              onBlur={onQtyBlurHandler}
            />
            {hasQuantityError && (
              <p className={styles.error}>Please enter valid Qty ({"> 0"})!</p>
            )}
          </div>
          <div className={styles.formcontrol}>
            <button disabled={!isValid}>Add product</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
