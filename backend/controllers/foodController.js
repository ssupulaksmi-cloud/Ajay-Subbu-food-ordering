import foodModel from "../models/foodModel.js";
import fs from "fs";

// ── ADD FOOD ────────────────────────────────────────────
const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : "";

    const food = new foodModel({
      name:        req.body.name,
      description: req.body.description,
      price:       Number(req.body.price),
      category:    req.body.category,
      rating:      Number(req.body.rating) || 4.0,
      discount:    Number(req.body.discount) || 0,
      image:       image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully!", data: food });
  } catch (error) {
    console.error("Add food error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ── LIST ALL FOOD ───────────────────────────────────────
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({ available: true });
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ── REMOVE FOOD ─────────────────────────────────────────
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: "Food not found" });

    // Delete image file
    if (food.image) {
      const imgPath = `uploads/${food.image}`;
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
