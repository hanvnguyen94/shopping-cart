// src/pages/adminPages/CustomerOrdersPage.js
import React from "react";
import { useParams } from "react-router-dom";

const CustomerOrdersPage = () => {
  const { customerId } = useParams();
  return (
    <div className="admin-page">
      <h2>Orders for Customer: {customerId}</h2>
      <p>Orders for the selected customer will be shown here.</p>
    </div>
  );
};

export default CustomerOrdersPage;
