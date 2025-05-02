import { PageLayout } from "@/components/page-layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto py-10">
        <div className="fantasy-card p-6 text-center">
          <Mail className="w-16 h-16 mx-auto text-purple-500 mb-4" />
          <h1 className="text-2xl font-cinzel font-bold text-white mb-4">Verifica tu correo electrónico</h1>
          <p className="text-gray-300 font-fondamento mb-6">
            Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y
            haz clic en el enlace para verificar tu cuenta.
          </p>
          <p className="text-gray-400 text-sm font-fondamento mb-6">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace.
          </p>
          <div className="flex flex-col space-y-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/auth/login">Volver a iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
