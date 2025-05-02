import { PageLayout } from "@/components/page-layout"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto py-10">
        <LoginForm />
      </div>
    </PageLayout>
  )
}
