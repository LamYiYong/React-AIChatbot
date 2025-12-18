import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const reply =
      result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});


app.listen(8787, () => console.log("API server on http://localhost:8787"));
