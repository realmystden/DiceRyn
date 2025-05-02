import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AchievementNotification } from "@/components/achievement-notification"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas de Proyectos",
  description: "Generador de ideas de proyectos para desarrolladores",
  icons: {
    icon: "/diceryn-logo.png",
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
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#0a0a0c] text-white`}>
        <AuthProvider>
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <AchievementNotification />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
