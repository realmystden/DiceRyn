"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export function EasterEggDetector() {
  const [keys, setKeys] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the array
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key.toLowerCase()]

        // Keep only the last 10 keys
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
    // Check for "brainfuck" easter egg
    const brainfuckSequence = ["b", "r", "a", "i", "n", "f", "u", "c", "k"]
    const lastKeys = keys.slice(-brainfuckSequence.length)

    if (lastKeys.length === brainfuckSequence.length && brainfuckSequence.every((key, i) => key === lastKeys[i])) {
      toast({
        title: "¡Easter Egg Encontrado!",
        description: "Has descubierto el lenguaje de programación esotérico Brainfuck. ¡Felicidades!",
        variant: "default",
      })

      // Reset keys to prevent multiple toasts
      setKeys([])
    }
  }, [keys, toast])

  return null
}
