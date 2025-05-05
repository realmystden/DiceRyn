"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      await resetPassword(email)
      setMessage("Se ha enviado un correo para restablecer tu contraseña")
    } catch (error: any) {
      setMessage(error.message || "Ha ocurrido un error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto fantasy-card">
      <CardHeader>
        <CardTitle className="text-2xl font-cinzel text-center">Recuperar Contraseña</CardTitle>
        <CardDescription className="text-center font-fondamento">
          Ingresa tu correo electrónico para recibir un enlace de recuperación
        </CardDescription>
      </CardHeader>
      <CardContent>
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

          {message && (
            <p className={`text-sm ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>{message}</p>
          )}

          <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-600" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-400">
          <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
            Volver al inicio de sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
