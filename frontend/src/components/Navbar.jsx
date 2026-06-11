import { useState } from "react";
import SearchBar from "./SearchBar";

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "#fff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    height: "72px",
    display: "flex",
    alignItems: "center",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: 900,
    color: "#FC8019",
    letterSpacing: "-1px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'Nunito', sans-serif",
  },
  logoSpan: {
    color: "#1c1c1c",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
    borderBottom: "2px solid #FC8019",
    paddingBottom: "2px",
    whiteSpace: "nowrap",
  },
  locationText: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#1c1c1c",
  },
  locationSub: {
    fontSize: "12px",
    color: "#686b78",
    fontWeight: 500,
  },
  searchWrap: {
    flex: 1,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
  },
  navBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#3d4152",
    transition: "all 0.2s",
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#FC8019",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
    position: "relative",
  },
  badge: {
    background: "#fff",
    color: "#FC8019",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 900,
  },
};

export default function Navbar({ cartCount, setPage, page, user, setUser, search, setSearch }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => setPage("menu")}>
          🍔 <span>SubbuAjay</span>
          <span style={styles.logoSpan}>.</span>
        </div>

        {/* Location */}
        <div style={styles.location}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={styles.locationText}>Madurai</span>
              <span style={{ color: "#FC8019", fontSize: "18px" }}>▾</span>
            </div>
            <div style={styles.locationSub}>Tamil Nadu, India</div>
          </div>
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {/* Nav Links */}
        <div style={styles.navLinks}>
          <button
            style={{
              ...styles.navBtn,
              color: page === "menu" ? "#FC8019" : "#3d4152",
            }}
            onClick={() => setPage("menu")}
          >
            🍽️ Menu
          </button>

          {user ? (
            <div style={{ position: "relative" }}>
              <button
                style={styles.navBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user.name?.split(" ")[0]}
              </button>
              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "44px",
                    right: 0,
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    padding: "8px",
                    minWidth: "180px",
                    zIndex: 100,
                  }}
                >
                  <button
                    style={{ ...styles.navBtn, width: "100%", textAlign: "left" }}
                    onClick={() => { setPage("orders"); setShowUserMenu(false); }}
                  >
                    📦 My Orders
                  </button>
                  <hr style={{ border: "none", borderTop: "1px solid #e9e9eb", margin: "4px 0" }} />
                  <button
                    style={{ ...styles.navBtn, width: "100%", textAlign: "left", color: "#e74c3c" }}
                    onClick={() => { setUser(null); setShowUserMenu(false); }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button style={styles.navBtn} onClick={() => setPage("login")}>
                Login
              </button>
              <button
                style={{
                  ...styles.navBtn,
                  background: "#1c1c1c",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                onClick={() => setPage("register")}
              >
                Sign Up
              </button>
            </>
          )}

          {/* Cart */}
          <button
            style={styles.cartBtn}
            onClick={() => setPage("cart")}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e06b10")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FC8019")}
          >
            🛒 Cart
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
