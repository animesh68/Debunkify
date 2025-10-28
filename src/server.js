import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/huggingface", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a gothic oracle who answers in a dark, eerie tone.\nUser: "${prompt}"\nOracle:`,
        }),
      }
    );

    const data = await response.json();
    console.log("Raw HuggingFace response:", JSON.stringify(data, null, 2));

    // Try every possible path HuggingFace might use
    let text =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      data?.[0]?.text ||
      data?.text ||
      data?.message ||
      "";

    // If it’s still empty, use a default
    if (!text || typeof text !== "string" || text.trim() === "") {
      text = "The abyss whispers nothing...";
    }

    res.json({ text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "The abyss refused to answer." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
