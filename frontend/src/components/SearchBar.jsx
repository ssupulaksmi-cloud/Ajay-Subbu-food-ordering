export default function SearchBar({ search, setSearch }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f4f4f5",
        borderRadius: "10px",
        padding: "0 16px",
        height: "44px",
        gap: "10px",
        border: "1.5px solid transparent",
        transition: "border 0.2s",
      }}
      onFocus={(e) =>
        (e.currentTarget.style.border = "1.5px solid #FC8019")
      }
      onBlur={(e) =>
        (e.currentTarget.style.border = "1.5px solid transparent")
      }
    >
      <span style={{ fontSize: "18px", opacity: 0.5 }}>🔍</span>
      <input
        type="text"
        placeholder="Search for dishes, restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          background: "none",
          border: "none",
          outline: "none",
          fontSize: "14px",
          fontWeight: 600,
          color: "#1c1c1c",
          width: "100%",
          fontFamily: "'Nunito', sans-serif",
        }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          style={{
            background: "#93959f",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
