import { UpdatePasswordForm } from "@/components/auth/update-password-form"

export const metadata = {
  title: "Actualizar Contraseña | DiceRyn",
  description: "Actualiza tu contraseña de DiceRyn",
}

export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <UpdatePasswordForm />
    </div>
  )
}
