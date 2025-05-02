import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Create a Supabase client configured to use cookies for auth
export const getSupabaseServer = () => {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
