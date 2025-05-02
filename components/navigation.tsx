"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Dice1Icon as Dice, BookOpen, PenTool, CuboidIcon as Cube, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Inicio", href: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Proyectos de Tecnología", href: "/tech-projects", icon: <Dice className="w-5 h-5 mr-2" /> },
    { name: "Historias Cortas", href: "/story-generator", icon: <BookOpen className="w-5 h-5 mr-2" /> },
    { name: "Dibujos Anime", href: "/anime-ideas", icon: <PenTool className="w-5 h-5 mr-2" /> },
    { name: "Modelos 3D", href: "/3d-model-ideas", icon: <Cube className="w-5 h-5 mr-2" /> },
  ]

  return (
    <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/diceryn.png" alt="DiceRyn Logo" width={40} height={40} className="rounded-full" />
              <span className="ml-2 text-xl font-cinzel font-bold">DiceRyn</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-fondamento hover:bg-gray-800 transition-colors flex items-center"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
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
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-fondamento hover:bg-gray-800 transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
