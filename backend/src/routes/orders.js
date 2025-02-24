// routes/orders.js
import express from "express";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import {
  ensureAuthenticated,
  ensureAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create new order (customer)
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const { products } = req.body; // Array of { product: productId, quantity }

    // Check stock and update quantity
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ error: "Product not found" });
      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${product.name}` });
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const newOrder = new Order({ user: req.user._id, products });
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders for logged-in customer
router.get("/myorders", ensureAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all orders
router.get("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update an order
router.put("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete an order
router.delete("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
