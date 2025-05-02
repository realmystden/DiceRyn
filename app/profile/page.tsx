import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Mi Perfil | DiceRyn",
  description: "Gestiona tu perfil y visualiza tus logros en DiceRyn",
}

export default async function ProfilePage() {
  const supabase = getSupabaseServer()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("username").eq("id", session.user.id).single()

  if (!profile) {
    // This shouldn't happen as profiles are created on signup
    return <div>Error loading profile</div>
  }

  // Redirect to the user's profile page
  redirect(`/profile/${profile.username}`)
}
