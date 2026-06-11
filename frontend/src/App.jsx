import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) return prev.map((i) => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === id);
      if (exists && exists.qty > 1) return prev.map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i));
      return prev.filter((i) => i._id !== id);
    });
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "menu":
        return <Menu addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} search={search} />;
      case "cart":
        return <CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} user={user} setPage={setPage} />;
      case "login":
        return <Login setUser={setUser} setPage={setPage} />;
      case "register":
        return <Register setUser={setUser} setPage={setPage} />;
      case "orders":
        return <Orders user={user} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      <Navbar
        cartCount={cartCount}
        setPage={setPage}
        page={page}
        user={user}
        setUser={setUser}
        search={search}
        setSearch={setSearch}
      />
      <main style={{ minHeight: "80vh", paddingTop: "72px" }}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
