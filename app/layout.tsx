import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "DiceRyn - Generador de Ideas de Proyectos",
  description: "Genera ideas aleatorias para tus proyectos de programación y desarrollo",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0a0a0c] text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
