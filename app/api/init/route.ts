import { createStorageBuckets } from "@/lib/supabase/storage"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create storage buckets
    await createStorageBuckets()

    return NextResponse.json({ success: true, message: "App initialized successfully" })
  } catch (error) {
    console.error("Initialization error:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize app" }, { status: 500 })
  }
}
