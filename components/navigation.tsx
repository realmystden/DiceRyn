"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Home, Code, BarChart2, Medal, CheckSquare, ListTodo, LogIn, LogOut, User } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { user, signOut, isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    { href: "/", label: "Inicio", icon: <Home className="w-5 h-5" /> },
    { href: "/tech-projects", label: "Proyectos Tech", icon: <Code className="w-5 h-5" /> },
    { href: "/statistics", label: "Estadísticas", icon: <BarChart2 className="w-5 h-5" /> },
    { href: "/achievements", label: "Logros", icon: <CheckSquare className="w-5 h-5" /> },
    { href: "/badges", label: "Insignias", icon: <Medal className="w-6 h-6" /> },
    { href: "/badge-tasks", label: "Tareas", icon: <ListTodo className="w-5 h-5" /> },
  ]

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-cinzel text-white">DiceRyn</span>
              <span className="ml-2 text-xl">🎲</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-fondamento flex items-center space-x-1 transition-colors ${
                    pathname === item.href
                      ? "bg-purple-900/50 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {user.user_metadata.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                        alt="Perfil de usuario"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-300" />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuLabel>
                    <div className="font-bold">{user.user_metadata.name || user.email}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                    <Link href="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gray-700"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center px-3 py-2 rounded-md text-sm font-fondamento text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <LogIn className="w-5 h-5 mr-1" />
                <span>Iniciar sesión</span>
              </Link>
            )}

            <div className="ml-4 md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Abrir menú principal</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-sm"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-fondamento flex items-center space-x-2 ${
                  pathname === item.href
                    ? "bg-purple-900/50 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {!user && (
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-fondamento flex items-center space-x-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={closeMenu}
              >
                <LogIn className="w-5 h-5" />
                <span>Iniciar sesión</span>
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  signOut()
                  closeMenu()
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-fondamento flex items-center space-x-2 text-red-400 hover:bg-gray-800 hover:text-red-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
