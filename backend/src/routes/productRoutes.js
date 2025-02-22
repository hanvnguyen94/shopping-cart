const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Insert demo products
router.post('/demo', async (req, res) => {
  try {
    const demoProducts = [
      { name: 'Wireless Mouse', description: 'Smooth and responsive', price: 200000, quantity: 20 },
      { name: 'Mechanical Keyboard', description: 'RGB lighting, durable', price: 1200000, quantity: 15 },
      { name: 'Gaming Headset', description: 'High-quality sound', price: 850000, quantity: 10 },
      { name: '4K Monitor', description: 'Ultra HD with vibrant colors', price: 5000000, quantity: 5 },
      { name: 'Portable SSD', description: 'Fast and compact storage', price: 1500000, quantity: 30 },
    ];

    await Product.insertMany(demoProducts);
    res.status(201).json({ message: 'Demo products added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding demo products' });
  }
});

module.exports = router;
