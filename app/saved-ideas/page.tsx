"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Home, Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SavedIdeasExport } from "@/components/saved-ideas-export"

export default function SavedIdeasPage() {
  const { savedIdeas, toggleCompleted, removeSavedIdea, themeMode, currentColor } = useProjectIdeasStore()
  const [mounted, setMounted] = useState(false)
  const [sortedIdeas, setSortedIdeas] = useState<any[]>([])

  // Helper function to safely access project ideas
  const getSafeIdea = (id: number) => {
    const idea = projectIdeas.find((idea) => idea.id === id)
    return (
      idea || {
        titulo: "Idea no encontrada",
        descripcion: "Descripción no encontrada",
        tecnologias: [],
        categoria: "Desconocida",
        tipo: "Desconocido",
      }
    )
  }

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString(undefined, options)
  }

  // Aplicar el tema y color actual
  useEffect(() => {
    setMounted(true)
    document.body.className = themeMode || ""
    document.body.style.background = currentColor || ""

    // Solo ordenar las ideas después de que el componente esté montado
    if (savedIdeas && Array.isArray(savedIdeas)) {
      setSortedIdeas([...savedIdeas].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()))
    } else {
      setSortedIdeas([])
    }
  }, [themeMode, currentColor, savedIdeas])

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 transition-colors duration-300 ${
        themeMode === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="w-full max-w-6xl">
        <div className="page-header">
          <h1 className="page-title">Ideas Guardadas</h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/" className="nav-link">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-fondamento text-lg opacity-80">
            {savedIdeas?.length || 0 === 0
              ? "No tienes ideas guardadas. Regresa a la página principal para encontrar nuevas ideas."
              : `Tienes ${savedIdeas?.length || 0} ${savedIdeas?.length || 0 === 1 ? "idea guardada" : "ideas guardadas"}.`}
          </p>
          <SavedIdeasExport />
        </div>

        {savedIdeas?.length || 0 === 0 ? (
          <div className="fantasy-card p-8 text-center">
            <Bookmark className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-cinzel mb-4">No hay ideas guardadas</h2>
            <p className="font-fondamento mb-6">
              Regresa a la página principal y lanza el dado para descubrir nuevas ideas para tus proyectos.
            </p>
            <Link href="/">
              <Button className="fantasy-button">
                <Home className="mr-2 h-4 w-4" />
                <span className="font-fondamento">Volver al Inicio</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="saved-ideas-grid">
            {sortedIdeas.map((savedIdea) => {
              const idea = getSafeIdea(savedIdea.id)

              return (
                <motion.div
                  key={savedIdea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`saved-idea-card ${savedIdea.completed ? "opacity-70" : ""}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={savedIdea.completed}
                        onCheckedChange={() => toggleCompleted(savedIdea.id)}
                        className="mt-1"
                      />
                      <h3 className={`font-cinzel text-xl ${savedIdea.completed ? "line-through" : ""}`}>
                        Idea #{savedIdea.id}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSavedIdea(savedIdea.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <h4 className={`font-cinzel text-lg mb-2 ${savedIdea.completed ? "line-through" : ""}`}>
                    {idea.titulo}
                  </h4>

                  <p className="font-fondamento text-sm mb-3 opacity-90">{idea.descripcion}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {idea.tecnologias.map((tech, index) => (
                      <span key={index} className="px-2 py-0.5 rounded text-xs bg-indigo-800/50 font-fondamento">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="font-fondamento">
                        {idea.categoria}
                      </Badge>
                      <Badge variant="secondary" className="font-fondamento">
                        {idea.tipo}
                      </Badge>
                    </div>
                    <span className="text-xs opacity-70 font-fondamento">{formatDate(savedIdea.savedAt)}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
