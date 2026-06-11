import { useState, useEffect } from "react";

const URL = "http://localhost:5000";

export default function ListFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/food/list`);
      const data = await res.json();
      if (data.success) setFoods(data.data);
    } catch { }
    setLoading(false);
  };

  const removeFood = async (id) => {
    if (!confirm("Delete பண்ணணுமா?")) return;
    try {
      const res = await fetch(`${URL}/api/food/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchFoods();
    } catch { }
  };

  useEffect(() => { fetchFoods(); }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 900 }}>🍽️ Food List</h2>
        <button
          onClick={fetchFoods}
          style={{ background: "#f4f4f5", border: "none", borderRadius: "8px", padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", fontSize: "40px" }}>⏳</div>
      ) : foods.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🍽️</div>
          <p style={{ fontWeight: 700, color: "#686b78" }}>No foods added yet. Add some!</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 80px",
            padding: "14px 20px", background: "#f4f4f5",
            fontSize: "12px", fontWeight: 800, color: "#93959f", letterSpacing: "0.5px",
          }}>
            <span>IMAGE</span><span>NAME</span><span>CATEGORY</span>
            <span>PRICE</span><span>RATING</span><span>ACTION</span>
          </div>

          {foods.map((food, i) => (
            <div
              key={food._id}
              style={{
                display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 80px",
                padding: "14px 20px", alignItems: "center",
                borderTop: i > 0 ? "1px solid #f4f4f5" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <img
                src={food.image ? `${URL}/images/${food.image}` : "https://via.placeholder.com/50x50/FC8019/fff?text=🍔"}
                alt={food.name}
                style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/50x50/FC8019/fff?text=food"; }}
              />
              <div>
                <p style={{ fontWeight: 800, fontSize: "14px" }}>{food.name}</p>
                <p style={{ fontSize: "12px", color: "#93959f", marginTop: "2px" }}>
                  {food.description?.slice(0, 40)}...
                </p>
              </div>
              <span style={{
                background: "#fff3e8", color: "#FC8019",
                padding: "4px 10px", borderRadius: "6px",
                fontSize: "12px", fontWeight: 700, display: "inline-block",
              }}>
                {food.category}
              </span>
              <span style={{ fontWeight: 800, fontSize: "15px" }}>₹{food.price}</span>
              <span style={{ fontWeight: 700, color: "#48c479" }}>⭐ {food.rating}</span>
              <button
                onClick={() => removeFood(food._id)}
                style={{
                  background: "#fff0f0", color: "#e74c3c",
                  border: "none", borderRadius: "8px",
                  padding: "6px 12px", fontSize: "13px",
                  fontWeight: 700, cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e74c3c") && (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.color = "#e74c3c"; }}
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}