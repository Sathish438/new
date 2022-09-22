import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import { setProducts, addToCart } from "./store/product-slice";
import styles from "./css/Product.module.css";
import classes from "./css/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import ProductDetail from "./ProductDetail";

const Products = () => {
  const [productData, setProductData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const productItems = useSelector((state) => {
    return state.product.items;
  });

  const { error, loading, sendReq } = useHttp();
  useEffect(() => {
    const products = [];
    console.log("1");
    const resData = (data) => {
      for (const key in data) {
        products.push({ id: key, ...data[key] });
      }
      setProductData(products);
      dispatch(setProducts(products));
    };

    const url =
      "https://react-auth-1s-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";
    sendReq(url, null, resData);
  }, [sendReq, dispatch]);
  // console.log(productItems, "items");
  const addToCartHandler = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };
  const productDetailHandler = (product) => {
    history.push({
      pathname: "/products/:id1" + product.id,
      state: { product },
    });
  };
  return (
    <>
      {productData?.length < 1 && (
        <div className={classes["formgroup"]}>
          {productData?.length < 1 && (
            <h2>Cant fetch products. Try again later</h2>
          )}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
      )}
      <div className={styles.product}>
        {!error &&
          productItems?.map((product) => {
            return (
              <div
                className={styles["product-item"]}
                key={product.id}
                onClick={() => productDetailHandler(product)}
              >
                <h2>Name: {product.name}</h2>
                <p>Price: {product.price}</p>
                {/* <p>Qty: {product.qty}</p> */}
                <div className={classes.formcontrol}>
                  <button onClick={(e) => addToCartHandler(e, product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <Route path={"/products/:id"}>
        <ProductDetail />
      </Route>
    </>
  );
};

export default Products;
