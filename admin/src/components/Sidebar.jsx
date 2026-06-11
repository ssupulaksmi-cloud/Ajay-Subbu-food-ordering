const links = [
  { id: "orders", label: "Orders",   emoji: "📦" },
  { id: "list",   label: "Food List", emoji: "🍽️" },
  { id: "add",    label: "Add Food",  emoji: "➕" },
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside style={{
      width: "220px",
      background: "#fff",
      borderRight: "1px solid #e9e9eb",
      padding: "24px 12px",
      minHeight: "calc(100vh - 64px)",
    }}>
      <p style={{ fontSize: "11px", fontWeight: 800, color: "#93959f", padding: "0 12px", marginBottom: "12px", letterSpacing: "1px" }}>
        MENU
      </p>
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => setPage(link.id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: page === link.id ? "#fff3e8" : "none",
            color: page === link.id ? "#FC8019" : "#3d4152",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            marginBottom: "4px",
            transition: "all 0.2s",
            borderLeft: page === link.id ? "3px solid #FC8019" : "3px solid transparent",
          }}
        >
          <span style={{ fontSize: "18px" }}>{link.emoji}</span>
          {link.label}
        </button>
      ))}
    </aside>
  );
}