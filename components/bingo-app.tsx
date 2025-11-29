"use client"

import { useState, useEffect } from "react"
import BingoGrid from "./bingo-grid"
import ModeSelector from "./mode-selector"
import ControlPanel from "./control-panel"
import Header from "./header"

const TEXT_PROMPTS = [
  "Met a new friend",
  "Late-night overthinking",
  "Changed wallpaper for new vibes",
  "Scrolled for 3 hours accidentally",
  "Random healing trip",
  "Got ghosted or ghosted someone",
  "Started a new habit (for 3 days)",
  "Took a sunrise/sunset photo",
  "Bought something unnecessary",
  "Started a new series and didn't finish",
  "Updated playlists",
  "Random crush moment",
  "Pretended to be offline",
  "Laughed until crying",
  'Existential "life is crazy" moment',
  "Spontaneous hangout",
  "Cancelled a plan because of laziness",
  "Stayed calm during stress",
  "Self-reward shopping",
  "Started a new project",
  "Acted fine while struggling",
  "Extreme introvert moment",
  "Ate something delicious without guilt",
  'Entered a "new era"',
  "Deep talk with someone",
]

const PICTURE_CATEGORIES = [
  "Favorite moment",
  "Photo with friend",
  "Best food pic",
  "Cute pet photo",
  "Sunset shot",
  "Outfit pic",
  "Mirror selfie",
  "Travel moment",
  "Meme of the year",
  "Made you smile",
  "Book you read",
  "Concert/event",
  "Cafe moment",
  "Proud achievement",
  "Funny moment",
  "Nature shot",
  "With family",
  "Favorite place",
  "Creative project",
  "Cozy night in",
  "Unexpected adventure",
  "Before & after",
  "Favorite view",
  "Pure happiness",
  "Year reflection",
]

function BingoApp() {
  const [mode, setMode] = useState("text")
  const [selectedSquares, setSelectedSquares] = useState<Set<number>>(new Set())
  const [imageData, setImageData] = useState<Record<string, string>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("bingoState")
    if (saved) {
      try {
        const state = JSON.parse(saved)
        setMode(state.mode || "text")
        setSelectedSquares(new Set(state.selectedSquares || []))
        setImageData(state.imageData || {})
      } catch {
        // Failed to load
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    const state = {
      mode,
      selectedSquares: Array.from(selectedSquares),
      imageData,
    }
    localStorage.setItem("bingoState", JSON.stringify(state))
  }, [mode, selectedSquares, imageData, isLoaded])

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

  if (!isLoaded) return <div className="min-h-screen" />

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
