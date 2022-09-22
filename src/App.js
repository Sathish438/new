import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct";
import { setCart } from "./store/product-slice";
import Cart from "./Cart";
import Home from "./Home";
import useHttp from "./hooks/use-http";
import MainNavigation from "./MainNavigation";
import Products from "./Products";
import ProductDetail from "./ProductDetail";

let initial = true;
function App() {
  const cart = useSelector((state) => state.product.cartItems);
  const totalQty = useSelector((state) => state.product.totalQuantity);
  const dispatch = useDispatch();
  const { sendReq } = useHttp();

  useEffect(() => {
    const resData = (data) => {
      dispatch(
        // setCart({ ...products, totalQuantity: data.cartItems.totalQuantity })
        setCart(data)
      );
    };
    sendReq(
      "https://react-auth-1s-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {},
      resData
    );
  }, [sendReq, dispatch]);
  useEffect(() => {
    if (initial) {
      initial = false;
      console.log(initial);
      return;
    }
    console.log(initial);
    console.log(cart);
    const payload = {
      cartItems: [...cart],
      totalQuantity: totalQty,
    };
    sendReq(
      "https://react-auth-1s-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
      (data) => console.log(data)
    );
  }, [cart, sendReq, totalQty]);
  return (
    <div className="App">
      <header className="App-header">
        <MainNavigation></MainNavigation>
        <Switch>
          <Route path={"/"} exact>
            <Home />
          </Route>
          <Route path={"/add"}>
            <AddProduct />
          </Route>
          <Route exact path={"/products"}>
            <Products />
          </Route>
          <Route path={"/products/:id"}>
            <ProductDetail />
          </Route>
          <Route path={"/cart"}>
            <Cart />
          </Route>
          <Route path={"*"}>
            <Redirect to={"/"} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
