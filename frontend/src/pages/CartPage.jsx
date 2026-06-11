import { useState } from "react";

export default function CartPage({ cart, addToCart, removeFromCart, clearCart, user, setPage }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const placeOrder = async () => {
    if (!user) { setPage("login"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items: cart,
          amount: total,
          address: user.address || "Madurai, Tamil Nadu",
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        setOrderPlaced(true);
      }
    } catch {
      // Demo mode - show success anyway
      clearCart();
      setOrderPlaced(true);
    }
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div style={{ maxWidth: "600px", margin: "60px auto", textAlign: "center", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "48px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎉</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#1c1c1c", marginBottom: "12px" }}>Order Placed!</h2>
          <p style={{ color: "#686b78", fontSize: "16px", marginBottom: "24px" }}>
            Your food is being prepared. Estimated delivery: <strong>30-45 min</strong>
          </p>
          <div style={{ background: "#f4f4f5", borderRadius: "12px", padding: "16px", marginBottom: "28px" }}>
            <p style={{ fontWeight: 700, color: "#3d4152" }}>🛵 Delivery Partner on the way!</p>
          </div>
          <button
            onClick={() => setPage("menu")}
            style={{
              background: "#FC8019", color: "#fff", border: "none",
              borderRadius: "10px", padding: "14px 32px",
              fontSize: "16px", fontWeight: 800, cursor: "pointer",
            }}
          >
            Order More Food
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: "600px", margin: "60px auto", textAlign: "center", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "48px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</div>
          <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>Your cart is empty</h2>
          <p style={{ color: "#686b78", marginBottom: "28px" }}>Add items from the menu to get started!</p>
          <button
            onClick={() => setPage("menu")}
            style={{
              background: "#FC8019", color: "#fff", border: "none",
              borderRadius: "10px", padding: "14px 32px",
              fontSize: "16px", fontWeight: 800, cursor: "pointer",
            }}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px" }}>
      {/* Cart Items */}
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "20px" }}>
          🛒 Your Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff", borderRadius: "14px", padding: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex", alignItems: "center", gap: "16px",
              }}
            >
              <img
                src={item.image || `https://via.placeholder.com/80x80/FC8019/fff?text=Food`}
                alt={item.name}
                style={{ width: "72px", height: "72px", borderRadius: "10px", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/80x80/FC8019/fff?text=🍔"; }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 800, fontSize: "15px", marginBottom: "4px" }}>{item.name}</h4>
                <p style={{ color: "#FC8019", fontWeight: 900, fontSize: "16px" }}>₹{item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1.5px solid #FC8019", borderRadius: "8px" }}>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{ background: "none", border: "none", width: "34px", height: "34px", fontSize: "18px", color: "#FC8019", cursor: "pointer", fontWeight: 900 }}
                >
                  −
                </button>
                <span style={{ fontWeight: 800, color: "#FC8019", minWidth: "24px", textAlign: "center" }}>{item.qty}</span>
                <button
                  onClick={() => addToCart(item)}
                  style={{ background: "none", border: "none", width: "34px", height: "34px", fontSize: "18px", color: "#FC8019", cursor: "pointer", fontWeight: 900 }}
                >
                  +
                </button>
              </div>
              <div style={{ fontWeight: 900, fontSize: "16px", minWidth: "70px", textAlign: "right" }}>
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "sticky", top: "90px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 900, marginBottom: "20px" }}>Order Summary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {[
              { label: "Subtotal", value: `₹${subtotal}` },
              { label: "Delivery fee", value: `₹${delivery}` },
              { label: "Taxes (5%)", value: `₹${tax}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#686b78" }}>
                <span>{label}</span>
                <span style={{ fontWeight: 700 }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "2px solid #f4f4f5", paddingTop: "16px", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
            <span style={{ fontWeight: 900, fontSize: "17px" }}>Total</span>
            <span style={{ fontWeight: 900, fontSize: "20px", color: "#FC8019" }}>₹{total}</span>
          </div>

          {/* Delivery Address */}
          <div style={{ background: "#f4f4f5", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
            <p style={{ fontSize: "12px", color: "#93959f", fontWeight: 700, marginBottom: "4px" }}>📍 DELIVERY TO</p>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#3d4152" }}>
              {user?.address || "Madurai, Tamil Nadu, India"}
            </p>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            style={{
              width: "100%", background: loading ? "#ccc" : "#FC8019",
              color: "#fff", border: "none", borderRadius: "12px",
              padding: "16px", fontSize: "16px", fontWeight: 900,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Placing Order..." : user ? `Place Order • ₹${total}` : "Login to Place Order"}
          </button>

          <button
            onClick={clearCart}
            style={{
              width: "100%", background: "none", color: "#e74c3c",
              border: "1px solid #e74c3c", borderRadius: "12px",
              padding: "12px", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", marginTop: "10px",
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
