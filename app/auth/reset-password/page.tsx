import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { PageLayout } from "@/components/page-layout"

export default function ResetPasswordPage() {
  return (
    <PageLayout title="Restablecer Contraseña" description="Establece una nueva contraseña para tu cuenta">
      <div className="max-w-md mx-auto">
        <ResetPasswordForm />
      </div>
    </PageLayout>
  )
}
