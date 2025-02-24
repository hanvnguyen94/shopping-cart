// src/components/AdminRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("AdminRoute user:", user); // Debug output

  // If user is still null, we're likely still loading from localStorage.
  // Show a simple "Loading..." message (or a spinner).
  if (user === null) {
    return <p>Loading...</p>;
  }

  // Now if we do have a user object, but the role isn't admin, redirect.
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the admin children
  return children;
};

export default AdminRoute;
