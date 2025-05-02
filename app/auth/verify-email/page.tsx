import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Verificar Email | DiceRyn",
  description: "Verifica tu correo electrónico para completar el registro",
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-purple-900/30">
              <Mail className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Verifica tu Email</CardTitle>
          <CardDescription className="text-center">
            Hemos enviado un enlace de verificación a tu correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 mb-6">
            Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación para completar tu registro.
          </p>
          <p className="text-gray-400 text-sm">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace de
            verificación.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="link" className="text-purple-400 hover:text-purple-300">
            <Link href="/auth/login">Volver al inicio de sesión</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
