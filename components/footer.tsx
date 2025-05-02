"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  // Don't show footer on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }

  return (
    <footer className="w-full py-4 px-6 border-t border-gray-800 mt-auto bg-[#0a0a0c]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-2 md:mb-0 font-fondamento">© DiceRyn by Rynverse</div>
        <div className="flex space-x-4">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors font-fondamento"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors font-fondamento"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}
