// models/Product.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Product = mongoose.model("Product", productSchema);
