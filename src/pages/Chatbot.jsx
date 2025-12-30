import { useState } from "react";
import "../style/Chatbot.css";
import { useGuitar } from "../hooks/useGuitar";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I am Gemini chatbot～" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { playStringFret } = useGuitar();

  async function playSong(notes) {
    for (const note of notes) {
      if (note.string !== undefined && note.fret !== undefined) {
        playStringFret(note.string, note.fret);
      }
      // Wait for the duration of the note before the next one
      await new Promise((r) => setTimeout(r, (note.duration || 0.5) * 1000));
    }
  }

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

      if (data.active && Array.isArray(data.song)) {
        playSong(data.song);
      }

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
          placeholder="Ask me to play a song! (e.g., 'Play Twinkle Twinkle Little Star')"
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={send} disabled={loading}>Ok</button>
      </div>
    </div>
  );
}
