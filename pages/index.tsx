// pages/index.tsx (TypeScript file)
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    handleVoicesChanged();
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance("வணக்கம்");
    utterance.lang = "ta-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🔊 Tamil TTS Test – Next.js</h1>
      <button
        onClick={speak}
        style={{
          padding: "10px 20px",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🔊 Speak "வணக்கம்"
      </button>
    </div>
  );
}
