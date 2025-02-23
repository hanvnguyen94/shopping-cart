// routes/index.js

import express from "express";
import authRoutes from "./auth.js";
import ordersRoutes from "./orders.js";
import productsRoutes from "./products.js";

const router = express.Router();

// Mount the routes under the /api path (adjust if needed)
router.use("/api/auth", authRoutes);
router.use("/api/orders", ordersRoutes);
router.use("/api/products", productsRoutes);

// Optionally, add a simple home route for testing
router.get("/", (req, res) => {
  res.send("Welcome to the Shopping Cart API");
});

export { router };
