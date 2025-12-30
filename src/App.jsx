import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Guitar from "./pages/Guitar";

export default function App() {
  return (
    <>
      {/* Navigation bar */}
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/chatbot" style={{ marginRight: 12 }}>Chatbot</Link>
        <Link to="/guitar">Guitar</Link>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/guitar" element={<Guitar />} />
      </Routes>
    </>
  );
}
