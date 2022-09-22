import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./css/Form.module.css";

const ProductDetail = () => {
  const state = useLocation().state;
  let product = null;
  if (state) {
    product = state.product;
  }
  return (
    <>
      {product ? (
        <div className={styles["formgroup"]}>
          <h1>Product Name: {product.name}</h1>
          <p>Price: {product.price}</p>
        </div>
      ) : (
        <div className={styles["formgroup"]}>
          <h1>No product selected!</h1>
          <p>Select from products page to view its detail</p>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
