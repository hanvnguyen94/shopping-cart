// routes/products.js
import express from "express";
import { Product } from "../models/Product.js";
import {
  ensureAuthenticated,
  ensureAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// GET product by id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST add new product (admin only)
router.post("/", ensureAuthenticated, ensureAdmin, (req, res) => {
  const { name, description, price, quantity } = req.body;
  const newProduct = new Product({ name, description, price, quantity });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// PUT update product (admin only)
router.put("/:id", ensureAuthenticated, ensureAdmin, (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// DELETE product (admin only)
router.delete("/:id", ensureAuthenticated, ensureAdmin, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Product deleted" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
