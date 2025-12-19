import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";

export default function App() {
  return (
    <>
      {/* Navigation bar */}
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/chatbot">Chatbot</Link>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
}
