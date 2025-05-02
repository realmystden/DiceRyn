import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeManager } from "../badge-manager"
import { ProfileForm } from "@/components/profile/profile-form"
import { AccountForm } from "@/components/profile/account-form"

export const metadata = {
  title: "Configuración de Perfil | DiceRyn",
  description: "Gestiona tu perfil, insignias y configuración de cuenta",
}

export default async function ProfileSettingsPage() {
  const supabase = getSupabaseServer()

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (!profile) {
    // This shouldn't happen as profiles are created on signup,
    // but redirect just in case
    redirect("/auth/login")
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración de Perfil</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="badges">Insignias</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información de Perfil</CardTitle>
              <CardDescription>
                Actualiza tu información de perfil y personaliza tu presencia en DiceRyn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm
                initialData={{
                  id: profile.id,
                  username: profile.username,
                  avatar_url: profile.avatar_url,
                  bio: profile.bio,
                  website: profile.website,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Insignias</CardTitle>
              <CardDescription>Elige hasta 5 insignias para mostrar en tu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <BadgeManager userId={session.user.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
              <CardDescription>Gestiona tu email y contraseña</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountForm email={session.user.email} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
