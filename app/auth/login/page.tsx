"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { PageLayout } from "@/components/page-layout"
import { useAuth } from "@/lib/auth/auth-provider"
import { Loader2 } from "lucide-react"

function LoginContent() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect") || "/"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && user) {
      router.push(redirect)
    }
  }, [user, isLoading, router, redirect, mounted])

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (user) {
    return null
  }

  return <LoginForm />
}

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          }
        >
          <LoginContent />
        </Suspense>
      </div>
    </PageLayout>
  )
}
