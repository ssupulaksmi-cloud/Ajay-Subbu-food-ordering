import { useState } from "react";

const URL = "http://localhost:5000";

const CATEGORIES = ["Veg", "Non-Veg", "Biryani", "Pizza", "Burger", "Desserts", "Drinks", "Snacks", "Meals"];

export default function AddFood() {
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "Biryani", rating: "4.0", discount: "0",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) {
      setMsg({ text: "⚠️ Name, Price, Description கட்டாயம் போடணும்!", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append("image", image);

      const res = await fetch(`${URL}/api/food/add`, { method: "POST", body: data });
      const result = await res.json();

      if (result.success) {
        setMsg({ text: "✅ Food added successfully!", type: "success" });
        setForm({ name: "", description: "", price: "", category: "Biryani", rating: "4.0", discount: "0" });
        setImage(null);
        setPreview(null);
      } else {
        setMsg({ text: `❌ ${result.message}`, type: "error" });
      }
    } catch {
      setMsg({ text: "❌ Server error. Backend running-ஆ இருக்கா?", type: "error" });
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", background: "#f4f4f5", border: "1.5px solid transparent",
    borderRadius: "10px", padding: "12px 14px", fontSize: "14px", color: "#1c1c1c",
    transition: "border 0.2s",
  };

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "24px" }}>➕ Add New Food</h2>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "640px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

        {msg.text && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px", marginBottom: "20px",
            background: msg.type === "success" ? "#f0fff4" : "#fff0f0",
            color: msg.type === "success" ? "#48c479" : "#e74c3c",
            fontWeight: 700, fontSize: "14px",
            border: `1px solid ${msg.type === "success" ? "#48c479" : "#e74c3c"}`,
          }}>
            {msg.text}
          </div>
        )}

        {/* Image Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 700, color: "#3d4152", display: "block", marginBottom: "8px" }}>
            Food Image
          </label>
          <label style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: "2px dashed #e9e9eb", borderRadius: "12px", padding: "20px",
            cursor: "pointer", transition: "border 0.2s", background: "#fafafa",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.border = "2px dashed #FC8019")}
            onMouseLeave={(e) => (e.currentTarget.style.border = "2px dashed #e9e9eb")}
          >
            {preview ? (
              <img src={preview} alt="preview" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
            ) : (
              <>
                <span style={{ fontSize: "36px", marginBottom: "8px" }}>📷</span>
                <span style={{ fontSize: "13px", color: "#93959f", fontWeight: 600 }}>Click to upload image</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
          </label>
        </div>

        {/* Form Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { label: "Food Name *", key: "name", placeholder: "Chicken Biryani", col: 2 },
            { label: "Description *", key: "description", placeholder: "Tasty and spicy...", col: 2, textarea: true },
            { label: "Price (₹) *", key: "price", placeholder: "199", type: "number" },
            { label: "Rating", key: "rating", placeholder: "4.0", type: "number" },
            { label: "Discount (%)", key: "discount", placeholder: "0", type: "number" },
          ].map(({ label, key, placeholder, col, textarea, type }) => (
            <div key={key} style={{ gridColumn: col === 2 ? "1 / -1" : "auto" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#3d4152", display: "block", marginBottom: "6px" }}>
                {label}
              </label>
              {textarea ? (
                <textarea
                  rows={3}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #FC8019")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid transparent")}
                />
              ) : (
                <input
                  type={type || "text"}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #FC8019")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid transparent")}
                />
              )}
            </div>
          ))}

          {/* Category */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: "13px", fontWeight: 700, color: "#3d4152", display: "block", marginBottom: "6px" }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", marginTop: "24px",
            background: loading ? "#ccc" : "#FC8019",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "14px", fontSize: "16px", fontWeight: 900,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#e06b10")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#FC8019")}
        >
          {loading ? "Adding..." : "Add Food ✅"}
        </button>
      </div>
    </div>
  );
}