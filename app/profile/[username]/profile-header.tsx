import { getSupabaseServer } from "@/lib/supabase/server"
import { BadgeGrid } from "@/components/badges/badge-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Calendar } from "lucide-react"

export async function ProfileHeader({ username }: { username: string }) {
  const supabase = getSupabaseServer()

  // Get user profile and their badges
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) {
    return <div>Profile not found</div>
  }

  // Get display badges
  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .in("id", profile.display_badges || [])

  // Format profile created_at date
  const joinedDate = new Date(profile.created_at)
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(joinedDate)

  // Get first name for avatar fallback
  const nameInitial = profile.full_name?.charAt(0) || profile.username?.charAt(0) || "?"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-2 border-background shadow-md">
          <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96"} />
          <AvatarFallback className="text-3xl">{nameInitial}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold truncate">{profile.full_name || profile.username}</h1>
            <div
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-md",
                profile.level === "Student" && "bg-blue-100 text-blue-800",
                profile.level === "Developer" && "bg-green-100 text-green-800",
                profile.level === "Engineer" && "bg-purple-100 text-purple-800",
                profile.level === "Architect" && "bg-amber-100 text-amber-800",
              )}
            >
              {profile.level}
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-2">@{profile.username}</p>

          {profile.bio && <p className="text-sm mb-4 line-clamp-3">{profile.bio}</p>}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {formattedDate}</span>
            </div>

            {profile.website && (
              <a
                href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span className="underline underline-offset-2">{profile.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {badges && badges.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-sm">Badges</h2>
          <BadgeGrid badges={badges} />
        </div>
      )}
    </div>
  )
}
