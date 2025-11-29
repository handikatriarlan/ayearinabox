"use client"

export default function Header() {
  return (
    <div className="text-center pt-2">
      <h1
        className="font-bold mb-1"
        style={{
          fontSize: "22px",
          background: "linear-gradient(135deg, #FF9EBF 0%, #FF9D7B 50%, #FFD7B3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "var(--font-fredoka), sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        2025 Wrapped Bingo
      </h1>

      <p
        className="px-6"
        style={{
          fontSize: "10px",
          color: "#9D8B8B",
          fontFamily: "var(--font-poppins), sans-serif",
          lineHeight: 1.4,
        }}
      >
        your chaotic, fun year in one cute board
      </p>

      <div className="flex justify-center items-center gap-2 mt-2" style={{ fontSize: "10px", color: "#E0C8D0" }}>
        <span>♡</span>
        <span style={{ fontSize: "6px" }}>●</span>
        <span>♡</span>
        <span style={{ fontSize: "6px" }}>●</span>
        <span>♡</span>
      </div>
    </div>
  )
}
