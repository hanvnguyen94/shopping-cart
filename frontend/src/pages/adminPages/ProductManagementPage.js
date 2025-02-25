// src/pages/adminPages/ProductManagementPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";


const ProductManagementPage = () => {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);


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


  // define functions to add/update/delete products
  // call endpoints: POST /api/products, PUT /api/products/:id, DELETE /api/products/:id
  // ...

  return (
    <div className="home-container">
      <h2>Product Management</h2>
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
            onAddToCart={[]}
            role="admin"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;
