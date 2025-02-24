// src/pages/adminPages/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li>
          <Link to="/admin/customers">Manage Customers</Link>
        </li>
        {/* More links to admin functionality */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
