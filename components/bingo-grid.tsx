"use client"

import { useRef, useEffect } from "react"
import BingoSquare from "./bingo-square"

interface BingoGridProps {
  mode: string
  prompts: string[]
  selectedSquares: Set<number>
  imageData: Record<string, string>
  onToggleSquare: (index: number) => void
  onImageUpload: (index: number, file: File) => void
}

export default function BingoGrid({
  mode,
  prompts,
  selectedSquares,
  imageData,
  onToggleSquare,
  onImageUpload,
}: BingoGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateCanvasImage()
  }, [selectedSquares, mode, prompts, imageData])

  async function generateCanvasImage() {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const baseSize = 800
    const scale = 2.5
    canvas.width = baseSize * scale
    canvas.height = (baseSize + 80) * scale

    // Scale context for high resolution
    ctx.scale(scale, scale)

    // Background
    ctx.fillStyle = "#FFF9F5"
    ctx.fillRect(0, 0, baseSize, baseSize + 80)

    // Title
    ctx.fillStyle = "#D4618C"
    ctx.font = "bold 28px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("A Year in a Box", baseSize / 2, 45)

    ctx.fillStyle = "#8B7B7B"
    ctx.font = "14px sans-serif"
    ctx.fillText("ayearinabox.com", baseSize / 2, 68)

    const cellSize = baseSize / 5
    const offsetY = 80

    if (mode === "text") {
      prompts.forEach((prompt, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const x = col * cellSize
        const y = row * cellSize + offsetY

        // Cell background
        ctx.fillStyle = selectedSquares.has(index) ? "#FFF0F5" : "#FFFBF7"
        ctx.beginPath()
        ctx.roundRect(x + 4, y + 4, cellSize - 8, cellSize - 8, 12)
        ctx.fill()

        // Border
        ctx.strokeStyle = selectedSquares.has(index) ? "#FFB3D9" : "#FFD4E5"
        ctx.lineWidth = 2
        ctx.setLineDash(selectedSquares.has(index) ? [] : [4, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // Text
        ctx.fillStyle = selectedSquares.has(index) ? "#D4618C" : "#6D5D5D"
        ctx.font = "bold 13px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Word wrap
        const words = prompt.split(" ")
        const lines: string[] = []
        let currentLine = ""
        const maxWidth = cellSize - 24

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          const metrics = ctx.measureText(testLine)
          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine)
            currentLine = word
          } else {
            currentLine = testLine
          }
        })
        if (currentLine) lines.push(currentLine)

        const lineHeight = 16
        const startY = y + cellSize / 2 - ((lines.length - 1) * lineHeight) / 2

        lines.forEach((line, i) => {
          ctx.fillText(line, x + cellSize / 2, startY + i * lineHeight)
        })

        if (selectedSquares.has(index)) {
          const gradient = ctx.createLinearGradient(x + cellSize - 32, y + 12, x + cellSize - 12, y + 32)
          gradient.addColorStop(0, "#FF9EBF")
          gradient.addColorStop(1, "#FFB3D9")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x + cellSize - 20, y + 22, 12, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = "white"
          ctx.lineWidth = 2.5
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          ctx.beginPath()
          ctx.moveTo(x + cellSize - 26, y + 22)
          ctx.lineTo(x + cellSize - 21, y + 27)
          ctx.lineTo(x + cellSize - 14, y + 17)
          ctx.stroke()
        }
      })
    } else {
      const imagePromises = prompts.map(async (_, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const x = col * cellSize
        const y = row * cellSize + offsetY

        // Cell background
        ctx.fillStyle = imageData[index] ? "#F5FFF0" : "#FFFBF7"
        ctx.beginPath()
        ctx.roundRect(x + 4, y + 4, cellSize - 8, cellSize - 8, 12)
        ctx.fill()

        // Border
        ctx.strokeStyle = imageData[index] ? "#B5E7A0" : "#A8D8EA"
        ctx.lineWidth = 2
        ctx.setLineDash(imageData[index] ? [] : [4, 4])
        ctx.stroke()
        ctx.setLineDash([])

        if (imageData[index]) {
          // Draw image
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              ctx.save()
              ctx.beginPath()
              ctx.roundRect(x + 6, y + 6, cellSize - 12, cellSize - 12, 10)
              ctx.clip()

              // Contain fit (don't limit size/crop)
              const imgRatio = img.width / img.height
              const cellRatio = 1
              let drawWidth, drawHeight, drawX, drawY

              if (imgRatio > cellRatio) {
                // Image is wider
                drawWidth = cellSize - 12
                drawHeight = drawWidth / imgRatio
                drawX = x + 6
                drawY = y + 6 + ((cellSize - 12) - drawHeight) / 2
              } else {
                // Image is taller
                drawHeight = cellSize - 12
                drawWidth = drawHeight * imgRatio
                drawX = x + 6 + ((cellSize - 12) - drawWidth) / 2
                drawY = y + 6
              }

              ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
              ctx.restore()

              resolve()
            }
            img.onerror = () => resolve()
            img.src = imageData[index]
          })
        } else {
          // Empty cell - draw camera icon
          ctx.fillStyle = "#B0BEC5"
          ctx.font = "32px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("📷", x + cellSize / 2, y + cellSize / 2)
        }
        return Promise.resolve()
      })

      await Promise.all(imagePromises)
    }
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-1 px-1" style={{ maxWidth: "100%" }}>
        {prompts.map((prompt, index) => (
          <BingoSquare
            key={index}
            index={index}
            mode={mode}
            content={prompt}
            isSelected={selectedSquares.has(index)}
            image={imageData[index]}
            onToggle={() => onToggleSquare(index)}
            onImageUpload={(file) => onImageUpload(index, file)}
          />
        ))}
      </div>

      <canvas id="bingoCanvas" className="hidden" ref={canvasRef} />
    </>
  )
}
