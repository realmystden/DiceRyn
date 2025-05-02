"use client"

import { motion } from "framer-motion"
import type { Achievement } from "@/lib/services/achievements-service"

interface AchievementsListProps {
  achievements: Achievement[]
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  const unlockedAchievements = achievements.filter((a) => a.completed)
  const lockedAchievements = achievements.filter((a) => !a.completed)

  return (
    <div className="space-y-6">
      {unlockedAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unlockedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="fantasy-card bg-gray-800/50 p-4 flex items-start gap-3 border-l-4 border-green-500"
            >
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <h3 className="font-cinzel text-white">{achievement.title}</h3>
                <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-green-400 font-fondamento">Desbloqueado</span>
                  {achievement.completedAt && (
                    <span className="text-xs text-gray-400 ml-2 font-fondamento">
                      {new Date(achievement.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-4 font-fondamento">
          No has desbloqueado ningún logro todavía. ¡Completa proyectos para desbloquear logros!
        </p>
      )}

      {lockedAchievements.length > 0 && (
        <>
          <h3 className="text-lg font-cinzel text-white mt-8 mb-4">Logros por Desbloquear</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="fantasy-card bg-gray-800/50 p-4 flex items-start gap-3 border-l-4 border-gray-600 opacity-60"
              >
                <div className="text-3xl grayscale">{achievement.icon}</div>
                <div>
                  <h3 className="font-cinzel text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-400 font-fondamento">Bloqueado</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
