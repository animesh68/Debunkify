import React, { useState } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Rabbithole = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

   const buildPrompt = (userInput) => `
You are **The Oracle of the Abyss**, an intelligent and unnervingly calm AI that debunks conspiracy theories.

Respond in a concise, well-structured format using markdown symbols and keep your total output under **300 words**.
Be dramatic, but not verbose.

━━━━━━━━━━━━━━━━━━━━━━
🕳️ **Conspiracy:** "${userInput}"

Respond in this exact format:

1. 🧩 **Main Claims**
   - List 2–3 main ideas behind the conspiracy briefly.

2. 🧠 **Debunking**
   - Give clear, factual counterpoints (2–3 sentences max).

3. 🌀 **Why Some Believe It**
   - Explain psychological or situational reasons in 1–2 lines.

4. 🌒 **What Might Be True**
   - Mention one possible element that keeps it believable.

5. 📊 **Truth Score**
   - Give a numeric value (0–100) and short interpretation.

6. 💀 **Final Verdict**
   - A haunting one-line closing remark.
━━━━━━━━━━━━━━━━━━━━━━

Keep language chilling yet easy to read.
`;

  const callGemini = async (prompt) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: buildPrompt(prompt) }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "The abyss whispers nothing...";

      setResponse(text);
    } catch (err) {
      setResponse("⚠️ The abyss refused to answer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) {
      setResponse("🕳️ The void echoes back nothing... Type something first.");
      return;
    }
    callGemini(input);
  };

  return (
    <div
      className="rabbi"
      style={{
        color: "white",
        backgroundColor: "black",
        padding: "2rem",
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      <h1 className="icey" style={{ fontSize: "2rem", color: "#ff004c" }}>
        🔮 Enter the Rabbit Hole
      </h1>

      <div className="input-container" style={{ marginTop: "1rem" }}>
        <textarea
          className="icew"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your forbidden question..."
          rows={3}
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: "#111",
            color: "white",
            border: "1px solid #ff004c",
            borderRadius: "8px",
            resize: "none",
          }}
        />
        <br />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#ff004c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Summoning..." : "Send"}
        </button>
      </div>

      <div
        className="response-area"
        style={{
          marginTop: "2rem",
          whiteSpace: "pre-wrap",
          borderTop: "1px solid #ff004c",
          paddingTop: "1rem",
        }}
      >
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default Rabbithole;
