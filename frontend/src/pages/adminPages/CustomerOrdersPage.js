import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const CustomerOrdersPage = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);

  // Fetch orders for a specific customer
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/customers/${customerId}/orders`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching customer orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (customerId) {
//       fetchOrders();
//     }
//   }, [customerId]);

  // Handle updating an order
//   const handleUpdateOrder = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${editOrder._id}`, editOrder);
//       setOrders(
//         orders.map((order) =>
//           order._id === editOrder._id ? editOrder : order
//         )
//       );
//       setEditOrder(null);
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

  // Handle deleting an order
//   const handleDeleteOrder = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
//       setOrders(orders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   if (loading) {
//     return <p>Loading customer orders...</p>;
//   }

  return (
    <div className="customer-orders-page">
      <h2>Orders for Customer ID: {customerId}</h2>
      {/* {orders.length === 0 ? (
        <p>No orders found for this customer.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {editOrder && editOrder._id === order._id ? (
                <div>
                  <h3>Editing Order ID: {order._id}</h3>
                  <input
                    type="text"
                    value={editOrder.status}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, status: e.target.value })
                    }
                  />
                  <button onClick={handleUpdateOrder}>Save</button>
                  <button onClick={() => setEditOrder(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>Order ID: {order._id}</h3>
                  <p>Status: {order.status}</p>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        {item.productName} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p>Total Price: {order.totalPrice} VND</p>
                  <button onClick={() => setEditOrder({ ...order })}>Edit</button>
                  <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default CustomerOrdersPage;