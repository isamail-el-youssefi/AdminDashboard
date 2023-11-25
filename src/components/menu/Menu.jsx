import "./Menu.scss";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/" className="listItem">
          <img src="/home.svg" alt="" />
          <span className="listItemTitle">Homepage</span>
        </Link>
        <Link to="/" className="listItem">
          <img src="/user.svg" alt="" />
          <span className="listItemTitle">Profile</span>
        </Link>
      </div>

      <div className="item">
        <span className="title">LISTS</span>
        <Link to="/users" className="listItem">
          <img src="/users.svg" alt="" />
          <span className="listItemTitle">Users</span>
        </Link>
        <Link to="/customers" className="listItem">
          <img src="/user-dollar.svg" alt="" />
          <span className="listItemTitle">Customers</span>
        </Link>
        <Link to="/products" className="listItem">
          <img src="/package.svg" alt="" />
          <span className="listItemTitle">Products</span>
        </Link>
        <Link to="/categories" className="listItem">
          <img src="/category.svg" alt="" />
          <span className="listItemTitle">Categories</span>
        </Link>
        <Link to="/subcategories" className="listItem">
          <img src="/category-plus.svg" alt="" />
          <span className="listItemTitle">SubCategories</span>
        </Link>
        <Link to="/orders" className="listItem">
          <img src="/package-export.svg" alt="" />
          <span className="listItemTitle">Orders</span>
        </Link>
      </div>
    </div>
  );
}
