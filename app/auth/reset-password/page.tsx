import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Recuperar Contraseña | DiceRyn",
  description: "Recupera tu contraseña de DiceRyn",
}

export default async function ResetPasswordPage() {
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
      <ResetPasswordForm />
    </div>
  )
}
