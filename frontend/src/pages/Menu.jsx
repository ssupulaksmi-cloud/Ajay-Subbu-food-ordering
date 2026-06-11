import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";

const CATEGORIES = ["All", "Veg", "Non-Veg", "Biryani", "Pizza", "Burger", "Desserts", "Drinks"];

const SAMPLE_FOODS = [
  { _id: "1", name: "Chicken Biryani", price: 199, category: "Non-Veg", rating: "4.5", discount: 20,
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=400&h=300&fit=crop" },
  { _id: "2", name: "Veg Biryani", price: 149, category: "Veg", rating: "4.3",
    description: "Fragrant rice with fresh vegetables and whole spices.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
  { _id: "3", name: "Paneer Butter Masala", price: 179, category: "Veg", rating: "4.6", discount: 15,
    description: "Creamy tomato-based gravy with soft paneer cubes.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
  { _id: "4", name: "Margherita Pizza", price: 249, category: "Pizza", rating: "4.4",
    description: "Classic pizza with fresh mozzarella and basil leaves.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
  { _id: "5", name: "Chicken Burger", price: 129, category: "Burger", rating: "4.2",
    description: "Crispy fried chicken patty with lettuce and special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { _id: "6", name: "Gulab Jamun", price: 79, category: "Desserts", rating: "4.7",
    description: "Soft milk dumplings soaked in rose-flavoured sugar syrup.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
  { _id: "7", name: "Masala Dosa", price: 89, category: "Veg", rating: "4.5",
    description: "Crispy dosa filled with spiced potato filling. South Indian classic.",
    image: "https://images.unsplash.com/photo-1630409346824-4f12e960d4ab?w=400&h=300&fit=crop" },
  { _id: "8", name: "Mutton Curry", price: 249, category: "Non-Veg", rating: "4.6", discount: 10,
    description: "Slow-cooked tender mutton in aromatic spice gravy.",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=300&fit=crop" },
  { _id: "9", name: "Cold Coffee", price: 99, category: "Drinks", rating: "4.3",
    description: "Chilled coffee blended with milk and ice cream.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" },
  { _id: "10", name: "Chocolate Brownie", price: 119, category: "Desserts", rating: "4.8",
    description: "Warm fudgy brownie served with a scoop of vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop" },
  { _id: "11", name: "Chicken 65", price: 169, category: "Non-Veg", rating: "4.5",
    description: "Spicy deep-fried chicken snack - a Chennai original.",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&h=300&fit=crop" },
  { _id: "12", name: "Veg Fried Rice", price: 139, category: "Veg", rating: "4.1",
    description: "Wok-tossed rice with fresh vegetables and soy sauce.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
];

export default function Menu({ addToCart, removeFromCart, cart, search }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [foods, setFoods] = useState(SAMPLE_FOODS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch from backend, fallback to sample data
    setLoading(true);
    fetch("http://localhost:5000/api/food/list")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.length > 0) setFoods(data.data);
      })
      .catch(() => {}) // silently use sample data
      .finally(() => setLoading(false));
  }, []);

  const getQty = (id) => cart.find((i) => i._id === id)?.qty || 0;

  const filtered = foods.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 24px 48px" }}>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FC8019 0%, #e06b10 100%)",
          borderRadius: "20px",
          padding: "40px 40px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
            🌟 BEST DEALS TODAY
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", lineHeight: "1.2", marginBottom: "12px" }}>
            Hungry? We got<br />you covered! 🍕
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", marginBottom: "20px" }}>
            Order from 50+ top restaurants in Madurai
          </p>
          <div
            style={{
              display: "inline-flex",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px 24px",
              fontWeight: 800,
              fontSize: "15px",
              color: "#FC8019",
              cursor: "pointer",
            }}
          >
            Order Now →
          </div>
        </div>
        <div style={{ fontSize: "120px", opacity: 0.3, position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)" }}>
          🍔
        </div>
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "28px",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "50px",
              border: "2px solid",
              borderColor: activeCategory === cat ? "#FC8019" : "#e9e9eb",
              background: activeCategory === cat ? "#FC8019" : "#fff",
              color: activeCategory === cat ? "#fff" : "#3d4152",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1c1c1c" }}>
          {search ? `Results for "${search}"` : `${activeCategory} Items`}
          <span style={{ color: "#93959f", fontWeight: 600, fontSize: "16px", marginLeft: "8px" }}>
            ({filtered.length})
          </span>
        </h2>
        {cart.length > 0 && (
          <div style={{ background: "#fff3e8", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, color: "#FC8019" }}>
            🛒 {cart.reduce((s, i) => s + i.qty, 0)} items in cart
          </div>
        )}
      </div>

      {/* Food Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", fontSize: "48px" }}>⏳</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🍽️</div>
          <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#3d4152" }}>No items found</h3>
          <p style={{ color: "#686b78" }}>Try a different search or category</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((item) => (
            <FoodCard
              key={item._id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              qty={getQty(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
