// src/pages/customerPages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Check if a user is logged in by reading localStorage.
  const isUserLoggedIn = !!localStorage.getItem("user");

  const handleAddToCart = (product, quantity) => {
    if (!isUserLoggedIn) {
      alert("Please login to add item to cart.");
    } else {
      // Retrieve current cart from localStorage, or default to empty array
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists in cart
      const existingItem = currentCart.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        currentCart.push({ ...product, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(currentCart));
      alert("Product added to cart.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="home-container">
      <h1>Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
