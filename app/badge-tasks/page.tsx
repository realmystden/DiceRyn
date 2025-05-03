"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { useProjectIdeasStore } from "@/lib/store"
import { badges, checkBadgeUnlocked } from "@/lib/badge-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AnimatedSection } from "@/components/animated-section"
import { CheckCircle2, Circle, Award } from "lucide-react"

export default function BadgeTasksPage() {
  const [mounted, setMounted] = useState(false)
  const [badgeTasks, setBadgeTasks] = useState<any[]>([])
  const { achievements, completedProjects, getConsecutiveDaysStreak } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const streakDays = getConsecutiveDaysStreak()
    const tasks: any[] = []

    badges.forEach((badge) => {
      const { unlocked, progress } = checkBadgeUnlocked(badge, achievements, completedProjects, streakDays)

      // Only include badges that are not unlocked
      if (!unlocked) {
        // Generate tasks based on badge requirements
        const badgeWithTasks = {
          ...badge,
          progress,
          tasks: generateTasksForBadge(badge, completedProjects, streakDays),
        }

        tasks.push(badgeWithTasks)
      }
    })

    // Sort badges by level and progress
    const levelOrder = { Student: 1, Trainee: 2, Junior: 3, Senior: 4, Master: 5 }

    const sortByLevelAndProgress = (a: any, b: any) => {
      const levelDiff = levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder]
      if (levelDiff !== 0) return levelDiff
      return b.progress - a.progress // Higher progress first
    }

    setBadgeTasks(tasks.sort(sortByLevelAndProgress))
  }, [mounted, achievements, completedProjects, getConsecutiveDaysStreak])

  // Function to generate specific tasks for a badge
  const generateTasksForBadge = (badge: any, completedProjects: any[], streakDays: number) => {
    const tasks: { description: string; completed: boolean }[] = []
    const { requirements } = badge

    switch (requirements.type) {
      case "projects":
        if (requirements.projectCount) {
          const relevantProjects = completedProjects.filter((project) => {
            if (badge.level === "Student") {
              return project.level === "Student"
            } else if (badge.level === "Trainee") {
              return ["Student", "Trainee"].includes(project.level)
            } else if (badge.level === "Junior") {
              return ["Student", "Trainee", "Junior"].includes(project.level)
            } else if (badge.level === "Senior") {
              return ["Junior", "Senior"].includes(project.level)
            } else {
              return true // Master level considers all projects
            }
          })

          const completedCount = relevantProjects.length
          const remainingCount = Math.max(0, requirements.projectCount - completedCount)

          if (remainingCount > 0) {
            tasks.push({
              description: `Completa ${remainingCount} proyecto${remainingCount !== 1 ? "s" : ""} más de nivel ${badge.level}`,
              completed: false,
            })
          }
        }
        break

      case "languages":
        if (requirements.count) {
          const uniqueLanguages = new Set<string>()
          completedProjects.forEach((project) => {
            project.technologies.forEach((tech: string) => uniqueLanguages.add(tech))
          })

          const completedCount = uniqueLanguages.size
          const remainingCount = Math.max(0, requirements.count - completedCount)

          if (remainingCount > 0) {
            tasks.push({
              description: `Utiliza ${remainingCount} lenguaje${remainingCount !== 1 ? "s" : ""} de programación adicional${remainingCount !== 1 ? "es" : ""}`,
              completed: false,
            })
          }
        }
        break

      case "frameworks":
        if (requirements.count) {
          const uniqueFrameworks = new Set<string>()
          completedProjects.forEach((project) => {
            project.frameworks.forEach((framework: string) => uniqueFrameworks.add(framework))
          })

          const completedCount = uniqueFrameworks.size
          const remainingCount = Math.max(0, requirements.count - completedCount)

          if (remainingCount > 0) {
            tasks.push({
              description: `Utiliza ${remainingCount} framework${remainingCount !== 1 ? "s" : ""} adicional${remainingCount !== 1 ? "es" : ""}`,
              completed: false,
            })
          }
        }
        break

      case "combination":
        // Language-specific requirements
        if (requirements.languages && requirements.languages.length === 1 && requirements.projectCount) {
          const language = requirements.languages[0]
          const projectsWithLanguage = completedProjects.filter((project) =>
            project.technologies.includes(language),
          ).length

          const remainingCount = Math.max(0, requirements.projectCount - projectsWithLanguage)

          if (remainingCount > 0) {
            tasks.push({
              description: `Completa ${remainingCount} proyecto${remainingCount !== 1 ? "s" : ""} más con ${language}`,
              completed: false,
            })
          }
        }

        // Multiple languages with count
        else if (requirements.languages && requirements.count) {
          const languageCounts: Record<string, number> = {}
          completedProjects.forEach((project) => {
            project.technologies.forEach((tech: string) => {
              if (requirements.languages!.includes(tech)) {
                languageCounts[tech] = (languageCounts[tech] || 0) + 1
              }
            })
          })

          const languagesWithEnoughProjects = Object.keys(languageCounts).filter(
            (lang) => languageCounts[lang] >= (requirements.projectCount || 1),
          ).length

          const remainingCount = Math.max(0, requirements.count - languagesWithEnoughProjects)

          if (remainingCount > 0) {
            tasks.push({
              description: `Completa proyectos en ${remainingCount} lenguaje${remainingCount !== 1 ? "s" : ""} más de la lista: ${requirements.languages.join(", ")}`,
              completed: false,
            })
          }
        }

        // Project count requirements
        if (requirements.projectCount && !requirements.languages) {
          const remainingCount = Math.max(0, requirements.projectCount - completedProjects.length)

          if (remainingCount > 0) {
            tasks.push({
              description: `Completa ${remainingCount} proyecto${remainingCount !== 1 ? "s" : ""} más`,
              completed: false,
            })
          }
        }

        // Streak requirements
        if (requirements.streakDays) {
          const remainingDays = Math.max(0, requirements.streakDays - streakDays)

          if (remainingDays > 0) {
            tasks.push({
              description: `Mantén una racha de ${remainingDays} día${remainingDays !== 1 ? "s" : ""} más (actual: ${streakDays})`,
              completed: false,
            })
          }
        }
        break

      case "streak":
        if (requirements.streakDays) {
          const remainingDays = Math.max(0, requirements.streakDays - streakDays)

          if (remainingDays > 0) {
            tasks.push({
              description: `Mantén una racha de ${remainingDays} día${remainingDays !== 1 ? "s" : ""} más (actual: ${streakDays})`,
              completed: false,
            })
          }
        }
        break
    }

    return tasks
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Student":
        return "text-green-400"
      case "Trainee":
        return "text-blue-400"
      case "Junior":
        return "text-yellow-400"
      case "Senior":
        return "text-orange-400"
      case "Master":
        return "text-red-400"
      default:
        return "text-purple-400"
    }
  }

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case "Student":
        return "bg-green-900/20 border-green-700/30"
      case "Trainee":
        return "bg-blue-900/20 border-blue-700/30"
      case "Junior":
        return "bg-yellow-900/20 border-yellow-700/30"
      case "Senior":
        return "bg-orange-900/20 border-orange-700/30"
      case "Master":
        return "bg-red-900/20 border-red-700/30"
      default:
        return "bg-purple-900/20 border-purple-700/30"
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="fantasy-card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Tareas para Insignias</h1>
              <p className="text-gray-300 font-fondamento">
                Completa estas tareas específicas para desbloquear insignias especiales.
              </p>
            </div>
            <div className="hidden md:block text-6xl">📋</div>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mb-6 p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
              <h2 className="text-xl font-cinzel text-white mb-2">Guía de Tareas</h2>
              <p className="text-gray-300 font-fondamento">
                Cada insignia requiere completar tareas específicas. Esta página te muestra exactamente qué necesitas
                hacer para desbloquear cada insignia. Completa las tareas para avanzar en tu progreso.
              </p>
            </div>

            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="student" className="font-fondamento text-green-400">
                  Student
                </TabsTrigger>
                <TabsTrigger value="trainee" className="font-fondamento text-blue-400">
                  Trainee
                </TabsTrigger>
                <TabsTrigger value="junior" className="font-fondamento text-yellow-400">
                  Junior
                </TabsTrigger>
                <TabsTrigger value="senior" className="font-fondamento text-orange-400">
                  Senior
                </TabsTrigger>
                <TabsTrigger value="master" className="font-fondamento text-red-400">
                  Master
                </TabsTrigger>
              </TabsList>

              {["student", "trainee", "junior", "senior", "master"].map((level) => (
                <TabsContent key={level} value={level}>
                  <div className="space-y-6">
                    {badgeTasks
                      .filter((badge) => badge.level.toLowerCase() === level)
                      .map((badge) => (
                        <div key={badge.id} className={`p-4 border rounded-lg ${getLevelBgColor(badge.level)}`}>
                          <div className="flex items-start">
                            <div
                              className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 text-2xl bg-gray-800/50`}
                            >
                              {badge.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-cinzel text-white mb-1">{badge.name}</h3>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${getLevelColor(badge.level)}`}>
                                  {badge.progress}%
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{badge.description}</p>
                              <Progress value={badge.progress} className="h-2 mb-4" />

                              <div className="space-y-2 mt-4">
                                <h4 className="text-sm font-cinzel text-white flex items-center">
                                  <Award className="h-4 w-4 mr-2" />
                                  Tareas para desbloquear:
                                </h4>
                                <ul className="space-y-2">
                                  {badge.tasks.map((task: any, index: number) => (
                                    <li key={index} className="flex items-start">
                                      {task.completed ? (
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                                      ) : (
                                        <Circle className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                                      )}
                                      <span className="text-sm text-gray-300">{task.description}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {badgeTasks.filter((badge) => badge.level.toLowerCase() === level).length === 0 && (
                      <div className="text-center py-8 text-gray-400 font-fondamento">
                        <p>
                          No hay tareas pendientes para insignias de nivel{" "}
                          {level.charAt(0).toUpperCase() + level.slice(1)}.
                        </p>
                        <p className="mt-2">¡Has completado todas las insignias de este nivel o estás muy cerca!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>
        </div>
      </motion.div>
    </PageLayout>
  )
}
