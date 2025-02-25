// src/pages/adminPages/CustomerOrdersPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // adjust path if needed

const CustomerOrdersPage = () => {
  const { customerId } = useParams();
  const { user } = useContext(AuthContext);
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await axios.get(`
          http://localhost:5000/api/admin/customers/${customerId}/orders`,
          {
            withCredentials: true,
          }
        );
        setCustomerOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) {
      fetchCustomerOrders();
    }
  }, [user]);

  return (
    <div className="admin-page">
      <h2>Orders for Customer: {customerId}</h2>
      <div className="customer-order-list">
        
        {customerOrders.length === 0 ? (
          <p>This customer have no orders yet.</p>
        ) : (
          <div className="orders-list">
            {customerOrders.map((customerOrder) => (
                <div key={customerOrder._id} className="order-card">
                  <h3>Order ID: {customerOrder._id}</h3>
                  {/* <ul>
                    {customerOrder.products.map((item, index) => (
                      <li key={index}>
                        {item.product.name} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul> */}
                </div>
              ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerOrdersPage;
