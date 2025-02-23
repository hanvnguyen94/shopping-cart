import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch user's submitted orders from backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/orders'); // Replace with actual API endpoint
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <p>Loading orders...</p>;
//   }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {/* {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
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
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default OrdersPage;