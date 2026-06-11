const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
    cursor: "pointer",
  },
  imageWrap: {
    position: "relative",
    height: "180px",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  discount: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#FC8019",
    color: "#fff",
    borderRadius: "6px",
    padding: "3px 10px",
    fontSize: "12px",
    fontWeight: 800,
  },
  body: {
    padding: "14px 16px 16px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "6px",
  },
  name: {
    fontSize: "16px",
    fontWeight: 800,
    color: "#1c1c1c",
    lineHeight: "1.3",
    flex: 1,
    paddingRight: "8px",
  },
  vegBadge: {
    width: "18px",
    height: "18px",
    borderRadius: "3px",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  },
  vegDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  desc: {
    fontSize: "13px",
    color: "#686b78",
    marginBottom: "12px",
    lineHeight: "1.5",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceWrap: {},
  price: {
    fontSize: "18px",
    fontWeight: 900,
    color: "#1c1c1c",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "#f4f4f5",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#3d4152",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    border: "1.5px solid #FC8019",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    width: "32px",
    height: "32px",
    fontSize: "18px",
    fontWeight: 900,
    color: "#FC8019",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
  },
  qtyNum: {
    fontSize: "14px",
    fontWeight: 800,
    color: "#FC8019",
    minWidth: "20px",
    textAlign: "center",
  },
  addNewBtn: {
    background: "#FC8019",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default function FoodCard({ item, addToCart, removeFromCart, qty }) {
  const isVeg = item.category !== "Non-Veg";

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image */}
      <div style={styles.imageWrap}>
        <img
          src={item.image || `https://source.unsplash.com/400x300/?${encodeURIComponent(item.name)},food`}
          alt={item.name}
          style={styles.img}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/FC8019/fff?text=${encodeURIComponent(item.name)}`;
          }}
        />
        {item.discount && (
          <div style={styles.discount}>{item.discount}% OFF</div>
        )}
      </div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.topRow}>
          <div style={styles.name}>{item.name}</div>
          <div
            style={{
              ...styles.vegBadge,
              borderColor: isVeg ? "#48c479" : "#e74c3c",
            }}
          >
            <div
              style={{
                ...styles.vegDot,
                background: isVeg ? "#48c479" : "#e74c3c",
              }}
            />
          </div>
        </div>

        <div style={styles.desc}>
          {item.description || "Delicious and freshly prepared just for you."}
        </div>

        <div style={styles.bottomRow}>
          <div>
            <div style={styles.rating}>
              ⭐ {item.rating || "4.2"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "12px", color: "#93959f", marginBottom: "4px" }}>
              ₹{item.price}
            </div>
          </div>

          {qty > 0 ? (
            <div style={styles.addBtn}>
              <button
                style={styles.qtyBtn}
                onClick={() => removeFromCart(item._id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff3e8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                −
              </button>
              <span style={styles.qtyNum}>{qty}</span>
              <button
                style={styles.qtyBtn}
                onClick={() => addToCart(item)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff3e8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                +
              </button>
            </div>
          ) : (
            <button
              style={styles.addNewBtn}
              onClick={() => addToCart(item)}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e06b10")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FC8019")}
            >
              + ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
