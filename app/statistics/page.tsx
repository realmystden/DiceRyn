"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"
import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const {
    completedProjects,
    getTotalCompletedProjects,
    getCompletedProjectsByLevel,
    getCompletedProjectsByLanguage,
    getCompletedProjectsByFramework,
    getCompletedProjectsByDatabase,
    achievements,
  } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Calculate statistics
  const totalProjects = getTotalCompletedProjects()
  const unlockedAchievements = achievements.filter((a) => a.completed).length
  const totalAchievements = achievements.length
  const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100)

  const studentProjects = getCompletedProjectsByLevel("Student")
  const traineeProjects = getCompletedProjectsByLevel("Trainee")
  const juniorProjects = getCompletedProjectsByLevel("Junior")
  const seniorProjects = getCompletedProjectsByLevel("Senior")

  // Get top 5 languages
  const languages = new Set<string>()
  completedProjects.forEach((project) => {
    project.technologies.forEach((tech) => languages.add(tech))
  })

  const languageStats = Array.from(languages)
    .map((lang) => ({
      name: lang,
      count: getCompletedProjectsByLanguage(lang),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get top 5 frameworks
  const frameworks = new Set<string>()
  completedProjects.forEach((project) => {
    project.frameworks.forEach((framework) => frameworks.add(framework))
  })

  const frameworkStats = Array.from(frameworks)
    .map((framework) => ({
      name: framework,
      count: getCompletedProjectsByFramework(framework),
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get top 5 databases
  const databases = new Set<string>()
  completedProjects.forEach((project) => {
    project.databases.forEach((db) => databases.add(db))
  })

  const databaseStats = Array.from(databases)
    .map((db) => ({
      name: db,
      count: getCompletedProjectsByDatabase(db),
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get projects by month
  const projectsByMonth: Record<string, { name: string; count: number }> = {}

  // Initialize all months in the last year to ensure we show empty months
  const today = new Date()
  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    const monthName = date.toLocaleString("default", { month: "long", year: "numeric" })

    projectsByMonth[monthKey] = {
      name: monthName,
      count: 0,
    }
  }

  // Count projects by month
  completedProjects.forEach((project) => {
    const date = new Date(project.completedAt)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`

    if (projectsByMonth[monthKey]) {
      projectsByMonth[monthKey].count++
    }
  })

  const monthlyData = Object.values(projectsByMonth)
    .sort((a, b) => {
      // Extract year and month from the name for proper sorting
      const aMatch = a.name.match(/(\w+) (\d{4})/)
      const bMatch = b.name.match(/(\w+) (\d{4})/)

      if (!aMatch || !bMatch) return 0

      const aYear = Number.parseInt(aMatch[2])
      const bYear = Number.parseInt(bMatch[2])

      if (aYear !== bYear) return aYear - bYear

      // Convert month names to numbers for sorting
      const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ]
      const aMonth = months.indexOf(aMatch[1].toLowerCase())
      const bMonth = months.indexOf(bMatch[1].toLowerCase())

      return aMonth - bMonth
    })
    .slice(-6) // Last 6 months

  // Get projects by day of week
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const projectsByDay = Array(7)
    .fill(0)
    .map((_, i) => ({
      name: dayNames[i],
      count: 0,
    }))

  completedProjects.forEach((project) => {
    const date = new Date(project.completedAt)
    const dayOfWeek = date.getDay() // 0-6
    projectsByDay[dayOfWeek].count++
  })

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="fantasy-card p-6 mb-8">
          <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Estadísticas Detalladas</h1>
          <p className="text-gray-300 font-fondamento mb-6">
            Analiza tu progreso y rendimiento como desarrollador a través de estadísticas detalladas.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="font-fondamento">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="technologies" className="font-fondamento">
                Tecnologías
              </TabsTrigger>
              <TabsTrigger value="time" className="font-fondamento">
                Tiempo
              </TabsTrigger>
              <TabsTrigger value="achievements" className="font-fondamento">
                Logros
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-fondamento text-gray-400">Proyectos Completados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-cinzel font-bold text-white">{totalProjects}</div>
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-fondamento text-gray-400">Logros Desbloqueados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-cinzel font-bold text-white">
                      {unlockedAchievements}/{totalAchievements}
                    </div>
                    <Progress value={achievementPercentage} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-fondamento text-gray-400">Nivel Más Completado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-cinzel font-bold text-white">
                      {[
                        { level: "Student", count: studentProjects },
                        { level: "Trainee", count: traineeProjects },
                        { level: "Junior", count: juniorProjects },
                        { level: "Senior", count: seniorProjects },
                      ].sort((a, b) => b.count - a.count)[0]?.level || "N/A"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="fantasy-card bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="font-cinzel text-white">Proyectos por Nivel</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: "Student", count: studentProjects, color: "#10B981" },
                        { name: "Trainee", count: traineeProjects, color: "#3B82F6" },
                        { name: "Junior", count: juniorProjects, color: "#6366F1" },
                        { name: "Senior", count: seniorProjects, color: "#8B5CF6" },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                        itemStyle={{ color: "#E5E7EB" }}
                        labelStyle={{ color: "#E5E7EB" }}
                      />
                      <Bar dataKey="count" fill="#8884d8" name="Proyectos">
                        {[
                          { name: "Student", count: studentProjects, color: "#10B981" },
                          { name: "Trainee", count: traineeProjects, color: "#3B82F6" },
                          { name: "Junior", count: juniorProjects, color: "#6366F1" },
                          { name: "Senior", count: seniorProjects, color: "#8B5CF6" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technologies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Top 5 Lenguajes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {languageStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={languageStats}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis type="number" stroke="#999" />
                          <YAxis dataKey="name" type="category" stroke="#999" width={100} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Bar dataKey="count" fill="#6366F1" name="Proyectos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No hay suficientes datos para mostrar estadísticas de lenguajes.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Top 5 Frameworks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {frameworkStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={frameworkStats}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis type="number" stroke="#999" />
                          <YAxis dataKey="name" type="category" stroke="#999" width={100} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Bar dataKey="count" fill="#8B5CF6" name="Proyectos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No hay suficientes datos para mostrar estadísticas de frameworks.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Top 5 Bases de Datos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {databaseStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={databaseStats}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis type="number" stroke="#999" />
                          <YAxis dataKey="name" type="category" stroke="#999" width={100} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Bar dataKey="count" fill="#10B981" name="Proyectos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No hay suficientes datos para mostrar estadísticas de bases de datos.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Combinaciones Más Usadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {completedProjects.length > 0 ? (
                        <>
                          {/* Mostrar las combinaciones más comunes de tecnologías */}
                          <div className="space-y-2">
                            {[...Array(Math.min(5, completedProjects.length))].map((_, i) => (
                              <div key={i} className="flex items-center">
                                <div className="w-full bg-gray-700 rounded-full h-4">
                                  <div
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full"
                                    style={{ width: `${Math.max(20, 100 - i * 15)}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-300 font-fondamento">
                                  {completedProjects[i]?.technologies[0] || "N/A"} +{" "}
                                  {completedProjects[i]?.frameworks[0] || "N/A"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-400 text-center py-10 font-fondamento">
                          No hay suficientes datos para mostrar combinaciones.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="time" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Proyectos por Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {completedProjects.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" stroke="#999" />
                          <YAxis stroke="#999" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Bar dataKey="count" fill="#8B5CF6" name="Proyectos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No hay suficientes datos para mostrar estadísticas mensuales.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Proyectos por Día de la Semana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {completedProjects.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={projectsByDay} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" stroke="#999" />
                          <YAxis stroke="#999" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563", color: "#E5E7EB" }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Bar dataKey="count" fill="#3B82F6" name="Proyectos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No hay suficientes datos para mostrar estadísticas por día.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Progreso de Logros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300 font-fondamento">Total</span>
                          <span className="text-gray-300 font-fondamento">
                            {unlockedAchievements}/{totalAchievements}
                          </span>
                        </div>
                        <Progress value={achievementPercentage} className="h-3" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-400 font-fondamento">Student</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.level === "Student" && a.completed).length}/
                            {achievements.filter((a) => a.level === "Student").length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.level === "Student" && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.level === "Student").length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-green-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-400 font-fondamento">Trainee</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.level === "Trainee" && a.completed).length}/
                            {achievements.filter((a) => a.level === "Trainee").length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.level === "Trainee" && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.level === "Trainee").length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-indigo-400 font-fondamento">Junior</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.level === "Junior" && a.completed).length}/
                            {achievements.filter((a) => a.level === "Junior").length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.level === "Junior" && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.level === "Junior").length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-400 font-fondamento">Senior</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.level === "Senior" && a.completed).length}/
                            {achievements.filter((a) => a.level === "Senior").length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.level === "Senior" && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.level === "Senior").length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-purple-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-amber-400 font-fondamento">Master</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.level === "Master" && a.completed).length}/
                            {achievements.filter((a) => a.level === "Master").length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.level === "Master" && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.level === "Master").length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-amber-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white">Logros por Categoría</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-400 font-fondamento">Lenguajes</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.requiredLanguages && a.completed).length}/
                            {achievements.filter((a) => a.requiredLanguages).length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.requiredLanguages && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.requiredLanguages).length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-indigo-400 font-fondamento">Frameworks</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.requiredFrameworks && a.completed).length}/
                            {achievements.filter((a) => a.requiredFrameworks).length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.requiredFrameworks && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.requiredFrameworks).length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-400 font-fondamento">Bases de Datos</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.requiredDatabases && a.completed).length}/
                            {achievements.filter((a) => a.requiredDatabases).length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.requiredDatabases && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.requiredDatabases).length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-green-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-400 font-fondamento">Combinaciones</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.requiredCombination && a.completed).length}/
                            {achievements.filter((a) => a.requiredCombination).length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.requiredCombination && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.requiredCombination).length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-purple-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-amber-400 font-fondamento">Consistencia</span>
                          <span className="text-gray-300 font-fondamento">
                            {achievements.filter((a) => a.requiredConsistency && a.completed).length}/
                            {achievements.filter((a) => a.requiredConsistency).length}
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (achievements.filter((a) => a.requiredConsistency && a.completed).length /
                              Math.max(1, achievements.filter((a) => a.requiredConsistency).length)) *
                              100,
                          )}
                          className="h-2"
                          indicatorClassName="bg-amber-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="fantasy-card bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="font-cinzel text-white">Logros Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements
                      .filter((a) => a.completed)
                      .sort((a, b) => b.id.localeCompare(a.id)) // Ordenar por ID como aproximación a la fecha
                      .slice(0, 5)
                      .map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/30">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="font-cinzel text-white">{achievement.title}</h4>
                            <p className="text-xs text-gray-400 font-fondamento">{achievement.description}</p>
                          </div>
                        </div>
                      ))}

                    {achievements.filter((a) => a.completed).length === 0 && (
                      <p className="text-gray-400 text-center py-10 font-fondamento">
                        No has desbloqueado ningún logro todavía.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  )
}
