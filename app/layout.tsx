import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AchievementNotification } from "@/components/achievement-notification"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas de Proyectos",
  description: "Generador de ideas de proyectos para desarrolladores",
  icons: {
    icon: "/diceryn-logo.png",
    apple: "/diceryn-logo.png",
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
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-white">
            <Navigation />
            <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
            <AchievementNotification />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
