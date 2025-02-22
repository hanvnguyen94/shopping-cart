// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartPopup from './CartPopup';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Placeholder for cart items
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login status for now

  // Handle quantity change in the cart
  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Submit order
  const handleSubmitOrder = () => {
    console.log('Order submitted:', cartItems);
    setIsCartOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Shopping Cart</Link>
      </div>


      {/* Hiển thị my orders sau khi đăng nhập */}
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link> {/* Link to HomePage */}          
            <Link to="/orders">My Orders</Link> {/* Link to OrdersPage */}
            <button onClick={() => setIsLoggedIn(false)}>Logout</button> {/* Mock logout */}
          </>
        )}

        <FaShoppingCart
          className="cart-icon"
          onClick={() => setIsCartOpen(true)}
        />
      </div>


      {/* Mở popup sau khi bấm vào icon cart */}
      {isCartOpen && (
        <CartPopup
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onQuantityChange={handleQuantityChange}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

    </nav>
  );
};

export default Navbar;
