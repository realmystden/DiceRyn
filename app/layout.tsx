import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { EasterEggDetector } from "@/components/easter-egg-detector"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas",
  description: "Genera ideas aleatorias para tus proyectos con un lanzamiento de dado.",
  icons: {
    icon: "/diceryn-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#121214] text-white min-h-screen`}>
        <Navigation />
        {children}
        <EasterEggDetector />
      </body>
    </html>
  )
}
