"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Home, Code, BookOpen, BarChart2, Medal, CheckSquare, ListTodo } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
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
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Image
                  src="https://pbs.twimg.com/profile_images/1907218289815662592/yZnMctPj_400x400.jpg"
                  alt="Perfil de usuario"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-xl z-50">
                  <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
                    <p className="font-bold">Mystden</p>
                    <p className="text-gray-400 text-xs">Usuario</p>
                  </div>
                </div>
              )}
            </div>

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
          </div>
        </motion.div>
      )}
    </nav>
  )
}
