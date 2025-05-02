"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  initialData: {
    id: string
    username: string
    avatar_url: string | null
    bio: string | null
    website: string | null
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [username, setUsername] = useState(initialData.username)
  const [bio, setBio] = useState(initialData.bio || "")
  const [website, setWebsite] = useState(initialData.website || "")
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatar_url || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const router = useRouter()

  const supabase = getSupabaseClient()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file)
      setAvatarUrl(objectUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUsernameError("")

    try {
      // Check if username is taken (if changed)
      if (username !== initialData.username) {
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", username)
          .single()

        if (existingUser) {
          setUsernameError("Este nombre de usuario ya está en uso")
          setIsLoading(false)
          return
        }
      }

      // Upload avatar if changed
      let newAvatarUrl = initialData.avatar_url
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const fileName = `${initialData.id}-${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName)

        newAvatarUrl = publicUrlData.publicUrl
      }

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
          website,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", initialData.id)

      if (updateError) throw updateError

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-2 border-background shadow-md">
            <AvatarImage src={avatarUrl || "/placeholder.svg?height=96&width=96"} />
            <AvatarFallback>{username?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>

          <div className="flex items-center">
            <Label
              htmlFor="avatar"
              className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Cambiar avatar
            </Label>
            <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={usernameError ? "border-red-500" : ""}
          />
          {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Cuéntanos un poco sobre ti..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Sitio web</Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://tudominio.com"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </form>
  )
}
