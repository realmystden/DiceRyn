"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsDisplay } from "@/components/profile/projects-display"
import { AchievementsDisplay } from "@/components/profile/achievements-display"
import { BadgesDisplay } from "@/components/profile/badges-display"
import { useAuth } from "@/lib/auth/auth-provider"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)

    if (!user && !loading) {
      router.push("/auth/login?redirect=/profile")
      return
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    // When a user completes a project and returns to the profile page,
    // trigger a statistics refresh
    if (user) {
      try {
        fetch("/api/statistics/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((err) => console.error("Error refreshing statistics:", err))
      } catch (error) {
        console.error("Error refreshing statistics:", error)
      }
    }

    return () => clearTimeout(timer)
  }, [user, router, loading])

  if (!mounted || loading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
          <span className="text-white font-fondamento">Cargando perfil...</span>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    router.push("/auth/login?redirect=/profile")
    return null
  }

  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="fantasy-card p-6 mb-8">
          <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Tu Perfil</h1>
          <p className="text-gray-300 font-fondamento mb-6">
            Administra tu progreso, proyectos completados, logros y más.
          </p>

          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="achievements" className="font-fondamento">
                Logros
              </TabsTrigger>
              <TabsTrigger value="projects" className="font-fondamento">
                Proyectos
              </TabsTrigger>
              <TabsTrigger value="badges" className="font-fondamento">
                Insignias
              </TabsTrigger>
            </TabsList>
            <TabsContent value="achievements">
              <AchievementsDisplay />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsDisplay />
            </TabsContent>
            <TabsContent value="badges">
              <BadgesDisplay />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
