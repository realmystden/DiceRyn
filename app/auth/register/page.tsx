import { RegisterForm } from "@/components/auth/register-form"
import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Registrarse | DiceRyn",
  description: "Crea una cuenta en DiceRyn",
}

export default async function RegisterPage() {
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
      <RegisterForm />
    </div>
  )
}
