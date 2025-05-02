"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Dice6, BookOpen, Tv2, CuboidIcon as Cube, Code2 } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    {
      name: "Inicio",
      href: "/",
      icon: <Dice6 className="w-5 h-5" />,
    },
    {
      name: "Proyectos de Tecnología",
      href: "/tech-projects",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      name: "Historias Cortas",
      href: "/story-generator",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Dibujos Anime",
      href: "/anime-ideas",
      icon: <Tv2 className="w-5 h-5" />,
    },
    {
      name: "Modelos 3D",
      href: "/3d-model-ideas",
      icon: <Cube className="w-5 h-5" />,
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121214]/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMenu}>
              <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image src="/diceryn-logo.png" alt="DiceRyn Logo" width={40} height={40} className="mr-2" priority />
                <span className="text-white text-xl font-cinzel">DiceRyn</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                      isActive ? "bg-purple-900/30 text-white" : ""
                    }`}
                  >
                    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#121214] border-b border-purple-900/30">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      isActive ? "bg-purple-900/30 text-white" : ""
                    }`}
                    onClick={closeMenu}
                  >
                    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
