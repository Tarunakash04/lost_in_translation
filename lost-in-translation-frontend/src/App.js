import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [translations, setTranslations] = useState([]);
  const [finalText, setFinalText] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
        text,
      });
      setTranslations(response.data.translations);
      setFinalText(response.data.final);
    } catch (error) {
      console.error("Translation failed:", error);
      setFinalText("Error in translation");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lost in Translation</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translation Journey:</h2>
      <ul>
        {translations.map((t, index) => (
          <li key={index}>{t.lang.toUpperCase()}: {t.text}</li>
        ))}
      </ul>
      <h2>Final Translation:</h2>
      <p>{finalText}</p>
    </div>
  );
}

export default App;
