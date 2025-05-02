"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AccountFormProps {
  email: string
}

export function AccountForm({ email }: AccountFormProps) {
  const [isEmailChangeOpen, setIsEmailChangeOpen] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = getSupabaseClient()

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail })

      if (error) throw error

      toast({
        title: "Solicitud enviada",
        description: "Se ha enviado un correo de verificación a tu nueva dirección de email",
      })

      setIsEmailChangeOpen(false)
    } catch (error: any) {
      setError(error.message || "Error al actualizar el email")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error

      toast({
        title: "Correo enviado",
        description: "Se ha enviado un correo para restablecer tu contraseña",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al enviar el correo de restablecimiento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="flex items-center gap-4">
            <Input value={email} disabled className="flex-1" />
            <Dialog open={isEmailChangeOpen} onOpenChange={setIsEmailChangeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Cambiar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar dirección de email</DialogTitle>
                  <DialogDescription>
                    Ingresa tu nueva dirección de email. Recibirás un correo de verificación.
                  </DialogDescription>
                </DialogHeader>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleEmailChange}>
                  <div className="space-y-2 py-2">
                    <Label htmlFor="newEmail">Nueva dirección de email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={() => setIsEmailChangeOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Contraseña</Label>
          <div className="flex items-center gap-4">
            <Input type="password" value="••••••••" disabled className="flex-1" />
            <Button variant="outline" onClick={handlePasswordReset} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cambiar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
