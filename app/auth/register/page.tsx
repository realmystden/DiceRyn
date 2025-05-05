import { RegisterForm } from "@/components/auth/register-form"
import { PageLayout } from "@/components/page-layout"

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <RegisterForm />
      </div>
    </PageLayout>
  )
}
