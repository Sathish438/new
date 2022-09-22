import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./store/product-slice";
import styles from "./css/Product.module.css";
import classes from "./css/Form.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.product.cartItems);
  // const totalQty = useSelector((state) => state.product.totalQty);
  const dispatch = useDispatch();
  const addItemToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  const removeItemFromCartHandler = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <>
      {cart == null ||
        (cart?.length < 1 && (
          <div className={classes["formgroup"]}>
            <h1>Please add items to cart!</h1>
          </div>
        ))}
      <div className={styles.product}>
        {cart?.map((item) => {
          return (
            <div className={styles["product-item"]} key={item.id}>
              <h2>Name: {item.name}</h2>
              <p>Price: {item.price}</p>
              <p>Total Price: {item.totalPrice}</p>
              <p>Qty: {item.qty}</p>
              <div className={styles.addSubCart}>
                <button>
                  <span onClick={() => removeItemFromCartHandler(item)}>-</span>
                  <span onClick={() => addItemToCartHandler(item)}>+</span>
                </button>
              </div>
            </div>
          );
        })}
        {/* <div className={styles["product-item"]}>
          <h2>Name: </h2>
          <p>Price: </p>
          <p>Qty: </p>
          <button>Add to cart</button>
          <div className={styles.addSubCart}>
            <button>
              <span>-</span>
              <span>+</span>
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Cart;
