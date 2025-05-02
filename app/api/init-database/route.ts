import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST() {
  console.log("Database initialization API route called")

  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user to verify authentication
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      console.error("Auth error:", userError)
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Execute the database initialization SQL
    const { error: createTablesError } = await supabase.rpc("initialize_database")

    if (createTablesError) {
      console.error("Error creating tables:", createTablesError)

      // Try a simpler approach - create just the completed_projects table
      const { error: fallbackError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS completed_projects (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          level TEXT NOT NULL,
          technologies TEXT[] DEFAULT '{}',
          frameworks TEXT[] DEFAULT '{}',
          databases TEXT[] DEFAULT '{}',
          completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      if (fallbackError) {
        console.error("Fallback table creation failed:", fallbackError)
        return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unhandled error in database initialization:", error)
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    )
  }
}
