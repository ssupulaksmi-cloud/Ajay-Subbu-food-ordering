import { useState, useEffect } from "react";

const URL = "http://localhost:5000";

const STATUSES = ["Order Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

const statusColors = {
  "Order Placed":     { bg: "#fff3e8", color: "#FC8019" },
  "Confirmed":        { bg: "#f0f4ff", color: "#3b82f6" },
  "Preparing":        { bg: "#fff8e8", color: "#f59e0b" },
  "Out for Delivery": { bg: "#f0fff4", color: "#48c479" },
  "Delivered":        { bg: "#f0fff4", color: "#16a34a" },
  "Cancelled":        { bg: "#fff0f0", color: "#e74c3c" },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/order/list`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch { }
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`${URL}/api/order/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      fetchOrders();
    } catch { }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 900 }}>📦 Orders</h2>
        <button
          onClick={fetchOrders}
          style={{ background: "#f4f4f5", border: "none", borderRadius: "8px", padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", fontSize: "40px" }}>⏳</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ fontWeight: 700, color: "#686b78" }}>No orders yet!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {orders.map((order) => {
            const sc = statusColors[order.status] || statusColors["Order Placed"];
            return (
              <div
                key={order._id}
                style={{
                  background: "#fff", borderRadius: "14px", padding: "20px 24px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
                  alignItems: "center", gap: "16px",
                }}
              >
                {/* Order Info */}
                <div>
                  <p style={{ fontSize: "12px", color: "#93959f", fontWeight: 700, marginBottom: "4px" }}>
                    ORDER #{order._id?.slice(-6).toUpperCase()}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: "#3d4152" }}>
                    {order.items?.map((i) => `${i.name} x${i.qty}`).join(", ")}
                  </p>
                  <p style={{ fontSize: "12px", color: "#93959f", marginTop: "4px" }}>
                    📍 {order.address}
                  </p>
                </div>

                {/* Amount & Date */}
                <div>
                  <p style={{ fontWeight: 900, fontSize: "18px", color: "#1c1c1c" }}>₹{order.amount}</p>
                  <p style={{ fontSize: "12px", color: "#93959f", marginTop: "4px" }}>
                    🕐 {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <p style={{ fontSize: "12px", marginTop: "4px", fontWeight: 700, color: order.payment ? "#48c479" : "#FC8019" }}>
                    {order.payment ? "✅ Paid" : "💵 COD"}
                  </p>
                </div>

                {/* Current Status */}
                <div>
                  <span style={{
                    background: sc.bg, color: sc.color,
                    padding: "6px 14px", borderRadius: "50px",
                    fontSize: "12px", fontWeight: 800, display: "inline-block",
                  }}>
                    {order.status}
                  </span>
                </div>

                {/* Update Status */}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  style={{
                    padding: "8px 14px", borderRadius: "8px",
                    border: "1.5px solid #e9e9eb", background: "#fff",
                    fontSize: "13px", fontWeight: 700, cursor: "pointer",
                    color: "#3d4152", fontFamily: "inherit",
                  }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}