import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/customerPages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/authPages/Login';
import RegisterPage from './pages/authPages/Register';
import OrdersPage from './pages/customerPages/OrdersPage';
import ProductManagementPage from './pages/adminPages/ProductManagementPage';
import CustomerListPage from './pages/adminPages/CustomerListPage';
import CustomerOrdersPage from './pages/adminPages/CustomerOrdersPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/customers" element={<CustomerListPage />} />
        <Route path="/admin/customers/:customerId/orders" element={<CustomerOrdersPage />} />

      </Routes>
    </Router>
  );
};

export default App;
