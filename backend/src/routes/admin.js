// routes/admin.js
import express from "express";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import {
  ensureAuthenticated,
  ensureAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Get all customers (only those with role "customer")
router.get("/customers", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders for a specific customer
router.get(
  "/customers/:customerId/orders",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      const orders = await Order.find({ user: req.params.customerId }).populate(
        "products.product"
      );
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
