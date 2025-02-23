import React from 'react';

const CartPopup = ({ cartItems, onClose, onQuantityChange, onSubmitOrder }) => {
  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <span>{item.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item._id, parseInt(e.target.value))}
                />
              </li>
            ))}
          </ul>
        )}
        <button onClick={onSubmitOrder}>Submit Order</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default CartPopup;
