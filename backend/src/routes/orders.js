// routes/orders.js
import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import {
  ensureAuthenticated,
  ensureAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create new order (customer)
router.post("/", ensureAuthenticated, (req, res) => {
  const { products } = req.body; // Expecting an array of { product: productId, quantity }

  // Verify products exist and update stock
  Promise.all(
    products.map((item) => {
      return Product.findById(item.product).then((product) => {
        if (!product) {
          throw new Error("Product not found");
        }
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
        // Deduct quantity
        product.quantity -= item.quantity;
        return product.save();
      });
    })
  )
    .then(() => {
      const newOrder = new Order({
        user: req.user._id,
        products,
      });
      return newOrder.save();
    })
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// GET orders for logged-in customer
router.get("/myorders", ensureAuthenticated, (req, res) => {
  Order.find({ user: req.user._id })
    .populate("products.product")
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin: Get all orders
router.get("/", ensureAuthenticated, ensureAdmin, (req, res) => {
  Order.find()
    .populate("user")
    .populate("products.product")
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin: Update order
router.put("/:id", ensureAuthenticated, ensureAdmin, (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin: Delete order
router.delete("/:id", ensureAuthenticated, ensureAdmin, (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Order deleted" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
