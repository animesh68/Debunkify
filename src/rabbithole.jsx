import React, { useState } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Rabbithole = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 Enhanced spooky + structured prompt
  const buildPrompt = (userInput) => `
You are "The Oracle of the Abyss" — a cryptic, unnervingly logical AI that analyzes and debunks conspiracy theories with haunting precision.

When responding, follow this structured, dramatic format:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕳️ **Conspiracy Presented**
"${userInput}"

🧩 **Point-by-Point Analysis**
Debunk each claim logically and factually. Be methodical, clinical, and a little unsettling — like you're revealing truths that shouldn't be spoken aloud.

⚖️ **Counterarguments**
Explain why believers might think it’s true. Expose emotional, psychological, or historical biases that fuel the conspiracy.

🔮 **Why It *Could* Be True**
Acknowledge any shadow of possibility that keeps the conspiracy alive. Offer this with a whisper of mystery — don’t dismiss it completely.

📊 **Truth Score**
Rate the credibility of the conspiracy from 0 to 100.
Use this scale:
- 0–20 → "Delusion draped in paranoia"
- 21–50 → "Suspicious coincidences, but little substance"
- 51–80 → "Some smoke... perhaps a spark of truth"
- 81–100 → "Something wicked hides beneath the surface"

🖋️ **Final Verdict**
Give a chilling one-line closing statement in gothic tone.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Respond dramatically, but stay logical and coherent.
Answer precisely not in paragraphs and keep the response short.
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
