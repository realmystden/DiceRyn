import { getSupabaseServer } from "./server"

export async function createStorageBuckets() {
  const supabase = getSupabaseServer()

  // Create avatars bucket if it doesn't exist
  const { data: buckets } = await supabase.storage.listBuckets()

  if (!buckets?.find((bucket) => bucket.name === "avatars")) {
    await supabase.storage.createBucket("avatars", {
      public: true,
      fileSizeLimit: 1024 * 1024 * 2, // 2MB
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    })
  }
}
