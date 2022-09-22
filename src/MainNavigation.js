import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styles from "./css/MainNavigation.module.css";

const MainNavigation = () => {
  const totalQty = useSelector((state) => state.product.totalQuantity);
  return (
    <nav>
      <ul>
        {/* <div> */}
        <li>
          <NavLink to="/" exact activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName={styles.active}>
            Add product
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" exact activeClassName={styles.active}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/products/:id" activeClassName={styles.active}>
            {/* <NavLink
            to="/products/:id1"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              console.log(match.url.includes("products/"));
              // return match.url.includes("products/") ? true : false;
              return match.url.includes("products/") ? true : false;
            }}
            activeClassName={styles.active}
          > */}
            Product Detail
          </NavLink>
        </li>
        <li className={styles.cart}>
          <NavLink to="/cart" activeClassName={styles.active}>
            {/* <div className={styles.cart}>Cart (0)</div> */}
            Cart ({totalQty})
          </NavLink>
        </li>
        {/* </div> */}
        <div className={styles["align-nav__right"]}>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default MainNavigation;
