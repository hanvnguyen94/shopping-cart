import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // adjust path if needed


const AccountPage = () => {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  
  // If user is not authenticated, redirect to login.
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            withCredentials: true,
          }
        );
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    if (user) {
      fetchAccount();
    }
  }, [user]);


  if (!user) {
    return <p>Loading account info...</p>;
  }

  const formattedDate = info.createdAt
    ? new Date(info.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="account-page">
      <h2>Account Information</h2>
      <p>
        <strong>Name:</strong> {info.name}
      </p>
      <p>
        <strong>Email:</strong> {info.email}
      </p>
      <p>
        <strong>Role:</strong> {info.role}
      </p>
      {formattedDate && (
        <p>
          <strong>Joined on:</strong> {formattedDate}
        </p>
      )}
    </div>
  );
};

export default AccountPage;
