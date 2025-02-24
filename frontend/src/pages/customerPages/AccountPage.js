import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((error) => {
        console.error("Error fetching account info:", error);
        // if not logged in, redirect
        navigate("/login");
      });
  }, [navigate]);

  if (!user) {
    return <p>Loading account info...</p>;
  }

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="account-page">
      <h2>Account Information</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
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
