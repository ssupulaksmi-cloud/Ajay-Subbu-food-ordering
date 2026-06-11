import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

// ── App ─────────────────────────────────────────────────
const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));

// ── DB Connect ──────────────────────────────────────────
connectDB();

// ── Routes ──────────────────────────────────────────────
app.use("/api/user",  userRouter);
app.use("/api/food",  foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart",  cartRouter);

// ── Health ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "🍔 SubbuAjay Clone API is Running!" });
});

// ── Start ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
