// src/pages/adminPages/CustomerOrdersPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CustomerOrdersPage = () => {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // For inline editing of an order's status
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchOrders();
  }, [customerId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/customers/${customerId}/orders`,
        { withCredentials: true }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
          withCredentials: true,
        });
        setOrders(orders.filter((order) => order._id !== orderId));
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order.");
      }
    }
  };

  const handleUpdateOrder = async (orderId) => {
    try {
      // Ensure the payload includes the status
      const payload = { ...editData };
      // Call the update endpoint and populate references (backend should do that)
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        payload,
        { withCredentials: true }
      );
      setOrders(
        orders.map((order) => (order._id === orderId ? response.data : order))
      );
      setEditingOrderId(null);
      setEditData({});
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="customer-orders-page">
      <h2>Orders for Customer: {customerId}</h2>
      {orders.length === 0 ? (
        <p>No orders found for this customer.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order {order._id}</h3>
            <p>
              <strong>Status:</strong> {order.status || "N/A"}
            </p>
            <ul>
              {order.products.map((item, index) => (
                <li key={index}>
                  {item.product && item.product.name
                    ? item.product.name
                    : "Unknown Product"}{" "}
                  - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            {editingOrderId === order._id ? (
              <div className="order-edit">
                <label htmlFor={`status-${order._id}`}>New Order Status:</label>
                <select
                  id={`status-${order._id}`}
                  value={editData.status || order.status || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={() => handleUpdateOrder(order._id)}>
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingOrderId(null);
                    setEditData({});
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="order-actions">
                <button
                  onClick={() => {
                    setEditingOrderId(order._id);
                    setEditData({ status: order.status });
                  }}
                >
                  Update Order
                </button>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete Order
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerOrdersPage;
