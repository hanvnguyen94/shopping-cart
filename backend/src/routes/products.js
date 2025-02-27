// routes/products.js
import express from "express";
import { Product } from "../models/Product.js";
import {
  ensureAuthenticated,
  ensureAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/products
// Supports optional query parameters: name, minPrice, maxPrice
router.get("/", async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;
    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // case-insensitive matching
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a product (admin only)
router.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product (admin only)
router.put("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product (admin only)
router.delete("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
