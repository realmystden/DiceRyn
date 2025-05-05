"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        const { data, error } = await supabase.from("profiles").select("username").eq("id", user.id).single()

        if (error) throw error

        if (data) {
          setUsername(data.username || "")
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message)
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user, supabase, toast])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsSaving(true)

    try {
      const { error } = await supabase.from("profiles").update({ username }).eq("id", user.id)

      if (error) throw error

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error.message)
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      </PageLayout>
    )
  }

  if (!user) return null

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="fantasy-card">
          <CardHeader>
            <CardTitle className="text-2xl font-cinzel">Mi Perfil</CardTitle>
            <CardDescription className="font-fondamento">
              Administra tu información personal y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile" className="font-fondamento">
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="account" className="font-fondamento">
                  Cuenta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50 bg-gray-800 flex items-center justify-center">
                        {user.user_metadata.avatar_url ? (
                          <Image
                            src={user.user_metadata.avatar_url || "/placeholder.svg"}
                            alt="Avatar"
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-4xl">👤</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow space-y-4">
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Nombre de usuario</Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={user.email || ""}
                            disabled
                            className="bg-gray-800 border-gray-700 opacity-70"
                          />
                          <p className="text-xs text-gray-400">El email no se puede cambiar</p>
                        </div>

                        <Button type="submit" className="bg-purple-700 hover:bg-purple-600" disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            "Guardar cambios"
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="account">
                <div className="space-y-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-cinzel mb-2">Proveedor de autenticación</h3>
                    <p className="text-gray-400 mb-4 font-fondamento">
                      Tu cuenta está vinculada a través de:
                      <span className="text-white ml-1 font-medium">
                        {user.app_metadata.provider === "email" ? "Email y contraseña" : user.app_metadata.provider}
                      </span>
                    </p>
                  </div>

                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
                    <h3 className="text-lg font-cinzel mb-2 text-red-400">Zona de peligro</h3>
                    <p className="text-gray-400 mb-4 font-fondamento">
                      Estas acciones son permanentes y no se pueden deshacer.
                    </p>
                    <Button variant="destructive">Eliminar cuenta</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
