"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AchievementNotification } from "@/components/achievement-notification"
import { Toaster } from "@/components/ui/toaster"
import { EasterEggDetector } from "@/components/easter-egg-detector"
import { preloadAdditionalData } from "@/lib/dynamic-loader"
import { useEffect } from "react"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Preload additional data after initial page load
    preloadAdditionalData()
  }, [])
  return (
    <AuthProvider>
      <div className={`${inter.className} flex flex-col min-h-screen bg-[#0a0a0c] text-white`}>
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
        <AchievementNotification />
        <Toaster />
        <EasterEggDetector />
      </div>
    </AuthProvider>
  )
}
