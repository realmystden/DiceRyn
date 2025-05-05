"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { updatePassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {
      await updatePassword(password)
      router.push("/auth/login?message=password-updated")
    } catch (error: any) {
      setError(error.message || "Ha ocurrido un error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto fantasy-card">
      <CardHeader>
        <CardTitle className="text-2xl font-cinzel text-center">Restablecer Contraseña</CardTitle>
        <CardDescription className="text-center font-fondamento">Ingresa tu nueva contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-800 border-gray-700"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-600" disabled={isLoading}>
            {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
