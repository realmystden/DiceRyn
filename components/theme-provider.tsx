"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import { useProjectIdeasStore } from "@/lib/store"

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProviderContext = createContext({})

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode, currentColor } = useProjectIdeasStore()

  // Aplicar el tema y el color actual al documento
  useEffect(() => {
    const root = document.documentElement

    // Aplicar tema claro/oscuro
    if (themeMode === "dark") {
      document.body.classList.add("dark")
      document.body.classList.remove("light")
    } else {
      document.body.classList.add("light")
      document.body.classList.remove("dark")
    }

    // Aplicar color actual como fondo
    document.body.style.background = currentColor
    document.body.style.backgroundAttachment = "fixed"
  }, [themeMode, currentColor])

  return <ThemeProviderContext.Provider value={{}}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
