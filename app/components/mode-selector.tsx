"use client"

interface ModeSelectorProps {
  activeMode: string
  onModeChange: (mode: string) => void
}

export default function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div
      className="flex gap-1 justify-center mx-auto p-1 rounded-full"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 2px rgba(255,255,255,0.8)",
        maxWidth: "200px",
      }}
    >
      <button
        onClick={() => onModeChange("text")}
        className="flex-1 py-1.5 px-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-1 active:scale-95"
        style={{
          fontSize: "11px",
          backgroundColor: activeMode === "text" ? "#FF9EBF" : "transparent",
          color: activeMode === "text" ? "white" : "#B0A0A0",
          boxShadow: activeMode === "text" ? "0 2px 8px rgba(255, 158, 191, 0.4)" : "none",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
      >
        <span style={{ fontSize: "12px" }}>📝</span>
        Text
      </button>

      <button
        onClick={() => onModeChange("picture")}
        className="flex-1 py-1.5 px-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-1 active:scale-95"
        style={{
          fontSize: "11px",
          backgroundColor: activeMode === "picture" ? "#A8D8EA" : "transparent",
          color: activeMode === "picture" ? "white" : "#B0A0A0",
          boxShadow: activeMode === "picture" ? "0 2px 8px rgba(168, 216, 234, 0.4)" : "none",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
      >
        <span style={{ fontSize: "12px" }}>📸</span>
        Picture
      </button>
    </div>
  )
}
