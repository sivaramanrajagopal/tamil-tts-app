import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance("வணக்கம்");
    utterance.lang = "ta-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🔊 Tamil TTS</h1>
      <button onClick={speak}>🔊 Speak</button>
    </div>
  );
}
