// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Shopping Cart</Link>
      </div>

      <div className="navbar-links">
      {user ? (
        <ul className="nav-list">
          <li>Welcome, {user.name}</li>

          {/* If user is a customer */}
          {user.role === "customer" && (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/orders">My Orders</Link>
              </li>
              <li>
                <Link to="/cart">
                  <FaShoppingCart className="cart-icon" />
                </Link>
              </li>
            </>
          )}

          {/* If user is an admin */}
          {user.role === "admin" && (
            <>
              <li>
                <Link to="/admin/products">Manage Products</Link>
              </li>
              <li>
                <Link to="/admin/customers">Customer List</Link>
              </li>
            </>
          )}

          {/* Logout button available for both roles */}
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
        ) : (
          <ul className="nav-list">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
