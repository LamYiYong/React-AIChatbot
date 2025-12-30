
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API key found!");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("Fetching models...");

try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        console.error("Error from API:", data.error);
    } else if (data.models) {
        const output = data.models.map(m => `- ${m.name} (${m.displayName})`).join("\n");
        import("fs").then(fs => fs.writeFileSync("server/models_output.txt", output));
        console.log("Written to server/models_output.txt");
    } else {
        console.log("Unexpected response:", data);
    }
} catch (error) {
    console.error("Request failed:", error);
}
