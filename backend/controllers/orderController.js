import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ── PLACE ORDER ─────────────────────────────────────────
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    const newOrder = new orderModel({
      userId:        req.userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      payment:       paymentMethod === "Online",
    });

    await newOrder.save();

    // Clear user cart after order
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully! 🎉",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ── GET USER ORDERS ─────────────────────────────────────
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ── LIST ALL ORDERS (Admin) ─────────────────────────────
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ── UPDATE ORDER STATUS (Admin) ─────────────────────────
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
