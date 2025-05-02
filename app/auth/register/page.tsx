import { PageLayout } from "@/components/page-layout"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto py-10">
        <RegisterForm />
      </div>
    </PageLayout>
  )
}
