import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [filteredProducts, setFilteredProducts] = useState([]);

  // // Lấy danh sách sản phẩm từ backend
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/products');
  //       setProducts(response.data);
  //       setFilteredProducts(response.data);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy sản phẩm:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // // Lọc sản phẩm theo từ khóa tìm kiếm
  // useEffect(() => {
  //   const results = products.filter((product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredProducts(results);
  // }, [searchTerm, products]);

  return (
    <div className="home-container">
      <h1>Danh sách sản phẩm</h1>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {/* <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div> */}
    </div>
  );
};

export default HomePage;