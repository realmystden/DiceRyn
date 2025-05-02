"use client"

import { useEffect } from "react"
import DiceScene from "@/components/dice-scene"
import { ProjectIdeas } from "@/components/project-ideas"
import { AppTypeFilter } from "@/components/app-type-filter"
import { LanguageFilter } from "@/components/language-filter"
import { FrameworkFilter } from "@/components/framework-filter"
import { DatabaseFilter } from "@/components/database-filter"
import { NivelFilter } from "@/components/nivel-filter"
import { SortOptions } from "@/components/sort-options"
import { useProjectIdeasStore } from "@/lib/store"

export default function Home() {
  const { currentColor } = useProjectIdeasStore()

  // Aplicar el color actual
  useEffect(() => {
    document.body.style.background = currentColor
  }, [currentColor])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 transition-colors duration-300 text-white">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-8 py-8">
        {/* Cabecera con título */}
        <div className="w-full text-center">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold drop-shadow-lg mb-2">DiceRyn</h1>
          <p className="text-xl font-fondamento text-center max-w-2xl mx-auto opacity-90">
            Haz clic en el dado para obtener una idea aleatoria para tu próximo proyecto.
          </p>
        </div>

        {/* Filtros y controles */}
        <div className="w-full fantasy-card p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <h2 className="text-xl font-cinzel">Filtros y Opciones</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AppTypeFilter />
            <LanguageFilter />
            <FrameworkFilter />
            <DatabaseFilter />
            <NivelFilter />
            <SortOptions />
          </div>
        </div>

        {/* Escena 3D del dado */}
        <div className="w-full h-[500px] relative fantasy-card p-4">
          <DiceScene />
        </div>

        {/* Componente de ideas de proyecto */}
        <ProjectIdeas />
      </div>
    </main>
  )
}
