// src/pages/adminPages/CustomerListPage.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // adjust path if needed
import CustomerCard from "../../components/CustomerCard";


const CustomerListPage = () => {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/customers",
          {
            withCredentials: true,
          }
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) {
      fetchCustomers();
    }
  }, [user]);

  return (
    <div className="customer-list-page">
      <h2>Customer List</h2>
      {/* <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      /> */}
      <div className="customer-list">
        {customers.map((customer) => (
          <CustomerCard
            key={customer._id}
            customer={customer}
            role="admin"
            onSelect={(selectedCustomer) => console.log("Selected:", selectedCustomer)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerListPage;
