// src/pages/adminPages/ProductManagementPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/ProductManagementPage.css";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on search input
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Handle input change for the add product form
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        { withCredentials: true }
      );
      setProducts([...products, response.data]);
      setNewProduct({ name: "", description: "", price: "", quantity: "" });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // Delete product with confirmation
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          withCredentials: true,
        });
        setProducts(products.filter((p) => p._id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProductId(product._id);
    // Pre-fill editData with the product's current values
    setEditData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  };

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Update product with confirmation
  const handleUpdateProduct = async (productId) => {
    if (window.confirm("Are you sure you want to update this product?")) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${productId}`,
          editData,
          { withCredentials: true }
        );
        setProducts(
          products.map((p) => (p._id === productId ? response.data : p))
        );
        setEditingProductId(null);
        setEditData({});
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
      }
    }
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditData({});
  };

  return (
    <div className="admin-container">
      <h2>Product Management</h2>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h3>Add a New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Stock Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Search Products */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) =>
          editingProductId === product._id ? (
            <div key={product._id} className="product-edit-card">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleEditChange}
              />
              <button onClick={() => handleUpdateProduct(product._id)}>
                Save
              </button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              {product.description && <p>{product.description}</p>}
              <p>Price: ${Number(product.price).toFixed(2)}</p>
              <p>Stock: {product.quantity}</p>
              <button onClick={() => startEditing(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductManagementPage;
