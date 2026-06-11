import { useState } from "react";

export default function Login({ setUser, setPage }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError("Please fill all fields"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user || { name: form.email.split("@")[0], email: form.email, _id: Date.now() });
        setPage("menu");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      // Demo mode
      setUser({ name: form.email.split("@")[0], email: form.email, _id: Date.now() });
      setPage("menu");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "48px", width: "100%", maxWidth: "440px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>🔑</div>
          <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#1c1c1c" }}>Welcome back!</h2>
          <p style={{ color: "#686b78", marginTop: "6px" }}>Login to continue ordering</p>
        </div>

        {error && (
          <div style={{ background: "#fff0f0", border: "1px solid #e74c3c", borderRadius: "10px", padding: "12px 16px", color: "#e74c3c", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Email", key: "email", type: "email", placeholder: "you@example.com", icon: "📧" },
            { label: "Password", key: "password", type: "password", placeholder: "••••••••", icon: "🔒" },
          ].map(({ label, key, type, placeholder, icon }) => (
            <div key={key}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#3d4152", display: "block", marginBottom: "8px" }}>
                {label}
              </label>
              <div style={{ display: "flex", alignItems: "center", background: "#f4f4f5", borderRadius: "10px", padding: "0 14px", border: "1.5px solid transparent", transition: "border 0.2s" }}
                onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #FC8019")}
                onBlur={(e) => (e.currentTarget.style.border = "1.5px solid transparent")}>
                <span style={{ marginRight: "8px" }}>{icon}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  style={{ background: "none", border: "none", outline: "none", padding: "14px 0", fontSize: "15px", fontFamily: "inherit", width: "100%", color: "#1c1c1c" }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: loading ? "#ccc" : "#FC8019", color: "#fff", border: "none",
              borderRadius: "12px", padding: "16px", fontSize: "16px",
              fontWeight: 900, cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#e06b10")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#FC8019")}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#686b78", fontSize: "14px" }}>
          New here?{" "}
          <span
            onClick={() => setPage("register")}
            style={{ color: "#FC8019", fontWeight: 800, cursor: "pointer" }}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
