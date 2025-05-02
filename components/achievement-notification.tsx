"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import type { Achievement } from "@/lib/services/achievement-service"

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const { playSound } = useSound()

  useEffect(() => {
    // Play achievement sound
    playSound("achievement")

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [achievement, onClose, playSound])

  // Determine background color based on achievement level
  let bgColor = "from-purple-900/90 to-indigo-900/90"
  let borderColor = "border-purple-500/50"

  if (achievement.level === "Student") {
    bgColor = "from-green-900/90 to-green-800/90"
    borderColor = "border-green-500/50"
  } else if (achievement.level === "Trainee") {
    bgColor = "from-blue-900/90 to-blue-800/90"
    borderColor = "border-blue-500/50"
  } else if (achievement.level === "Junior") {
    bgColor = "from-indigo-900/90 to-indigo-800/90"
    borderColor = "border-indigo-500/50"
  } else if (achievement.level === "Senior") {
    bgColor = "from-purple-900/90 to-purple-800/90"
    borderColor = "border-purple-500/50"
  } else if (achievement.level === "Master") {
    bgColor = "from-amber-900/90 to-amber-800/90"
    borderColor = "border-amber-500/50"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="fixed top-4 right-4 z-50 max-w-sm"
    >
      <div className={`fantasy-card bg-gradient-to-r ${bgColor} border-2 ${borderColor} p-4 shadow-xl rounded-lg`}>
        <div className="flex items-center gap-3">
          <div className="text-4xl">{achievement.icon}</div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-white">¡Logro Desbloqueado!</h3>
            <p className="font-cinzel text-xl text-purple-300">{achievement.title}</p>
            <p className="text-sm text-gray-300 font-fondamento mt-1">{achievement.description}</p>
            {achievement.badge_id && (
              <p className="text-xs text-yellow-300 mt-1">
                <span className="mr-1">🏅</span>
                ¡Has obtenido una insignia!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function AchievementNotificationManager() {
  const [notifications, setNotifications] = useState<Achievement[]>([])

  useEffect(() => {
    // Listen for achievement unlocks
    const handleAchievementUnlock = (event: CustomEvent) => {
      const achievement = event.detail
      setNotifications((prev) => [...prev, achievement])
    }

    // Add event listener
    window.addEventListener("achievementUnlocked" as any, handleAchievementUnlock as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener("achievementUnlocked" as any, handleAchievementUnlock as EventListener)
    }
  }, [])

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <AnimatePresence>
      {notifications.map((achievement, index) => (
        <AchievementNotification
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={() => removeNotification(index)}
        />
      ))}
    </AnimatePresence>
  )
}
