import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

console.log("KEY:", process.env.GEMINI_API_KEY?.slice(0, 6));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are a helpful AI assistant that can play guitar music.
      If the user asks to play a song, return a JSON object with:
      - "active": true
      - "reply": "Sure, here is [Song Name]!"
      - "song": Array of notes. Each note has:
         - "string": 0-5 (0=High E, 1=B, 2=G, 3=D, 4=A, 5=Low E)
         - "fret": 0-12
         - "duration": time in seconds (e.g. 0.5)

      If the user is just chatting, return:
      - "active": false
      - "reply": "Your response..."
      
      User message: ${message}
    `;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(8787, () => {
  console.log("API server on http://localhost:8787");
});
