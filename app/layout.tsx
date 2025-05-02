import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Cinzel, Fondamento } from "next/font/google"

// Fuentes de fantasía
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const fondamento = Fondamento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fondamento",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas Creativas",
  description: "Obtén ideas aleatorias para tus proyectos de tecnología, historias, arte y modelado 3D.",
  icons: {
    icon: "/diceryn-new.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" />
      </head>
      <body className={`${cinzel.variable} ${fondamento.variable} bg-[#121214] text-white`}>{children}</body>
    </html>
  )
}
