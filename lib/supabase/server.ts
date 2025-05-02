import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "../database.types"

// Create a Supabase client configured to use cookies for auth
export function getSupabaseServer() {
  const cookieStore = cookies()

  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
