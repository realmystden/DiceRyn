import { getSupabaseServer } from "@/lib/supabase/server"
import { ProfileHeader } from "./profile-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  const { data: profile } = await supabase.from("profiles").select("full_name").eq("username", username).single()

  return {
    title: profile ? `${profile.full_name || username}'s Profile | DiceRyn` : "Profile Not Found",
    description: `View ${username}'s profile, achievements, and badges on DiceRyn`,
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

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <ProfileHeader username={username} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{projectsCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{achievementsCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{badgesCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add additional sections here such as:
          - Recent projects
          - Achievement progress
          - Activity timeline
      */}
    </div>
  )
}
