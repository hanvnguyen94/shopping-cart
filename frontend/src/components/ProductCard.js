import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price} USD</p>
      <p>Quantity: {product.quantity}</p>
      <button>Add to cart</button>
    </div>
  );
};

export default ProductCard;