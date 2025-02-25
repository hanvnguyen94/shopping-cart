// src/components/CustomerCard.js

import React from "react";
import { Link } from "react-router-dom";

const CustomerCard = ({ customer, onSelect, role }) => {
  return (
    <div className="customer-card" onClick={() => onSelect && onSelect(customer)}>
      <h3>{customer.name}</h3>
      <p>Email: {customer.email}</p>
      {/* <p>Total Orders: {customer.ordersCount}</p> */}

      {/* Admin-specific actions */}
      {role === "admin" && (
        <div className="admin-actions" >
          <Link to={`/admin/customers/${customer._id}/orders`}>
            <button>View Orders</button>
          </Link>
          {/* <button onClick={() => console.log(`Manage ${customer.name}`)}>Manage Customer</button> */}
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
