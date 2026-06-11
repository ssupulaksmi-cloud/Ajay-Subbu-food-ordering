import { useState, useEffect } from "react";

const STATUSES = ["Order Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`http://localhost:5000/api/order/userorders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.data || []);
      })
      .catch(() => {
        // Demo orders
        setOrders([
          {
            _id: "demo1",
            items: [{ name: "Chicken Biryani", qty: 2 }, { name: "Cold Coffee", qty: 1 }],
            amount: 497,
            status: "Delivered",
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
          },
          {
            _id: "demo2",
            items: [{ name: "Masala Dosa", qty: 1 }],
            amount: 89,
            status: "Out for Delivery",
            date: new Date().toLocaleDateString(),
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔒</div>
        <h3 style={{ fontSize: "22px", fontWeight: 800 }}>Please login to view orders</h3>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === "Delivered") return "#48c479";
    if (status === "Out for Delivery") return "#FC8019";
    return "#3d4152";
  };

  const getStatusIndex = (status) => STATUSES.indexOf(status);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "24px" }}>📦 My Orders</h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", fontSize: "48px" }}>⏳</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "20px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
          <h3 style={{ fontSize: "20px", fontWeight: 800 }}>No orders yet</h3>
          <p style={{ color: "#686b78" }}>Your past orders will appear here</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => {
            const statusIdx = getStatusIndex(order.status);
            return (
              <div
                key={order._id}
                style={{
                  background: "#fff", borderRadius: "16px", padding: "24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#93959f", fontWeight: 600, marginBottom: "4px" }}>
                      Order #{order._id?.slice(-6)?.toUpperCase() || "------"}
                    </p>
                    <p style={{ fontWeight: 700, color: "#3d4152" }}>
                      {order.items?.map((i) => `${i.name} x${i.qty}`).join(", ")}
                    </p>
                    <p style={{ fontSize: "13px", color: "#93959f", marginTop: "4px" }}>{order.date}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 900, fontSize: "18px", color: "#1c1c1c" }}>₹{order.amount}</p>
                    <span
                      style={{
                        background: `${getStatusColor(order.status)}22`,
                        color: getStatusColor(order.status),
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: 800,
                        display: "inline-block",
                        marginTop: "4px",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    {STATUSES.map((s, i) => (
                      <div key={s} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{
                          width: "24px", height: "24px", borderRadius: "50%", margin: "0 auto 4px",
                          background: i <= statusIdx ? "#FC8019" : "#e9e9eb",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", color: "#fff", fontWeight: 800,
                          transition: "background 0.3s",
                        }}>
                          {i <= statusIdx ? "✓" : i + 1}
                        </div>
                        <p style={{ fontSize: "9px", color: i <= statusIdx ? "#FC8019" : "#93959f", fontWeight: 700 }}>
                          {s.split(" ").map(w => w[0]).join("")}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: "4px", background: "#e9e9eb", borderRadius: "2px", position: "relative" }}>
                    <div style={{
                      height: "100%", borderRadius: "2px", background: "#FC8019",
                      width: `${(statusIdx / (STATUSES.length - 1)) * 100}%`,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
