import { useState } from "react";

export default function Register({ setUser, setPage }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) { setError("Please fill all fields"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user || { name: form.name, email: form.email, _id: Date.now() });
        setPage("menu");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setUser({ name: form.name, email: form.email, _id: Date.now() });
      setPage("menu");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "48px", width: "100%", maxWidth: "440px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>🚀</div>
          <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#1c1c1c" }}>Create Account</h2>
          <p style={{ color: "#686b78", marginTop: "6px" }}>Join us and start ordering!</p>
        </div>

        {error && (
          <div style={{ background: "#fff0f0", border: "1px solid #e74c3c", borderRadius: "10px", padding: "12px 16px", color: "#e74c3c", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Your name", icon: "👤" },
            { label: "Email", key: "email", type: "email", placeholder: "you@example.com", icon: "📧" },
            { label: "Password", key: "password", type: "password", placeholder: "Min 6 characters", icon: "🔒" },
          ].map(({ label, key, type, placeholder, icon }) => (
            <div key={key}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#3d4152", display: "block", marginBottom: "8px" }}>
                {label}
              </label>
              <div style={{ display: "flex", alignItems: "center", background: "#f4f4f5", borderRadius: "10px", padding: "0 14px", border: "1.5px solid transparent" }}
                onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #FC8019")}
                onBlur={(e) => (e.currentTarget.style.border = "1.5px solid transparent")}>
                <span style={{ marginRight: "8px" }}>{icon}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  style={{ background: "none", border: "none", outline: "none", padding: "14px 0", fontSize: "15px", fontFamily: "inherit", width: "100%", color: "#1c1c1c" }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              background: loading ? "#ccc" : "#FC8019", color: "#fff", border: "none",
              borderRadius: "12px", padding: "16px", fontSize: "16px",
              fontWeight: 900, cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#e06b10")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#FC8019")}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#686b78", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => setPage("login")}
            style={{ color: "#FC8019", fontWeight: 800, cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
