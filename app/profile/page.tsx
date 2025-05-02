"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { useAuth } from "@/lib/auth/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [badges, setBadges] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [completedProjects, setCompletedProjects] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/profile")
      return
    }

    const fetchProfileData = async () => {
      setLoading(true)
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError
        setProfile(profileData)

        // Fetch user badges
        const { data: userBadges, error: badgesError } = await supabase
          .from("user_badges")
          .select(`
            id,
            earned_at,
            badges (
              id,
              name,
              description,
              image_url
            )
          `)
          .eq("user_id", user.id)

        if (badgesError) throw badgesError
        setBadges(
          userBadges.map((item: any) => ({
            id: item.id,
            earnedAt: item.earned_at,
            ...item.badges,
          })),
        )

        // Fetch user achievements
        const { data: userAchievements, error: achievementsError } = await supabase
          .from("user_achievements")
          .select(`
            id,
            completed_at,
            achievements (
              id,
              title,
              description,
              level,
              icon
            )
          `)
          .eq("user_id", user.id)

        if (achievementsError) throw achievementsError
        setAchievements(
          userAchievements.map((item: any) => ({
            id: item.id,
            completedAt: item.completed_at,
            ...item.achievements,
          })),
        )

        // Fetch completed projects
        const { data: projects, error: projectsError } = await supabase
          .from("completed_projects")
          .select("*")
          .eq("user_id", user.id)
          .order("completed_at", { ascending: false })

        if (projectsError) throw projectsError
        setCompletedProjects(projects)
      } catch (error: any) {
        console.error("Error fetching profile data:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar la información del perfil.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user, router, toast])

  if (!user || loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="ml-2 text-white font-fondamento">Cargando perfil...</span>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="fantasy-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 border-2 border-purple-500">
              <AvatarImage src={profile?.avatar_url || user.user_metadata.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {profile?.full_name?.[0] || user.user_metadata.full_name?.[0] || user.email?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-cinzel font-bold text-white">
                {profile?.full_name || user.user_metadata.full_name || user.email?.split("@")[0]}
              </h1>
              <p className="text-gray-400 font-fondamento">@{profile?.username || user.email?.split("@")[0]}</p>

              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {badges.slice(0, 5).map((badge) => (
                  <Badge key={badge.id} className="bg-purple-900 hover:bg-purple-800">
                    {badge.name}
                  </Badge>
                ))}
                {badges.length > 5 && <Badge className="bg-gray-700 hover:bg-gray-600">+{badges.length - 5} más</Badge>}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="achievements" className="font-fondamento">
              Logros ({achievements.length})
            </TabsTrigger>
            <TabsTrigger value="badges" className="font-fondamento">
              Insignias ({badges.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-fondamento">
              Proyectos ({completedProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <Card key={achievement.id} className="fantasy-card bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-cinzel text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs px-2 py-1 rounded bg-white/20 text-white">{achievement.level}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(achievement.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-400 font-fondamento">
                  No has desbloqueado ningún logro todavía. ¡Completa proyectos para ganar logros!
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <Card key={badge.id} className="fantasy-card bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-3">
                        <img
                          src={badge.image_url || "/placeholder.svg"}
                          alt={badge.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <h3 className="font-cinzel text-white">{badge.name}</h3>
                      <p className="text-sm text-gray-300 font-fondamento mt-1">{badge.description}</p>
                      <span className="text-xs text-gray-400 mt-2">
                        Obtenida el {new Date(badge.earnedAt).toLocaleDateString()}
                      </span>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-400 font-fondamento">
                  No has obtenido ninguna insignia todavía. ¡Completa logros para ganar insignias!
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
              {completedProjects.length > 0 ? (
                completedProjects.map((project) => (
                  <Card key={project.id} className="fantasy-card bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-cinzel font-bold text-white">{project.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            project.level === "Student"
                              ? "bg-green-800/50 text-green-300"
                              : project.level === "Trainee"
                                ? "bg-blue-800/50 text-blue-300"
                                : project.level === "Junior"
                                  ? "bg-indigo-800/50 text-indigo-300"
                                  : "bg-purple-800/50 text-purple-300"
                          }`}
                        >
                          {project.level}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-800/70 text-blue-300 px-2 py-1 rounded-full font-fondamento"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.frameworks.map((framework: string) => (
                          <span
                            key={framework}
                            className="text-xs bg-gray-800/70 text-purple-300 px-2 py-1 rounded-full font-fondamento"
                          >
                            {framework}
                          </span>
                        ))}
                        {project.databases.map((db: string) => (
                          <span
                            key={db}
                            className="text-xs bg-gray-800/70 text-green-300 px-2 py-1 rounded-full font-fondamento"
                          >
                            {db}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 text-right">
                        <span className="text-xs text-gray-400 font-fondamento">
                          Completado el {new Date(project.completed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 font-fondamento">
                  No has completado ningún proyecto aún. ¡Comienza a marcar proyectos como completados!
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
