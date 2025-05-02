"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProjectIdeasStore } from "@/lib/store"

export function ThemeToggle() {
  const { themeMode, toggleThemeMode } = useProjectIdeasStore()

  return (
    <Button variant="outline" size="icon" onClick={toggleThemeMode} className="fantasy-button">
      {themeMode === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
