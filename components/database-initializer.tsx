"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/auth/auth-provider"

export function DatabaseInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { supabase, user } = useSupabase()

  useEffect(() => {
    const initializeDatabase = async () => {
      if (!user) return

      try {
        // Check if the completed_projects table exists
        const { count, error: tableCheckError } = await supabase
          .from("completed_projects")
          .select("*", { count: "exact", head: true })

        if (tableCheckError) {
          console.error("Database not initialized:", tableCheckError)

          // Try to initialize the database
          const response = await fetch("/api/init-database", {
            method: "POST",
          })

          if (!response.ok) {
            throw new Error("Failed to initialize database")
          }

          console.log("Database initialized successfully")
        }

        setInitialized(true)
      } catch (err) {
        console.error("Error initializing database:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    initializeDatabase()
  }, [supabase, user])

  // This component doesn't render anything visible
  return null
}
