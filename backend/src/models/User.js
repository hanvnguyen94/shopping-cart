// models/User.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Date,
    enum: ["customer", "admin"],
    default: "customer",
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: "Order",
  },
});

export default User = mongoose.model("User", UserSchema);
