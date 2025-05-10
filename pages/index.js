// pages/index.js
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance("வணக்கம்");
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang === "ta-IN");

    if (tamilVoice) {
      utterance.voice = tamilVoice;
    } else {
      alert("Tamil voice not available on this device. Using default.");
    }

    utterance.lang = "ta-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🔊 Tamil TTS App</h1>
      <p>This works on desktop and iOS (with fallback).</p>
      <button
        onClick={speak}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        🔊 Speak வணக்கம்
      </button>
    </div>
  );
}
