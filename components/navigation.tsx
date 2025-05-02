"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Dice6, BookOpen, Award, BarChart2 } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
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

  if (!mounted) return null

  const links = [
    { href: "/", label: "Inicio", icon: <Dice6 className="w-5 h-5" /> },
    { href: "/tech-projects", label: "Proyectos Tech", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/achievements", label: "Logros", icon: <Award className="w-5 h-5" /> },
    { href: "/statistics", label: "Estadísticas", icon: <BarChart2 className="w-5 h-5" /> },
  ]

  return (
    <header className="bg-[#0a0a0c] border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image src="/diceryn-logo.png" alt="DiceRyn Logo" width={40} height={40} />
            <span className="text-xl font-cinzel font-bold text-white">DiceRyn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  pathname === link.href
                    ? "bg-purple-900/30 text-purple-300"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="font-fondamento">{link.label}</span>
              </Link>
            ))}
          </nav>

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
                  pathname === link.href
                    ? "bg-purple-900/30 text-purple-300"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span className="font-fondamento">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
