export default function Navbar() {
  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e9e9eb",
      padding: "0 28px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontSize: "22px", fontWeight: 900, color: "#FC8019" }}>
        🍔 SubbuAjay <span style={{ color: "#1c1c1c", fontSize: "14px", fontWeight: 700 }}>Admin Panel</span>
      </div>
      <div style={{
        background: "#FC8019",
        color: "#fff",
        borderRadius: "8px",
        padding: "6px 16px",
        fontSize: "13px",
        fontWeight: 800,
      }}>
        👤 Admin
      </div>
    </nav>
  );
}