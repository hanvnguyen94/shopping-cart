// src/components/ProductCard.js
import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart, role }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart(product, quantity);
  };

  const handleEdit = (a) => {

  };

  const handleDelete = (a) => {

  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Available: {product.quantity}</p>
      
      {role === "customer" && (
        <div>
          <div className="quantity-container">
            <label htmlFor={`quantity-${product._id}`}>Quantity: </label>
            <input
              id={`quantity-${product._id}`}
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button onClick={handleAdd}>Add to Cart</button>
        </div>
      )}

      {role === "admin" && (
        <div className="admin-actions">
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      )}

    </div>
  );
};

export default ProductCard;
