"use client"

import { useState, useEffect } from "react"
import BingoGrid from "./bingo-grid"
import ModeSelector from "./mode-selector"
import ControlPanel from "./control-panel"
import Header from "./header"

const TEXT_PROMPTS = [
  "Ketemu teman baru",
  "Jalan ke tempat baru",
  "Beli wishlist lama",
  "Ganti device/casing",
  "Pindah tempat tinggal",
  "Upgrade skill baru",
  "Mulai hobi baru",
  "Ikut event seru",
  "Bangga sama diri sendiri",
  "Nonton konser",
  "Reuni teman lama",
  "Mulai nabung dikit",
  "Masuk fase baru",
  "Rutinitas baru muncul",
  "Butterfly era",
  "Pencapaian kecil bahagia",
  "Pengalaman kerja baru",
  "Liburan sendiri",
  "Ganti gaya rambut",
  "Beli skincare baru",
  "Overthinking night",
  "Orang toxic berkurang",
  "Nemu lagu favorit",
  "Insight hidup baru",
  "Bersihin following IG",
]

const PICTURE_CATEGORIES = [
  "Fav Moments of the Year",
  "Mirror Selfie",
  "Bareng Teman Terdekat",
  "Peliharaan / Hewan Gemes",
  "Makanan Terenak",
  "Sunset / Sunrise",
  "Outfit of the Year",
  "Liburan Kamu",
  "Random yang Jadi Favorit",
  "Best Memory with Family",
  "Ss Chat Meaningful",
  "Something You Bought",
  "Kegiatan Favorit",
  "Buku Favorit",
  "Film / Series of the Year",
  "Favorite Cafe Moment",
  "Estetik Paling Kamu Suka",
  "Hari Tertentu yang Spesial",
  "Konyol yang Bikin Ketawa",
  "Pemandangan Tercantik",
  "Barang Kesayangan",
  "Lagu Favorit",
  "Meme of the Year",
  "Makanan Homemade",
  "Self-Reward Moment",
]

function BingoApp() {
  const [mode, setMode] = useState("text")
  const [selectedSquares, setSelectedSquares] = useState<Set<number>>(new Set())
  const [imageData, setImageData] = useState<Record<string, string>>({})






  function toggleSquare(index: number) {
    const newSet = new Set(selectedSquares)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setSelectedSquares(newSet)
  }

  function handleImageUpload(index: number, file: File) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      if (result) {
        setImageData((prev) => ({
          ...prev,
          [index]: result,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  function resetBoard() {
    if (mode === "text") {
      setSelectedSquares(new Set())
    } else {
      setImageData({})
    }
  }

  async function downloadAsImage() {
    // Small delay to ensure canvas is rendered
    await new Promise((resolve) => setTimeout(resolve, 100))

    const canvas = document.getElementById("bingoCanvas") as HTMLCanvasElement
    if (!canvas) return

    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `a-year-in-a-box-${mode}-bingo.png`
    link.click()
  }

  function shareSocial(platform: string) {
    const text = "I completed the A Year in a Box Bingo Card! How many did you get?"
    const url = window.location.href
    const fullText = `${text} ${url}`

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`,
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(fullText)}`,
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=600")
  }

  function shareBoard() {
    const text = `I completed the A Year in a Box Bingo Card! How many did you get? `
    const url = window.location.href

    if (navigator.share) {
      navigator.share({
        title: "A Year in a Box",
        text: text,
        url: url,
      })
    } else {
      const fullText = text + url
      navigator.clipboard.writeText(fullText)
      alert("Link copied to clipboard!")
    }
  }



  const prompts = mode === "text" ? TEXT_PROMPTS : PICTURE_CATEGORIES

  return (
    <div
      className="min-h-screen px-3 py-4 max-w-sm mx-auto"
      style={{
        background: "linear-gradient(180deg, #FFF9F5 0%, #FFF0F7 50%, #F5F8FF 100%)",
      }}
    >
      <Header />

      <div className="mt-3 mb-3">
        <ModeSelector activeMode={mode} onModeChange={setMode} />
      </div>

      <div className="mb-4">
        <BingoGrid
          mode={mode}
          prompts={prompts}
          selectedSquares={selectedSquares}
          imageData={imageData}
          onToggleSquare={toggleSquare}
          onImageUpload={handleImageUpload}
        />
      </div>

      <ControlPanel
        onReset={resetBoard}
        onDownload={downloadAsImage}
        onShare={shareBoard}
        onShareSocial={shareSocial}
      />

      {/* Footer */}
      <div className="text-center mt-5 pb-3">
        <p
          style={{
            fontSize: "9px",
            color: "#B0A0A0",
            fontFamily: "var(--font-poppins), sans-serif",
          }}
        >
          made with ♡
        </p>
      </div>
    </div>
  )
}

export default BingoApp
