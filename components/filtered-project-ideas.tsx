"use client"

import { useEffect, useState } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import type { ProjectIdea } from "@/lib/project-ideas"

export function useFilteredProjectIdeas() {
  const { easterEggActivated } = useProjectIdeasStore()
  const [filteredIdeas, setFilteredIdeas] = useState<ProjectIdea[]>(projectIdeas)

  useEffect(() => {
    // Filtrar las ideas de Brainfuck si el easter egg no está activado
    const ideas = easterEggActivated
      ? projectIdeas
      : projectIdeas.filter((idea) => {
          // Verificar si tecnologias existe y es un array antes de usar includes
          const hasBrainfuck = Array.isArray(idea.tecnologias) && idea.tecnologias.includes("Brainfuck")
          return !hasBrainfuck && idea.tipo !== "Programación Esotérica"
        })

    setFilteredIdeas(ideas)
  }, [easterEggActivated])

  return filteredIdeas
}
