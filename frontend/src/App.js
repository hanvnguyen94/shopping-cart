// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customerPages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/authPages/Login";
import RegisterPage from "./pages/authPages/Register";
import OrdersPage from "./pages/customerPages/OrdersPage";
import CartPage from "./pages/customerPages/CartPage";
import AccountPage from "./pages/customerPages/AccountPage";
import ProductManagementPage from "./pages/adminPages/ProductManagementPage";
import CustomerListPage from "./pages/adminPages/CustomerListPage";
import CustomerOrdersPage from "./pages/adminPages/CustomerOrdersPage";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Other admin routes */}
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductManagementPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <CustomerListPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/customers/:customerId/orders"
          element={
            <AdminRoute>
              <CustomerOrdersPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
