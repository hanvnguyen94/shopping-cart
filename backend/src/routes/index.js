// routes/index.js
import express from "express";
import authRoutes from "./auth.js";
import productsRoutes from "./products.js";
import ordersRoutes from "./orders.js";
import adminRoutes from "./admin.js";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/products", productsRoutes);
router.use("/api/orders", ordersRoutes);
router.use("/api/admin", adminRoutes);

export { router };
