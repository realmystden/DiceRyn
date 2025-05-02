import { LoginForm } from "@/components/auth/login-form"
import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Iniciar Sesión | DiceRyn",
  description: "Inicia sesión en tu cuenta de DiceRyn",
}

export default async function LoginPage() {
  const supabase = getSupabaseServer()

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/profile")
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <LoginForm />
    </div>
  )
}
