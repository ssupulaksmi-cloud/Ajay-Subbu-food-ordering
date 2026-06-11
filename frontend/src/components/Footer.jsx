export default function Footer() {
  return (
    <footer
      style={{
        background: "#1c1c1c",
        color: "#fff",
        padding: "48px 0 24px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#FC8019",
                marginBottom: "12px",
              }}
            >
              🍔 SubbuAjay.
            </div>
            <p style={{ color: "#93959f", fontSize: "14px", lineHeight: "1.7" }}>
              Delivering happiness to your doorstep. Order from your favourite restaurants in minutes.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#2d2d2d",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FC8019")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2d2d2d")}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: "16px", fontSize: "15px" }}>Company</h4>
            {["About Us", "Team", "Careers", "Blog", "Press"].map((link) => (
              <p key={link} style={{ color: "#686b78", fontSize: "14px", marginBottom: "10px", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FC8019")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#686b78")}>
                {link}
              </p>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: "16px", fontSize: "15px" }}>Support</h4>
            {["Help & FAQ", "Partner with us", "Ride with us", "Privacy Policy", "Terms"].map((link) => (
              <p key={link} style={{ color: "#686b78", fontSize: "14px", marginBottom: "10px", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FC8019")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#686b78")}>
                {link}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: "16px", fontSize: "15px" }}>Contact</h4>
            <p style={{ color: "#686b78", fontSize: "14px", marginBottom: "10px" }}>📞 1800-208-1234</p>
            <p style={{ color: "#686b78", fontSize: "14px", marginBottom: "10px" }}>📧 support@swiggy.com</p>
            <p style={{ color: "#686b78", fontSize: "14px" }}>📍 Madurai, Tamil Nadu</p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #2d2d2d",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#686b78", fontSize: "13px" }}>
            © 2026 Swiggy Clone. Built with ❤️ in Tamil Nadu.
          </p>
          <p style={{ color: "#FC8019", fontSize: "13px", fontWeight: 700 }}>
            Made with React + Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}
