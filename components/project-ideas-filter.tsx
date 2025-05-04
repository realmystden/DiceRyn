"use client"

import { useEffect, useState } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas as allProjectIdeas } from "@/lib/project-ideas"
import type { ProjectIdea } from "@/lib/project-ideas"

export function useFilteredProjectIdeas() {
  const { easterEggActivated } = useProjectIdeasStore()
  const [filteredIdeas, setFilteredIdeas] = useState<ProjectIdea[]>([])

  useEffect(() => {
    // Filtrar las ideas de Brainfuck si el easter egg no está activado
    const ideas = easterEggActivated
      ? allProjectIdeas
      : allProjectIdeas.filter(
          (idea) => !idea.tecnologias.includes("Brainfuck") && idea.tipo !== "Programación Esotérica",
        )

    setFilteredIdeas(ideas)
  }, [easterEggActivated])

  return filteredIdeas
}
