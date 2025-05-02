"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, LogOut, User, Settings, Award } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  // Close mobile menu when changing pages
  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setShowUserMenu(false)
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  // Function to refresh statistics when navigating to the statistics page
  const handleStatisticsClick = async () => {
    if (pathname !== "/statistics" && user) {
      try {
        await fetch("/api/statistics/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error("Error refreshing statistics:", error)
      }
    }
  }

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tech-projects", label: "Proyectos Tech" },
    { href: "/story-generator", label: "Generador de Historias" },
    { href: "/anime-ideas", label: "Ideas de Anime" },
    { href: "/3d-model-ideas", label: "Ideas de Modelos 3D" },
    { href: "/achievements", label: "Logros" },
    { href: "/statistics", label: "Estadísticas", onClick: handleStatisticsClick },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/diceryn-logo.png" alt="Diceryn Logo" width={32} height={32} className="w-8 h-8" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.onClick}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                      pathname === link.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center max-w-xs text-sm text-white hover:bg-gray-800 rounded-full p-2 focus:outline-none"
                    >
                      <span className="mr-2 font-fondamento">{user.email?.split("@")[0] || "Usuario"}</span>
                      <ChevronDown
                        className={`transition-transform duration-200 ${showUserMenu ? "transform rotate-180" : ""}`}
                        size={16}
                      />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <User className="mr-2" size={16} />
                          Perfil
                        </Link>
                        <Link
                          href="/achievements"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <Award className="mr-2" size={16} />
                          Logros
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <Settings className="mr-2" size={16} />
                          Ajustes
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <LogOut className="mr-2" size={16} />
                          Cerrar sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.onClick}
                  className={`block px-3 py-2 rounded-md text-base font-medium font-fondamento ${
                    pathname === link.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              {user ? (
                <div className="px-2 space-y-1">
                  <div className="px-3 py-2 text-gray-400 font-fondamento">{user.email || "Usuario"}</div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/achievements"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Logros
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Ajustes
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-1">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
