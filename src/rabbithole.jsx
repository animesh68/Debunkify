import React, { useState } from "react";

const HF_API_KEY = "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";

const Rabbithole = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // ✨ Adds spooky instruction before sending the prompt
  const buildPrompt = (userInput) => {
    return `
      You are a mysterious AI from the dark web that debunks conspiracy theories
      with a spooky, eerie, gothic tone. 
      Be dramatic and unsettling, like whispering forbidden truths.
      
      The user asks: "${userInput}"
      
      Now, respond in that style.
    `;
  };

  
  const typeEffect = (text) => {
    let index = 0;
    setResponse("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setResponse((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
  };

  // 🧠 Calls Hugging Face Zephyr model
  const callHuggingFace = async (prompt) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: buildPrompt(prompt) }),
        }
      );

      if (!res.ok) throw new Error(`API Error: ${res.status}`);

      const data = await res.json();
      const text =
        data?.[0]?.generated_text ||
        data?.generated_text ||
        "The abyss whispers nothing...";

      typeEffect(text);
    } catch (err) {
      setResponse("⚠️ The abyss refused to answer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ On Send button click
  const handleSend = () => {
    if (!input.trim()) {
      setResponse("🕳️ The void echoes back nothing... Type something first.");
      return;
    }
    callHuggingFace(input);
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
