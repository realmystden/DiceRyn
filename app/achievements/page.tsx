"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore, type AchievementLevel } from "@/lib/store"
import { PageLayout } from "@/components/page-layout"
import { ProgressBar } from "@/components/progress-bar"
import { AchievementsList } from "@/components/achievements-list"
import { CompletedProjectsList } from "@/components/completed-projects-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AchievementCertificate } from "@/components/achievement-certificate"
import { Trophy } from "lucide-react"

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)

  const {
    getCurrentLevel,
    getLevelProgress,
    getTotalCompletedProjects,
    getCompletedProjectsByLevel,
    getUnlockedAchievements,
    achievements,
  } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentLevel = getCurrentLevel()
  const levelProgress = getLevelProgress()
  const totalProjects = getTotalCompletedProjects()
  const unlockedAchievements = getUnlockedAchievements()

  const studentProjects = getCompletedProjectsByLevel("Student")
  const traineeProjects = getCompletedProjectsByLevel("Trainee")
  const juniorProjects = getCompletedProjectsByLevel("Junior")
  const seniorProjects = getCompletedProjectsByLevel("Senior")

  const levelTitles: Record<AchievementLevel, string> = {
    Student: "Estudiante",
    Trainee: "Aprendiz",
    Junior: "Desarrollador Junior",
    Senior: "Desarrollador Senior",
    Master: "Maestro Desarrollador",
  }

  const nextLevelRequirements: Record<AchievementLevel, string> = {
    Student: "Completa 10 proyectos (incluyendo 3 de nivel Trainee) para avanzar a Aprendiz",
    Trainee: "Completa 15 proyectos (incluyendo 5 de nivel Junior) para avanzar a Desarrollador Junior",
    Junior: "Completa 25 proyectos (incluyendo 8 de nivel Senior) para avanzar a Desarrollador Senior",
    Senior: "Completa 50 proyectos para convertirte en Maestro Desarrollador",
    Master: "¡Has alcanzado el nivel máximo! ¡Felicidades!",
  }

  const handleShowCertificate = (achievementId: string) => {
    const achievement = achievements.find((a) => a.id === achievementId && a.completed)
    if (achievement) {
      setSelectedAchievement(achievement)
    }
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="fantasy-card p-6 mb-8">
          <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Sistema de Logros</h1>
          <p className="text-gray-300 font-fondamento mb-6">
            Sigue tu progreso como desarrollador completando proyectos y desbloqueando logros.
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-cinzel text-white">Nivel Actual: {levelTitles[currentLevel]}</h2>
              <span className="bg-purple-600/70 text-white px-3 py-1 rounded-full text-sm font-fondamento">
                {totalProjects} {totalProjects === 1 ? "proyecto completado" : "proyectos completados"}
              </span>
            </div>

            <ProgressBar level={currentLevel} progress={levelProgress} />

            <p className="text-sm text-gray-400 mt-2 font-fondamento">{nextLevelRequirements[currentLevel]}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="fantasy-card bg-green-900/20 p-4 text-center">
              <h3 className="font-cinzel text-green-400 mb-1">Student</h3>
              <p className="text-2xl font-bold text-white">{studentProjects}</p>
              <p className="text-xs text-gray-400">proyectos</p>
            </div>
            <div className="fantasy-card bg-blue-900/20 p-4 text-center">
              <h3 className="font-cinzel text-blue-400 mb-1">Trainee</h3>
              <p className="text-2xl font-bold text-white">{traineeProjects}</p>
              <p className="text-xs text-gray-400">proyectos</p>
            </div>
            <div className="fantasy-card bg-indigo-900/20 p-4 text-center">
              <h3 className="font-cinzel text-indigo-400 mb-1">Junior</h3>
              <p className="text-2xl font-bold text-white">{juniorProjects}</p>
              <p className="text-xs text-gray-400">proyectos</p>
            </div>
            <div className="fantasy-card bg-purple-900/20 p-4 text-center">
              <h3 className="font-cinzel text-purple-400 mb-1">Senior</h3>
              <p className="text-2xl font-bold text-white">{seniorProjects}</p>
              <p className="text-xs text-gray-400">proyectos</p>
            </div>
          </div>

          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="achievements" className="font-fondamento">
                Logros ({unlockedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="projects" className="font-fondamento">
                Proyectos Completados ({totalProjects})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="achievements">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-cinzel text-white">Logros Desbloqueados</h3>
                <Button
                  variant="outline"
                  className="fantasy-button border-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    if (unlockedAchievements.length > 0) {
                      handleShowCertificate(unlockedAchievements[0].id)
                    }
                  }}
                  disabled={unlockedAchievements.length === 0}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  <span className="font-fondamento">Ver Certificado</span>
                </Button>
              </div>
              <AchievementsList />
            </TabsContent>
            <TabsContent value="projects">
              <CompletedProjectsList />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {selectedAchievement && (
        <AchievementCertificate
          achievement={selectedAchievement}
          open={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </PageLayout>
  )
}
