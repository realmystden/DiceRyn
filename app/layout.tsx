import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AchievementNotification } from "@/components/achievement-notification"
import { AuthProvider } from "@/lib/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas de Proyectos",
  description: "Generador de ideas de proyectos para desarrolladores",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-[#0a0a0c] text-white">
            <Navigation />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <AchievementNotification />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
