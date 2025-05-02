"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { useAuth } from "@/lib/auth/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { AchievementsDisplay } from "@/components/profile/achievements-display"
import { BadgesDisplay } from "@/components/profile/badges-display"
import { ProjectsDisplay } from "@/components/profile/projects-display"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({
    achievements: { total: 0, completed: 0 },
    badges: 0,
    projects: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/profile")
      return
    }

    const fetchProfileData = async () => {
      setLoading(true)
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await fetch("/api/profile").then((res) => res.json())

        if (profileError) throw profileError
        setProfile(profileData)

        // Fetch achievement stats
        const { achievements } = await fetch("/api/achievements").then((res) => res.json())

        // Fetch badges
        const { badges } = await fetch("/api/badges").then((res) => res.json())

        // Fetch projects
        const { projects } = await fetch("/api/projects").then((res) => res.json())

        // Set stats
        setStats({
          achievements: {
            total: achievements?.length || 0,
            completed: achievements?.filter((a: any) => a.completed).length || 0,
          },
          badges: badges?.length || 0,
          projects: projects?.length || 0,
        })
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user, router])

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

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400 font-fondamento">Logros</p>
                  <p className="text-xl font-cinzel text-white">
                    {stats.achievements.completed}/{stats.achievements.total}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 font-fondamento">Insignias</p>
                  <p className="text-xl font-cinzel text-white">{stats.badges}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 font-fondamento">Proyectos</p>
                  <p className="text-xl font-cinzel text-white">{stats.projects}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="achievements" className="font-fondamento">
              Logros
            </TabsTrigger>
            <TabsTrigger value="badges" className="font-fondamento">
              Insignias
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-fondamento">
              Proyectos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements">
            <AchievementsDisplay />
          </TabsContent>

          <TabsContent value="badges">
            <BadgesDisplay />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsDisplay />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
