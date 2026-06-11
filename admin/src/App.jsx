import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddFood from "./pages/AddFood";
import ListFood from "./pages/ListFood";
import Orders from "./pages/Orders";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("orders");

  const renderPage = () => {
    switch (page) {
      case "add":    return <AddFood />;
      case "list":   return <ListFood />;
      case "orders": return <Orders />;
      default:       return <Orders />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar page={page} setPage={setPage} />
        <main style={{ flex: 1, background: "#f4f4f5", padding: "28px", overflowY: "auto" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}