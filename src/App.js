import { Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct";
import Home from "./Home";
import MainNavigation from "./MainNavigation";
import Products from "./Products";

function App() {
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
          <Route path={"/products"}>
            <Products />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
