// src/pages/customerPages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../assets/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Check if a user is logged in by reading localStorage.
  const isUserLoggedIn = !!localStorage.getItem("user");

  const handleAddToCart = (product, quantity) => {
    // Check if the product is available
    if (product.quantity < 1) {
      alert("This product is out of stock.");
      return;
    }
    if (!isUserLoggedIn) {
      alert("Please login to add item to cart.");
    } else {
      // Check if the quantity the customer wants to add is available
      // If the product is already in the cart, include its current quantity
      let currentCart = [];
      try {
        const storedCart = localStorage.getItem("cart");
        currentCart = storedCart ? JSON.parse(storedCart) : [];
      } catch (e) {
        console.error(
          "Error parsing cart from localStorage. Resetting cart.",
          e
        );
        currentCart = [];
      }

      const existingItem = currentCart.find((item) => item._id === product._id);
      const alreadyInCart = existingItem ? existingItem.quantity : 0;
      const totalDesired = alreadyInCart + quantity;

      if (totalDesired > product.quantity) {
        alert(
          `You are trying to add ${totalDesired} items, but only ${product.quantity} are available.`
        );
        return;
      }

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
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();


    const fetchProducts222 = async () => {
      try {
        const response = await axios.post("http://localhost:5000/graphql", {
          query: `
            query {
              products {
                name
                price
              }
            }
          `
        })
        .then(response => {
          if (response.data.errors) {
            console.error("❌ GraphQL Error:", response.data.errors);
          } else {
            setProducts(response.data.data.products);
            setFilteredProducts(response.data.data.products);
            console.log("✅ Data received:", response.data.data.products);
          }
        })
      } catch (error) {
        console.error("!!!!!!Error fetching data:", error);
      }
    };
    
    fetchProducts222();

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
