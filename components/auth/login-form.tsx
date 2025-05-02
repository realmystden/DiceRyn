"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Github } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const redirectUrl = searchParams.get("redirect") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      router.push(redirectUrl)
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during Google sign in.",
        variant: "destructive",
      })
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during GitHub sign in.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="fantasy-card p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-cinzel font-bold text-white mb-6 text-center">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="/auth/reset-password" className="text-xs text-purple-400 hover:text-purple-300 font-fondamento">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-gray-900 text-gray-400 font-fondamento">O continúa con</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="border-gray-700 hover:bg-gray-800"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleGithubSignIn}
          className="border-gray-700 hover:bg-gray-800"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400 font-fondamento">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/register" className="text-purple-400 hover:text-purple-300">
          Regístrate
        </Link>
      </p>
    </div>
  )
}
