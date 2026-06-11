import { useState } from "react";

const CATEGORIES = [
  { name: "Biryani", emoji: "🍚", color: "#fff3e8" },
  { name: "Pizza", emoji: "🍕", color: "#fff0f0" },
  { name: "Burger", emoji: "🍔", color: "#f0fff4" },
  { name: "Dosa", emoji: "🫓", color: "#f0f4ff" },
  { name: "Noodles", emoji: "🍜", color: "#fff8f0" },
  { name: "Desserts", emoji: "🍰", color: "#fdf0ff" },
  { name: "Drinks", emoji: "🥤", color: "#f0faff" },
  { name: "Rolls", emoji: "🌯", color: "#f5fff0" },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Murugan Idli Shop",
    cuisine: "South Indian • Tiffin • Meals",
    rating: 4.5,
    time: "25-30 min",
    price: "₹150 for two",
    discount: "50% OFF up to ₹100",
    image: "https://images.unsplash.com/photo-1630409346824-4f12e960d4ab?w=400&h=220&fit=crop",
    tags: ["Bestseller"],
    promoted: true,
  },
  {
    id: 2,
    name: "Anjappar Chettinad",
    cuisine: "Chettinad • Biryani • Non-Veg",
    rating: 4.3,
    time: "35-40 min",
    price: "₹350 for two",
    discount: "₹125 OFF above ₹299",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=400&h=220&fit=crop",
    tags: ["Top Rated"],
    promoted: false,
  },
  {
    id: 3,
    name: "Pizza Hut",
    cuisine: "Pizzas • Pastas • Italian",
    rating: 4.1,
    time: "30-35 min",
    price: "₹400 for two",
    discount: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=220&fit=crop",
    tags: [],
    promoted: true,
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "Burgers • Wraps • Beverages",
    rating: 4.2,
    time: "20-25 min",
    price: "₹250 for two",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=220&fit=crop",
    tags: ["Fast Delivery"],
    promoted: false,
  },
  {
    id: 5,
    name: "Pandian Restaurant",
    cuisine: "Tamil Meals • Biryani • Veg",
    rating: 4.4,
    time: "40-45 min",
    price: "₹200 for two",
    discount: "Free Delivery",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=220&fit=crop",
    tags: ["Pure Veg"],
    promoted: false,
  },
  {
    id: 6,
    name: "KFC",
    cuisine: "Chicken • Burgers • Snacks",
    rating: 4.0,
    time: "25-30 min",
    price: "₹300 for two",
    discount: "30% OFF above ₹199",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&h=220&fit=crop",
    tags: [],
    promoted: true,
  },
  {
    id: 7,
    name: "Sweet Chariot",
    cuisine: "Sweets • Desserts • Bakery",
    rating: 4.6,
    time: "20-25 min",
    price: "₹180 for two",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=220&fit=crop",
    tags: ["Trending"],
    promoted: false,
  },
  {
    id: 8,
    name: "Subway",
    cuisine: "Healthy • Sandwiches • Wraps",
    rating: 3.9,
    time: "20-25 min",
    price: "₹280 for two",
    discount: "Sub of the Day ₹99",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=220&fit=crop",
    tags: [],
    promoted: false,
  },
];

const OFFERS = [
  { label: "50% OFF", sub: "Up to ₹100", color: "#FC8019", emoji: "🔥" },
  { label: "FREE DELIVERY", sub: "On first order", color: "#48c479", emoji: "🛵" },
  { label: "₹125 OFF", sub: "Above ₹299", color: "#8b5cf6", emoji: "🎉" },
  { label: "BUY 1 GET 1", sub: "On selected items", color: "#e74c3c", emoji: "🎁" },
];

export default function Home({ setPage, setSelectedRestaurant }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Pure Veg", "Top Rated", "Fast Delivery", "Offers"];

  const filtered = RESTAURANTS.filter((r) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pure Veg") return r.tags.includes("Pure Veg");
    if (activeFilter === "Top Rated") return r.rating >= 4.3;
    if (activeFilter === "Fast Delivery") return parseInt(r.time) <= 25;
    if (activeFilter === "Offers") return !!r.discount;
    return true;
  });

  return (
    <div style={{ background: "#f4f4f5", minHeight: "100vh" }}>
      {/* ── HERO BANNER ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #FC8019 0%, #e55d0a 100%)",
          padding: "40px 0 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "10%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 700, marginBottom: "8px", letterSpacing: "0.5px" }}>
                🌟 DELIVERING TO
              </p>
              <h1 style={{ color: "#fff", fontSize: "38px", fontWeight: 900, lineHeight: 1.2, marginBottom: "12px" }}>
                Madurai,<br />Tamil Nadu 📍
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "28px" }}>
                50+ restaurants • Delivery in 30 mins
              </p>
              <button
                onClick={() => setPage("menu")}
                style={{
                  background: "#fff", color: "#FC8019", border: "none",
                  borderRadius: "12px", padding: "14px 32px",
                  fontSize: "16px", fontWeight: 900, cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Order Now 🍕
              </button>
            </div>
            <div style={{ fontSize: "140px", opacity: 0.18, userSelect: "none", display: "flex", gap: "8px" }}>
              🍔🍕
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px" }}>

        {/* ── OFFER BANNERS ── */}
        <div style={{ transform: "translateY(-28px)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
            }}
          >
            {OFFERS.map((o) => (
              <div
                key={o.label}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  borderLeft: `4px solid ${o.color}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ fontSize: "28px" }}>{o.emoji}</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: "14px", color: o.color }}>{o.label}</div>
                  <div style={{ fontSize: "12px", color: "#93959f", fontWeight: 600 }}>{o.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORY TILES ── */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#1c1c1c", marginBottom: "20px" }}>
            What's on your mind? 🤔
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "12px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setPage("menu")}
                style={{
                  background: cat.color,
                  borderRadius: "14px",
                  padding: "18px 10px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1.5px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
                  e.currentTarget.style.border = "1.5px solid #FC8019";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.border = "1.5px solid transparent";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>{cat.emoji}</div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#3d4152" }}>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 0 32px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e9e9eb" }} />
          <span style={{ fontSize: "20px" }}>🍽️</span>
          <div style={{ flex: 1, height: "1px", background: "#e9e9eb" }} />
        </div>

        {/* ── RESTAURANT SECTION ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#1c1c1c" }}>
            Restaurants near you
            <span style={{ color: "#93959f", fontWeight: 600, fontSize: "16px", marginLeft: "8px" }}>
              ({filtered.length})
            </span>
          </h2>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 18px",
                borderRadius: "50px",
                border: "1.5px solid",
                borderColor: activeFilter === f ? "#FC8019" : "#e9e9eb",
                background: activeFilter === f ? "#FC8019" : "#fff",
                color: activeFilter === f ? "#fff" : "#3d4152",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── RESTAURANT CARDS GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onClick={() => setPage("menu")} />
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div
          style={{
            marginTop: "48px",
            background: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%)",
            borderRadius: "20px",
            padding: "36px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ color: "#fff", fontSize: "22px", fontWeight: 900, marginBottom: "8px" }}>
              🛵 Deliver with SubbuAjay
            </h3>
            <p style={{ color: "#93959f", fontSize: "15px" }}>
              Earn ₹25,000+ per month. Flexible hours.
            </p>
          </div>
          <button
            style={{
              background: "#FC8019", color: "#fff", border: "none",
              borderRadius: "12px", padding: "14px 28px",
              fontSize: "15px", fontWeight: 800, cursor: "pointer",
            }}
          >
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── RESTAURANT CARD COMPONENT ──
function RestaurantCard({ restaurant: r, onClick }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={r.image}
          alt={r.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x220/FC8019/fff?text=🍽️"; }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {/* Discount badge */}
        {r.discount && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
            padding: "20px 14px 10px",
          }}>
            <span style={{
              background: "#FC8019", color: "#fff",
              padding: "4px 10px", borderRadius: "6px",
              fontSize: "12px", fontWeight: 800,
            }}>
              🏷️ {r.discount}
            </span>
          </div>
        )}

        {/* Promoted badge */}
        {r.promoted && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            color: "#fff", padding: "4px 10px",
            borderRadius: "6px", fontSize: "11px", fontWeight: 700,
          }}>
            PROMOTED
          </div>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          style={{
            position: "absolute", top: "10px", right: "10px",
            background: "rgba(255,255,255,0.9)", border: "none",
            borderRadius: "50%", width: "34px", height: "34px",
            cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {saved ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 900, color: "#1c1c1c", flex: 1, paddingRight: "8px" }}>
            {r.name}
          </h3>
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            background: r.rating >= 4.3 ? "#48c479" : "#FC8019",
            color: "#fff", padding: "4px 8px", borderRadius: "6px",
            fontSize: "13px", fontWeight: 800, flexShrink: 0,
          }}>
            ⭐ {r.rating}
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#686b78", marginBottom: "10px", fontWeight: 600 }}>
          {r.cuisine}
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          paddingTop: "10px", borderTop: "1px solid #f4f4f5",
        }}>
          <span style={{ fontSize: "13px", color: "#3d4152", fontWeight: 700 }}>🕐 {r.time}</span>
          <span style={{ color: "#e9e9eb" }}>•</span>
          <span style={{ fontSize: "13px", color: "#3d4152", fontWeight: 600 }}>{r.price}</span>

          {r.tags.length > 0 && (
            <>
              <span style={{ color: "#e9e9eb" }}>•</span>
              <span style={{
                fontSize: "11px", fontWeight: 800,
                color: "#FC8019", background: "#fff3e8",
                padding: "2px 8px", borderRadius: "4px",
              }}>
                {r.tags[0]}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
