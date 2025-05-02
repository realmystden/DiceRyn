"use client"

import { useState, useEffect, useCallback } from "react"

type SoundType = "achievement" | "dice" | "click" | "levelUp"

export function useSound() {
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    achievement: null,
    dice: null,
    click: null,
    levelUp: null,
  })

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

  // Initialize sounds
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load user preference from localStorage
      const savedPreference = localStorage.getItem("soundEnabled")
      if (savedPreference !== null) {
        setSoundEnabled(savedPreference === "true")
      }

      // Create audio elements
      setSounds({
        achievement: new Audio("/sounds/achievement.mp3"),
        dice: new Audio("/sounds/dice.mp3"),
        click: new Audio("/sounds/click.mp3"),
        levelUp: new Audio("/sounds/level-up.mp3"),
      })
    }

    return () => {
      // Cleanup
      Object.values(sounds).forEach((sound) => {
        if (sound) {
          sound.pause()
          sound.currentTime = 0
        }
      })
    }
  }, [])

  // Toggle sound
  const toggleSound = useCallback(() => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    localStorage.setItem("soundEnabled", String(newState))
  }, [soundEnabled])

  // Play sound
  const playSound = useCallback(
    (type: SoundType) => {
      if (soundEnabled && sounds[type]) {
        // Reset the audio to start
        sounds[type]!.currentTime = 0
        sounds[type]!.play().catch((err) => console.error("Error playing sound:", err))
      }
    },
    [sounds, soundEnabled],
  )

  return { playSound, soundEnabled, toggleSound }
}
