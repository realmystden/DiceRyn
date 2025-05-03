"use client"

import { useEffect, useState } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"

export function EasterEggDetector() {
  const [keys, setKeys] = useState<string[]>([])
  const { toast } = useToast()
  const { setEasterEggActivated, unlockAchievement, achievements } = useProjectIdeasStore()

  // Check if the easter egg is already activated in localStorage
  useEffect(() => {
    const easterEggActivated = localStorage.getItem("brainfuck_easter_egg") === "true"
    if (easterEggActivated) {
      setEasterEggActivated(true)
    }
  }, [setEasterEggActivated])

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
      // Activate the easter egg
      localStorage.setItem("brainfuck_easter_egg", "true")
      setEasterEggActivated(true)

      toast({
        title: "¡Easter Egg Encontrado!",
        description: "Has descubierto el lenguaje de programación esotérico Brainfuck. ¡Felicidades!",
        variant: "default",
      })

      // Reset keys to prevent multiple toasts
      setKeys([])
    }

    // Check for "unlock all" easter egg
    const unlockAllSequence = ["u", "n", "l", "o", "c", "k", "a", "l", "l"]
    const lastKeysUnlock = keys.slice(-unlockAllSequence.length)

    if (
      lastKeysUnlock.length === unlockAllSequence.length &&
      unlockAllSequence.every((key, i) => key === lastKeysUnlock[i])
    ) {
      // Get all achievements that are not yet completed
      const incompleteAchievements = achievements.filter((achievement) => !achievement.completed)

      // Unlock all incomplete achievements
      incompleteAchievements.forEach((achievement) => {
        unlockAchievement(achievement.id)
      })

      toast({
        title: "¡Easter Egg Encontrado!",
        description: "¡Has desbloqueado todos los logros! ¡Felicidades!",
        variant: "default",
      })

      // Reset keys to prevent multiple toasts
      setKeys([])
    }
  }, [keys, setEasterEggActivated, toast, unlockAchievement, achievements])

  return null
}
