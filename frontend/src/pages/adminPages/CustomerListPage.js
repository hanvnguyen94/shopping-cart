import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const CustomerListPage = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customer list from backend
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/customers');
//         setCustomers(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   if (loading) {
//     return <p>Loading customers...</p>;
//   }

  return (
    <div className="customer-list-page">
      <h2>Customer List</h2>
      {/* {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="customer-list">
          {customers.map((customer) => (
            <div key={customer._id} className="customer-card" onClick={() => onSelectCustomer(customer)}>
              <h3>{customer.name}</h3>
              <p>Email: {customer.email}</p>
              <p>Total Orders: {customer.ordersCount}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default CustomerListPage;