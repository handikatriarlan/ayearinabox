"use client"

import type React from "react"
import { useRef, useState } from "react"

interface BingoSquareProps {
  index: number
  mode: string
  content: string
  isSelected: boolean
  image?: string
  onToggle: () => void
  onImageUpload: (file: File) => void
}

export default function BingoSquare({
  index,
  mode,
  content,
  isSelected,
  image,
  onToggle,
  onImageUpload,
}: BingoSquareProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageError, setImageError] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageError(false)
      onImageUpload(file)
    }
  }

  if (mode === "text") {
    return (
      <button
        onClick={onToggle}
        className="aspect-square rounded-xl text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer overflow-hidden relative active:scale-95"
        style={{
          backgroundColor: isSelected ? "#FFF0F5" : "#FFFBF7",
          color: "#5D4037",
          boxShadow: isSelected
            ? "0 4px 14px rgba(255, 158, 191, 0.35), inset 0 0 0 2px #FFB3D9"
            : "0 2px 8px rgba(0,0,0,0.04)",
          border: isSelected ? "none" : "1.5px dashed #FFD4E5",
        }}
      >
        {/* Text always visible */}
        <span
          className="line-clamp-3 px-1.5 leading-tight font-semibold relative z-10"
          style={{
            fontSize: "8px",
            fontFamily: "var(--font-poppins), sans-serif",
            color: isSelected ? "#D4618C" : "#6D5D5D",
            textShadow: isSelected ? "0 1px 2px rgba(255,255,255,0.8)" : "none",
          }}
        >
          {content}
        </span>

        {isSelected && (
          <div
            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF9EBF 0%, #FFB3D9 100%)",
              boxShadow: "0 2px 6px rgba(255, 158, 191, 0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </button>
    )
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 relative active:scale-95"
      style={{
        backgroundColor: "#FFFBF7",
        boxShadow:
          image && !imageError
            ? "0 4px 14px rgba(181, 231, 160, 0.35), inset 0 0 0 2px #B5E7A0"
            : "0 2px 8px rgba(0,0,0,0.04)",
        border: image && !imageError ? "none" : "1.5px dashed #A8D8EA",
      }}
    >
      {image && !imageError ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* <div
            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7ED56F 0%, #B5E7A0 100%)",
              boxShadow: "0 2px 6px rgba(126, 213, 111, 0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div> */}
          {/* Hover overlay to change photo */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", borderRadius: "10px" }}
          >
            <span style={{ fontSize: "9px", color: "white", fontWeight: 600 }}>tap to change</span>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-1.5 gap-0.5">
          <span style={{ fontSize: "14px", opacity: 0.7 }}>📷</span>
          <p
            className="text-center line-clamp-2 font-medium"
            style={{
              fontSize: "7px",
              color: "#7A8B99",
              fontFamily: "var(--font-poppins), sans-serif",
              lineHeight: 1.3,
            }}
          >
            {content}
          </p>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}
