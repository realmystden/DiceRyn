import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { PageLayout } from "@/components/page-layout"

export default function ForgotPasswordPage() {
  return (
    <PageLayout title="Recuperar Contraseña" description="Recupera tu contraseña para acceder a tu cuenta">
      <div className="max-w-md mx-auto">
        <ForgotPasswordForm />
      </div>
    </PageLayout>
  )
}
