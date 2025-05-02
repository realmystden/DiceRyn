import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
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
  title: "DiceRyn - Generador de Ideas de Proyectos Web",
  description: "Obtén ideas aleatorias para tu próximo proyecto web con un lanzamiento de dado.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" />
      </head>
      <body className={`${cinzel.variable} ${fondamento.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
