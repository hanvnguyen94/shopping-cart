// seed.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Product } from "./src/models/Product.js";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected for seeding");
    seedProducts();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Seed data
async function seedProducts() {
  try {
    // Optionally clear existing products first
    await Product.deleteMany({});
    console.log("Existing products removed.");

    const products = [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI.",
        price: 25.99,
        quantity: 100,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches.",
        price: 79.99,
        quantity: 50,
      },
      {
        name: "HD Monitor",
        description: "24-inch full HD monitor with IPS panel.",
        price: 149.99,
        quantity: 30,
      },
      {
        name: "USB-C Hub",
        description: "Multiport USB-C hub with HDMI and Ethernet.",
        price: 39.99,
        quantity: 75,
      },
      {
        name: "Noise Cancelling Headphones",
        description:
          "Over-ear noise cancelling headphones with long battery life.",
        price: 99.99,
        quantity: 40,
      },
      {
        name: "Portable SSD",
        description: "Fast and compact SSD with 1TB capacity.",
        price: 129.99,
        quantity: 60,
      },
      {
        name: "Gaming Chair",
        description: "Ergonomic chair designed for long gaming sessions.",
        price: 199.99,
        quantity: 20,
      },
      {
        name: "Smartwatch",
        description: "Feature-packed smartwatch with fitness tracking.",
        price: 149.99,
        quantity: 80,
      },
    ];

    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}
