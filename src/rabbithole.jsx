import React, { useState } from "react";

const Rabbithole = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // spooky typing effect
  const typeEffect = (text) => {
    let i = 0;
    setResponse("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setResponse((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
  };

  const callBackend = async (prompt) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/huggingface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      const text = data.text || "The abyss whispers nothing...";
      typeEffect(text);
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
    callBackend(input);
  };

  return (
    <div className="rabbi">
      <h1 className="icey">🔮 Enter the Rabbit Hole</h1>

      <div className="input-container">
        <textarea
          className="icew"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your forbidden question..."
          rows={3}
          disabled={loading}
        />
        <button className="send-btn" onClick={handleSend} disabled={loading}>
          {loading ? "Summoning..." : "Send"}
        </button>
      </div>

      <div className="response-area">
        {loading ? (
          <p className="loading-text">Contacting the abyss...</p>
        ) : (
          response && <p className="abyss-response">{response}</p>
        )}
      </div>
    </div>
  );
};

export default Rabbithole;
