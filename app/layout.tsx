import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" })
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "A Year in a Box",
  description: "Your chaotic, fun, and relatable year in one bingo board. Create your own 2025 wrapped bingo card!",
  keywords: ["bingo", "2025 wrapped", "year in a box", "bingo card generator", "fun", "relatable", "social media trend"],
  authors: [{ name: "A Year in a Box Team" }],
  creator: "A Year in a Box",
  publisher: "A Year in a Box",
  openGraph: {
    title: "A Year in a Box",
    description: "Your chaotic, fun, and relatable year in one bingo board. Create your own 2025 wrapped bingo card!",
    url: "https://ayearinabox.vercel.app/", // Assuming a URL, can be updated later if known
    siteName: "A Year in a Box",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image exists or will be created, using a placeholder for now
        width: 1200,
        height: 630,
        alt: "A Year in a Box Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Year in a Box",
    description: "Your chaotic, fun, and relatable year in one bingo board.",
    images: ["/og-image.png"], // Consistent with OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="Ws8LmDmWyIRHQOlmU_sd1F_OcBt4tKKZlkFwg2AS1wE" />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
