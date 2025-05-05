import { LoginForm } from "@/components/auth/login-form"
import { PageLayout } from "@/components/page-layout"

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoginForm />
      </div>
    </PageLayout>
  )
}
