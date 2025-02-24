// src/pages/customerPages/CartPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Helper: update both state and localStorage
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Change the quantity of a given item
  const handleQuantityChange = (productId, quantity) => {
    const newCart = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    updateCart(newCart);
  };

  // Remove an item from the cart
  const handleRemoveItem = (productId) => {
    const newCart = cartItems.filter((item) => item._id !== productId);
    updateCart(newCart);
  };

  // Place the order: send the cart items to the backend
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        { withCredentials: true }
      );

      console.log("Order placed:", response.data);
      alert("Order placed successfully!");
      // Clear the cart after successful order
      updateCart([]);
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <span>{item.name}</span> -
                <span> Price: ${item.price.toFixed(2)}</span> -
                <span> Quantity: </span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value))
                  }
                />
                <button onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
