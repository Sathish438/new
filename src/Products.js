import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import styles from "./css/Product.module.css";
import classes from "./css/Form.module.css";

const Products = () => {
  const [productData, setProductData] = useState();

  const { error, loading, sendReq } = useHttp();
  useEffect(() => {
    const products = [];
    console.log("1");
    const resData = (data) => {
      console.log(data);
      for (const key in data) {
        products.push({ id: key, ...data[key] });
      }
      setProductData(products);
    };

    const url =
      "https://react-auth-1s-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";
    sendReq(url, null, resData);
  }, [sendReq]);

  console.log(productData);
  return (
    <>
      {!productData && (
        <div className={classes["formgroup"]}>
          {!productData && <h2>Cant fetch products. Try again later</h2>}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
      )}
      <div className={styles.product}>
        {!error &&
          productData?.map((product) => {
            return (
              <div className={styles["product-item"]} key={product.id}>
                <h2>Name: {product.name}</h2>
                <p>Price: {product.price}</p>
                <p>Qty: {product.qty}</p>
                <div className={classes.formcontrol}>
                  <button>Add to cart</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Products;
