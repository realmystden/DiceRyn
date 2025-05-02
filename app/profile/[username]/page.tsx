import { getSupabaseServer } from "@/lib/supabase/server"
import { ProfileHeader } from "./profile-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AchievementsList } from "@/components/profile/achievements-list"
import { ProjectsList } from "@/components/profile/projects-list"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = params
  const supabase = getSupabaseServer()

  const { data: profile } = await supabase.from("profiles").select("username").eq("username", username).single()

  return {
    title: profile ? `${profile.username} | DiceRyn` : "Perfil no encontrado",
    description: `Ver el perfil, logros e insignias de ${username} en DiceRyn`,
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params
  const supabase = getSupabaseServer()

  // Check if profile exists
  const { data: profile } = await supabase.from("profiles").select("id").eq("username", username).single()

  if (!profile) {
    notFound()
  }

  // Get completed projects count
  const { count: projectsCount } = await supabase
    .from("completed_projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id)

  // Get achievements count
  const { count: achievementsCount } = await supabase
    .from("user_achievements")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id)

  // Get badges count
  const { count: badgesCount } = await supabase
    .from("user_badges")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id)

  // Check if current user is viewing their own profile
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isOwnProfile = session?.user.id === profile.id

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <ProfileHeader username={username} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{projectsCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Logros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{achievementsCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Insignias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{badgesCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <ProjectsList userId={profile.id} />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsList userId={profile.id} />
        </TabsContent>
      </Tabs>

      {isOwnProfile && (
        <div className="flex justify-end">
          <a href="/profile/settings" className="text-sm text-primary hover:underline">
            Editar perfil
          </a>
        </div>
      )}
    </div>
  )
}
