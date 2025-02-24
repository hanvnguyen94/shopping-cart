// src/pages/adminPages/ProductManagementPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch products
    axios
      .get("http://localhost:5000/api/products", { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // define functions to add/update/delete products
  // call endpoints: POST /api/products, PUT /api/products/:id, DELETE /api/products/:id
  // ...

  return (
    <div>
      <h2>Product Management</h2>
      {/* display products, forms to edit, etc. */}
    </div>
  );
};

export default ProductManagementPage;
