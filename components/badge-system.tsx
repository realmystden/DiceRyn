"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useProjectIdeasStore } from "@/lib/store"
import { badges, checkBadgeUnlocked } from "@/lib/badge-system"
import { BadgeCertificate } from "@/components/badge-certificate"
import { Info } from "lucide-react"

export function BadgeSystem() {
  const [mounted, setMounted] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState<any>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [unlockedBadges, setUnlockedBadges] = useState<any[]>([])
  const [lockedBadges, setLockedBadges] = useState<any[]>([])
  const { achievements, completedProjects, getConsecutiveDaysStreak } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const streakDays = getConsecutiveDaysStreak()
    const unlocked: any[] = []
    const locked: any[] = []

    badges.forEach((badge) => {
      const { unlocked: isUnlocked, progress } = checkBadgeUnlocked(badge, achievements, completedProjects, streakDays)

      const badgeWithProgress = {
        ...badge,
        progress,
        unlocked: isUnlocked,
      }

      // Move all badges to locked/Por Obtener tab
      locked.push(badgeWithProgress)
    })

    // Sort badges by level
    const levelOrder = { Student: 1, Trainee: 2, Junior: 3, Senior: 4, Master: 5 }

    const sortByLevel = (a: any, b: any) => {
      return levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder]
    }

    setUnlockedBadges([]) // Set to empty array
    setLockedBadges(locked.sort(sortByLevel))
  }, [mounted, achievements, completedProjects, getConsecutiveDaysStreak])

  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge)
    if (badge.unlocked) {
      setShowCertificate(true)
    }
  }

  if (!mounted) return null

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Student":
        return "bg-green-500/20 border-green-500/50 text-green-400"
      case "Trainee":
        return "bg-blue-500/20 border-blue-500/50 text-blue-400"
      case "Junior":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
      case "Senior":
        return "bg-orange-500/20 border-orange-500/50 text-orange-400"
      case "Master":
        return "bg-red-500/20 border-red-500/50 text-red-400"
      default:
        return "bg-purple-500/20 border-purple-500/50 text-purple-400"
    }
  }

  const getBadgeBackgroundColor = (level: string, unlocked: boolean) => {
    if (!unlocked) return "bg-gray-800/30 border-gray-700 hover:bg-gray-800/50"

    switch (level) {
      case "Student":
        return "bg-gradient-to-br from-green-900/40 to-green-700/20 border-green-600/30"
      case "Trainee":
        return "bg-gradient-to-br from-blue-900/40 to-blue-700/20 border-blue-600/30"
      case "Junior":
        return "bg-gradient-to-br from-yellow-900/40 to-yellow-700/20 border-yellow-600/30"
      case "Senior":
        return "bg-gradient-to-br from-orange-900/40 to-orange-700/20 border-orange-600/30"
      case "Master":
        return "bg-gradient-to-br from-red-900/40 to-red-700/20 border-red-600/30"
      default:
        return "bg-gradient-to-br from-purple-900/40 to-purple-700/20 border-purple-600/30"
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="locked" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="unlocked" className="font-fondamento">
            Obtenidas (0)
          </TabsTrigger>
          <TabsTrigger value="locked" className="font-fondamento">
            Por Obtener ({lockedBadges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unlocked">
          <div className="text-center py-8 text-gray-400 font-fondamento">
            <div className="text-5xl mb-4">🏆</div>
            <p>Aún no has desbloqueado ninguna insignia especial.</p>
            <p className="mt-2">¡Completa proyectos y logros para conseguir tus primeras insignias!</p>
          </div>
        </TabsContent>

        <TabsContent value="locked">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${getBadgeBackgroundColor(badge.level, false)}`}
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 text-3xl bg-gray-800/50 opacity-70`}
                  >
                    {badge.icon}
                  </div>
                  <h3 className="text-lg font-cinzel text-white mb-1">{badge.name}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full mb-2 ${getLevelColor(badge.level)}`}>
                    {badge.level}
                  </span>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">{badge.description}</p>
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                  <div className="mt-2 w-full">
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-xs">
                      <Info size={12} />
                      <span className="line-clamp-1">{badge.requirements.description}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl">
          {selectedBadge && <BadgeCertificate badge={selectedBadge} onClose={() => setShowCertificate(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
