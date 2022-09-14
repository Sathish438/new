import { Link, NavLink } from "react-router-dom";
import styles from "./css/MainNavigation.module.css";

const MainNavigation = () => {
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
            Product Detail
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
