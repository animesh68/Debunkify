import { useState } from "react";

function Rabbithole() {
  const [text, setText] = useState("");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // adjust to content
    setText(e.target.value);
  };

  return (
    <div className="rabbi">
      <h1 className="icey">Dive Into the RabbitHole</h1>
      <div className="input-container">
        <textarea
          className="icew"
          placeholder="Type your conspiracy theory here..."
          value={text}
          onInput={handleInput}
          rows="3"
        />
        <button className="send-btn">Send</button>
      </div>
    </div>
  );
}

export default Rabbithole;
