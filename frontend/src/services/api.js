import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/swiggy-clone")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("⚠️  MongoDB Error:", err.message));

// ─── MODELS ─────────────────────────────────────────────

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  cartData: { type: Object, default: {} },
}, { timestamps: true });

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  rating: { type: String, default: "4.0" },
  discount: Number,
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Order Placed" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);
const Food = mongoose.model("food", foodSchema);
const Order = mongoose.model("order", orderSchema);

// ─── USER ROUTES ─────────────────────────────────────────

// Register
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "swiggy_secret", { expiresIn: "7d" });
    res.json({ success: true, token, user: { _id: user._id, name, email } });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Login
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "swiggy_secret", { expiresIn: "7d" });
    res.json({ success: true, token, user: { _id: user._id, name: user.name, email } });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ─── FOOD ROUTES ─────────────────────────────────────────

// Add food item (admin)
app.post("/api/food/add", async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.json({ success: true, data: food });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all food
app.get("/api/food/list", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Remove food
app.post("/api/food/remove", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ─── ORDER ROUTES ─────────────────────────────────────────

// Place order
app.post("/api/order/place", async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const order = new Order({ userId, items, amount, address });
    await order.save();

    // Clear user cart
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully", orderId: order._id });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get user orders
app.post("/api/order/userorders", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId }).sort({ date: -1 });
    const formatted = orders.map(o => ({
      ...o._doc,
      date: new Date(o.date).toLocaleDateString("en-IN"),
    }));
    res.json({ success: true, data: formatted });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all orders (admin)
app.get("/api/order/list", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Update order status (admin)
app.post("/api/order/status", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ─── HEALTH CHECK ─────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "🍔 Swiggy Clone API Running!" }));

// ─── START ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Running On Port ${PORT}`));
