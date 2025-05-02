"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useAuth } from "@/lib/auth/auth-provider"
import { Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    if (!user) {
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/statistics")

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Server responded with ${response.status}`)
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching statistics:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  if (!mounted) {
    return null
  }

  if (!user) {
    router.push("/auth/login?redirect=/statistics")
    return null
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="ml-2 text-white font-fondamento">Cargando estadísticas...</span>
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <div className="w-full max-w-6xl mx-auto">
          <div className="fantasy-card p-6 mb-8">
            <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Estadísticas Detalladas</h1>
            <div className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-fondamento mb-2">Error al cargar las estadísticas:</p>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (!stats) {
    return (
      <PageLayout>
        <div className="w-full max-w-6xl mx-auto">
          <div className="fantasy-card p-6 mb-8">
            <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Estadísticas Detalladas</h1>
            <p className="text-gray-300 font-fondamento mb-6">
              No se pudieron cargar las estadísticas. Por favor, intenta de nuevo más tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-sm font-medium transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Calculate statistics
  const totalProjects = stats.totalProjects || 0
  const unlockedAchievements = stats.unlockedAchievements || 0
  const totalAchievements = stats.totalAchievements || 0
  const achievementPercentage = Math.round((unlockedAchievements / (totalAchievements || 1)) * 100) || 0

  const studentProjects = stats.studentProjects || 0
  const traineeProjects = stats.traineeProjects || 0
  const juniorProjects = stats.juniorProjects || 0
  const seniorProjects = stats.seniorProjects || 0

  // Get language statistics
  const languageStats = stats.languageStats || []

  // Get framework statistics
  const frameworkStats = stats.frameworkStats || []

  // Get database statistics
  const databaseStats = stats.databaseStats || []

  // Get monthly data
  const monthlyData = stats.monthlyData || []

  // Get projects by day of week
  const projectsByDay = stats.projectsByDay || []

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
                      {stats.completedProjects && stats.completedProjects.length > 0 ? (
                        <>
                          {/* Mostrar las combinaciones más comunes de tecnologías */}
                          <div className="space-y-2">
                            {[...Array(Math.min(5, stats.completedProjects.length))].map((_, i) => {
                              const project = stats.completedProjects[i]
                              const tech = project?.technologies?.[0] || "N/A"
                              const framework = project?.frameworks?.[0] || "N/A"

                              return (
                                <div key={i} className="flex items-center">
                                  <div className="w-full bg-gray-700 rounded-full h-4">
                                    <div
                                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full"
                                      style={{ width: `${Math.max(20, 100 - i * 15)}%` }}
                                    ></div>
                                  </div>
                                  <span className="ml-2 text-sm text-gray-300 font-fondamento">
                                    {tech} + {framework}
                                  </span>
                                </div>
                              )
                            })}
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
                    {projectsByDay.length > 0 ? (
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
