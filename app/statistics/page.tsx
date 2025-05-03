"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"
import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { badges } from "@/lib/badge-system"
import { Award } from "lucide-react"

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [unlockedBadges, setUnlockedBadges] = useState<any[]>([])

  const {
    completedProjects,
    getTotalCompletedProjects,
    getCompletedProjectsByLevel,
    getCompletedProjectsByLanguage,
    getCompletedProjectsByFramework,
    getCompletedProjectsByDatabase,
    achievements,
    getConsecutiveDaysStreak,
  } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Set unlockedBadges to an empty array to show 0 badges obtained
    setUnlockedBadges([])
  }, [mounted, achievements, completedProjects, getConsecutiveDaysStreak])

  if (!mounted) {
    return null
  }

  // Calculate statistics
  const totalProjects = getTotalCompletedProjects()
  const unlockedAchievements = achievements.filter((a) => a.completed).length
  const totalAchievements = achievements.length
  const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100)
  const badgePercentage = Math.round((unlockedBadges.length / badges.length) * 100)

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
  const projectsByMonth: Record<string, any> = {}
  completedProjects.forEach((project) => {
    const date = new Date(project.completedAt)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    const monthName = date.toLocaleString("es", { month: "long", year: "numeric" })

    if (!projectsByMonth[monthKey]) {
      projectsByMonth[monthKey] = {
        name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        count: 0,
      }
    }

    projectsByMonth[monthKey].count++
  })

  const monthlyData = Object.values(projectsByMonth)
    .sort((a, b) => {
      const [aYear, aMonth] = a.name.split(" de ").reverse()
      const [bYear, bMonth] = b.name.split(" de ").reverse()
      const aYearNum = Number.parseInt(aYear)
      const bYearNum = Number.parseInt(bYear)

      if (aYearNum !== bYearNum) return aYearNum - bYearNum

      const monthOrder = [
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
      return monthOrder.indexOf(aMonth.toLowerCase()) - monthOrder.indexOf(bMonth.toLowerCase())
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

  // Get badges by level - all set to 0 since no badges are unlocked
  const badgesByLevel = {
    Student: 0,
    Trainee: 0,
    Junior: 0,
    Senior: 0,
    Master: 0,
  }

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
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="font-fondamento">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="technologies" className="font-fondamento">
                Tecnologías
              </TabsTrigger>
              <TabsTrigger value="time" className="font-fondamento">
                Tiempo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <CardTitle className="text-sm font-fondamento text-gray-400">Insignias Obtenidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-cinzel font-bold text-white">
                      {unlockedBadges.length}/{badges.length}
                    </div>
                    <Progress value={badgePercentage} className="h-2 mt-2" />
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

              {unlockedBadges.length > 0 && (
                <Card className="fantasy-card bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-white flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Insignias Obtenidas por Nivel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: "Student", count: badgesByLevel.Student, color: "#10B981" },
                          { name: "Trainee", count: badgesByLevel.Trainee, color: "#3B82F6" },
                          { name: "Junior", count: badgesByLevel.Junior, color: "#FACC15" },
                          { name: "Senior", count: badgesByLevel.Senior, color: "#F97316" },
                          { name: "Master", count: badgesByLevel.Master, color: "#EF4444" },
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
                        <Bar dataKey="count" fill="#8884d8" name="Insignias">
                          {[
                            { name: "Student", count: badgesByLevel.Student, color: "#10B981" },
                            { name: "Trainee", count: badgesByLevel.Trainee, color: "#3B82F6" },
                            { name: "Junior", count: badgesByLevel.Junior, color: "#FACC15" },
                            { name: "Senior", count: badgesByLevel.Senior, color: "#F97316" },
                            { name: "Master", count: badgesByLevel.Master, color: "#EF4444" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
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
                                  {completedProjects[i]?.technologies[0]} +{" "}
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
                    {monthlyData.length > 0 ? (
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
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  )
}
