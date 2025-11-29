"use client"

import BingoApp from "@/components/bingo-app"

export default function Home() {
  return (
    <main
      style={{
        background: "linear-gradient(to bottom right, #FFF5F0, #F5E6FF, #E6F3FF)",
      }}
      className="min-h-screen"
    >
      <BingoApp />
    </main>
  )
}
