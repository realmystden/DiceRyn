"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ExportIdeas } from "@/components/export-ideas"
import Link from "next/link"

export function SavedIdeas() {
  const { savedIdeas, toggleCompleted, removeSavedIdea } = useProjectIdeasStore()
  const [open, setOpen] = useState(false)

  // Ordenar ideas guardadas por fecha (más recientes primero)
  const sortedIdeas = [...savedIdeas].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Función para obtener una idea segura (con manejo de errores)
  const getSafeIdea = (id: number) => {
    // Verificar si el ID es válido
    if (id <= 0 || id > projectIdeas.length) {
      return {
        titulo: "Idea no disponible",
        descripcion: "Esta idea ya no está disponible",
        categoria: "N/A",
        tecnologias: [],
        tipo: "Aplicación Web" as const,
      }
    }

    // Intentar obtener la idea por su índice
    try {
      const idea = projectIdeas[id - 1]
      return (
        idea || {
          titulo: "Idea no disponible",
          descripcion: "Esta idea ya no está disponible",
          categoria: "N/A",
          tecnologias: [],
          tipo: "Aplicación Web" as const,
        }
      )
    } catch (error) {
      console.error("Error al cargar idea:", error)
      return {
        titulo: "Idea no disponible",
        descripcion: "Esta idea ya no está disponible",
        categoria: "N/A",
        tecnologias: [],
        tipo: "Aplicación Web" as const,
      }
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative fantasy-button">
          <Bookmark className="mr-2 h-4 w-4" />
          <span className="font-fondamento">Ideas Guardadas</span>
          {savedIdeas.length > 0 && <Badge className="ml-2 bg-primary">{savedIdeas.length}</Badge>}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto fantasy-card border-gold-light/30">
        <SheetHeader>
          <SheetTitle className="font-cinzel text-2xl">Ideas Guardadas</SheetTitle>
          <SheetDescription className="font-fondamento">
            Aquí puedes ver y gestionar tus ideas guardadas.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 mb-6 flex flex-col sm:flex-row gap-3 justify-between">
          <ExportIdeas />
          <Link href="/saved-ideas" passHref>
            <Button variant="outline" className="fantasy-button w-full sm:w-auto" onClick={() => setOpen(false)}>
              <ExternalLink className="mr-2 h-4 w-4" />
              <span className="font-fondamento">Ver página completa</span>
            </Button>
          </Link>
        </div>

        {sortedIdeas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground font-fondamento">No tienes ideas guardadas.</p>
            <p className="text-sm text-muted-foreground font-fondamento">
              Guarda ideas haciendo clic en el botón "Guardar" cuando veas una idea que te guste.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <AnimatePresence>
              {sortedIdeas.map((savedIdea) => {
                const idea = getSafeIdea(savedIdea.id)

                return (
                  <motion.div
                    key={savedIdea.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 border rounded-lg fantasy-card ${savedIdea.completed ? "bg-muted/30" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={savedIdea.completed}
                          onCheckedChange={() => toggleCompleted(savedIdea.id)}
                          className="mt-1"
                        />
                        <div className={savedIdea.completed ? "opacity-60" : ""}>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-cinzel font-medium ${savedIdea.completed ? "line-through" : ""}`}>
                              {idea.titulo}
                            </h3>
                            <Badge variant="secondary" className="font-fondamento">
                              {idea.tipo}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-fondamento">
                            Guardado el {formatDate(savedIdea.savedAt)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeSavedIdea(savedIdea.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
