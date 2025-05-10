import { useEffect } from "react";

export default function App() {
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

  const isiOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream;

  const speakInSequence = () => {
    const chunks = ["வணக்கம்", "இந்த ஒரு சோதனை"];
    let chunkIndex = 0;

    const speakNextChunk = () => {
      if (chunkIndex >= chunks.length) return;
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utterance.lang = "ta-IN";
      utterance.onend = () => {
        chunkIndex++;
        setTimeout(speakNextChunk, isiOS ? 700 : 300);
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🔊 Tamil TTS Test</h1>

      <button
        onClick={() => {
          if (typeof window === "undefined" || !window.speechSynthesis) {
            alert("Text-to-speech is not supported in your browser");
            return;
          }
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance("வணக்கம்");
          utterance.lang = "ta-IN";
          window.speechSynthesis.speak(utterance);
        }}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
        }}
      >
        🔊 Test TTS ("வணக்கம்")
      </button>

      <button
        onClick={speakInSequence}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
        }}
      >
        🔁 Speak in Sequence
      </button>
    </div>
  );
}
