import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products from backend
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/products');
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // // Handle input changes for new product
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewProduct((prev) => ({ ...prev, [name]: value }));
  // };

  // // Add new product
  // const handleAddProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/products', newProduct);
  //     setProducts([...products, response.data]);
  //     setNewProduct({ name: '', description: '', price: '', quantity: '' });
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }
  // };

  // // Prepare for editing a product
  // const handleEditClick = (product) => {
  //   setEditProduct({ ...product });
  // };

  // // Handle input changes for editing a product
  // const handleEditInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditProduct((prev) => ({ ...prev, [name]: value }));
  // };

  // // Update a product
  // const handleUpdateProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, editProduct);
  //     setProducts(
  //       products.map((product) =>
  //         product._id === editProduct._id ? editProduct : product
  //       )
  //     );
  //     setEditProduct(null);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  // // Delete a product
  // const handleDeleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/products/${id}`);
  //     setProducts(products.filter((product) => product._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

  return (
    <div className="product-management">
      <h2>Product Management</h2>

      {/* Add New Product */}
      {/* <form onSubmit={handleAddProduct} className="product-form">
        <h3>Add New Product</h3>
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
          required
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
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Product</button>
      </form> */}

      {/* Product List */}
      <h3>Product List</h3>
      <div className="product-list">
        {/* {products.map((product) => (
          <div key={product._id} className="product-item">
            {editProduct && editProduct._id === product._id ? (
              <form onSubmit={handleUpdateProduct} className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditInputChange}
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditInputChange}
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  value={editProduct.quantity}
                  onChange={handleEditInputChange}
                  required
                />
                <button type="submit">Update</button>
                <button onClick={() => setEditProduct(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p>Price: {product.price} VND</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ProductManagementPage;