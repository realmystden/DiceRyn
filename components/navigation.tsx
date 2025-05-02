"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"
import Image from "next/image"

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { getTotalCompletedProjects, getUnlockedAchievements } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalCompletedProjects = mounted ? getTotalCompletedProjects() : 0
  const unlockedAchievements = mounted ? getUnlockedAchievements().length : 0

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tech-projects", label: "Proyectos" },
    { href: "/story-generator", label: "Historias" },
    { href: "/anime-ideas", label: "Anime" },
    { href: "/3d-model-ideas", label: "Modelos 3D" },
    { href: "/achievements", label: "Logros: ", badge: unlockedAchievements },
  ]

  return (
    <header className="w-full py-4 px-6 bg-[#0a0a0c] border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <Image src="/diceryn-logo.png" alt="DiceRyn Logo" width={40} height={40} className="mr-2" />
            <span className="text-2xl font-cinzel font-bold text-white">DiceRyn</span>
          </Link>

          {mounted && totalCompletedProjects > 0 && (
            <div className="ml-4 bg-purple-900/50 px-3 py-1 rounded-full">
              <span className="text-sm text-purple-300 font-fondamento">
                {totalCompletedProjects} {totalCompletedProjects === 1 ? "proyecto" : "proyectos"}
              </span>
            </div>
          )}
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-1 md:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} passHref>
                  <motion.span
                    className={`relative px-3 py-2 rounded-md font-fondamento text-sm transition-colors ${
                      pathname === link.href
                        ? "text-white bg-purple-900/50"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    } flex items-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    {link.badge && link.badge > 0 && (
                      <span className="ml-2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
