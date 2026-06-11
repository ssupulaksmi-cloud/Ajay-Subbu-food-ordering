import userModel from "../models/userModel.js";

// ── ADD TO CART ─────────────────────────────────────────
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cartData = user.cartData || {};

    const itemId = req.body.itemId;
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ── REMOVE FROM CART ────────────────────────────────────
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cartData = user.cartData || {};

    const itemId = req.body.itemId;
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ── GET CART ────────────────────────────────────────────
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
