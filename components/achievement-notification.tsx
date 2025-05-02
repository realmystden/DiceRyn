"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProjectIdeasStore, type Achievement } from "@/lib/store"
import { useSound } from "@/hooks/use-sound"

export function AchievementNotification() {
  const [notification, setNotification] = useState<Achievement | null>(null)
  const [queue, setQueue] = useState<Achievement[]>([])
  const { playSound } = useSound()

  // Subscribe to achievement unlocks
  useEffect(() => {
    const unsubscribe = useProjectIdeasStore.subscribe(
      (state) => state.achievements.filter((a) => a.completed),
      (unlockedAchievements, previousUnlockedAchievements) => {
        // Check if there are new unlocked achievements
        if (unlockedAchievements.length > previousUnlockedAchievements.length) {
          const newAchievements = unlockedAchievements.filter(
            (a) => !previousUnlockedAchievements.some((p) => p.id === a.id),
          )

          if (newAchievements.length > 0) {
            // Add new achievements to the queue
            setQueue((prev) => [...prev, ...newAchievements])

            // Play achievement sound
            playSound("achievement")
          }
        }
      },
    )

    return () => unsubscribe()
  }, [playSound])

  // Process the notification queue
  useEffect(() => {
    if (queue.length > 0 && !notification) {
      // Show the next notification
      setNotification(queue[0])

      // Remove it from the queue
      setQueue((prev) => prev.slice(1))

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [queue, notification])

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="fantasy-card bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border-2 border-purple-500/50 p-4 shadow-xl rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{notification.icon}</div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">¡Logro Desbloqueado!</h3>
                <p className="font-cinzel text-xl text-purple-300">{notification.title}</p>
                <p className="text-sm text-gray-300 font-fondamento mt-1">{notification.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
