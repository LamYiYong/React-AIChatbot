import { useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I am Gemini chatbot～" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("http://localhost:8787/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply ?? "(no reply)" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
      <h1>AI Chatbot (Gemini)</h1>

      <div style={{ border: "1px solid #ddd", padding: 12, height: 420, overflow: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "8px 0" }}>
            <b>{m.role === "user" ? "You" : "Bot"}：</b> {m.text}
          </div>
        ))}
        {loading && <div>Bot：Thinking</div>}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask any question:"
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={send} disabled={loading}>Ok</button>
      </div>
    </div>
  );
}
