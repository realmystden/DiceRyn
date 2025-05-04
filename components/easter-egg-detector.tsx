"use client"

import { useEffect, useState } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"

export function EasterEggDetector() {
  const { easterEggActivated, setEasterEggActivated } = useProjectIdeasStore()
  const [keys, setKeys] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Añadir la tecla presionada al array
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key.toLowerCase()]
        // Mantener solo las últimas 10 teclas
        if (newKeys.length > 10) {
          return newKeys.slice(newKeys.length - 10)
        }
        return newKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    // Verificar si las últimas teclas forman "brainfuck"
    const lastKeys = keys.slice(Math.max(0, keys.length - 9)).join("")
    if (lastKeys.includes("brainfuck") && !easterEggActivated) {
      setEasterEggActivated(true)
      toast({
        title: "¡Easter Egg Activado!",
        description: "Has desbloqueado proyectos de programación esotérica. ¡Buena suerte con Brainfuck!",
        variant: "default",
        duration: 5000,
      })
    }
  }, [keys, easterEggActivated, setEasterEggActivated, toast])

  return null
}
