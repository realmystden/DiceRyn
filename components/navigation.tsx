"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Dice6, BookOpen, Award, BarChart2, User, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, session, isLoading, signOut } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Navigate to a path and close the mobile menu
  const navigateTo = (path: string) => {
    router.push(path)
    closeMenu()
  }

  if (!mounted) return null

  // Base navigation links that are always visible
  const baseLinks = [
    { href: "/", label: "Inicio", icon: <Dice6 className="w-5 h-5" /> },
    { href: "/tech-projects", label: "Proyectos Tech", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/achievements", label: "Logros", icon: <Award className="w-5 h-5" /> },
    { href: "/statistics", label: "Estadísticas", icon: <BarChart2 className="w-5 h-5" /> },
  ]

  // Additional links that are only visible when logged in
  const authLinks = [
    { href: "/profile", label: "Perfil", icon: <User className="w-5 h-5" /> },
    { href: "/profile/settings", label: "Configuración", icon: <Settings className="w-5 h-5" /> },
  ]

  // Combine links based on authentication status
  const links = user ? [...baseLinks, ...authLinks] : baseLinks

  return (
    <header className="bg-[#0a0a0c] border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image src="/diceryn-logo.png" alt="DiceRyn Logo" width={40} height={40} />
            <span className="text-xl font-cinzel font-bold text-white">DiceRyn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  pathname === link.href || pathname?.startsWith(link.href + "/")
                    ? "bg-purple-900/30 text-purple-300"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="font-fondamento">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!isLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 border border-gray-700">
                    <AvatarImage src={user.user_metadata.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.user_metadata.full_name?.[0] || user.user_metadata.username?.[0] || user.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings" className="cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth/login"
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Iniciar sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                  pathname === link.href || pathname?.startsWith(link.href + "/")
                    ? "bg-purple-900/30 text-purple-300"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span className="font-fondamento">{link.label}</span>
              </Link>
            ))}
            {!isLoading && user && (
              <button
                onClick={() => {
                  signOut()
                  closeMenu()
                }}
                className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-fondamento">Cerrar sesión</span>
              </button>
            )}
            {!isLoading && !user && (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors bg-purple-700 hover:bg-purple-600 text-white"
                onClick={closeMenu}
              >
                <User className="w-5 h-5" />
                <span className="font-fondamento">Iniciar sesión</span>
              </Link>
            )}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
