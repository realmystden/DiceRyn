"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { BadgeSystem } from "@/components/badge-system"
import { AnimatedSection } from "@/components/animated-section"
import { useProjectIdeasStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ListTodo } from "lucide-react"
import Link from "next/link"

export default function BadgesPage() {
  const [mounted, setMounted] = useState(false)
  const { getUnlockedAchievements } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const unlockedCount = getUnlockedAchievements().length

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="fantasy-card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-cinzel font-bold text-white mb-2">Insignias y Certificaciones</h1>
              <p className="text-gray-300 font-fondamento">
                Colecciona insignias completando proyectos y desbloqueando logros especiales.
              </p>
            </div>
            <div className="hidden md:block text-6xl">🏅</div>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mb-6 p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-cinzel text-white mb-2">Sistema de Insignias</h2>
                  <p className="text-gray-300 font-fondamento">
                    Las insignias son reconocimientos especiales más difíciles de obtener que los logros regulares.
                    Representan un nivel superior de maestría y dedicación en tu camino como desarrollador.
                  </p>
                </div>
                <Link href="/badge-tasks">
                  <Button className="bg-purple-700 hover:bg-purple-600">
                    <ListTodo className="mr-2 h-4 w-4" />
                    <span className="font-fondamento">Ver Tareas</span>
                  </Button>
                </Link>
              </div>
            </div>
            <BadgeSystem />
          </AnimatedSection>
        </div>
      </motion.div>
    </PageLayout>
  )
}
