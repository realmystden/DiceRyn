import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { ProjectCompletionHandler } from "@/components/project-completion-handler"
import { AchievementNotificationManager } from "@/components/achievement-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Diceryn - Generador de Ideas de Proyectos",
  description: "Generador de ideas de proyectos para desarrolladores",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-[#121214]">
              <Navigation />
              <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ProjectCompletionHandler />
            <AchievementNotificationManager />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
