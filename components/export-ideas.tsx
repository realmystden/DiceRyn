"use client"

import { useState } from "react"
import { Download, FileText, FileJson, FileDown, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { jsPDF } from "jspdf"

export function ExportIdeas() {
  const { savedIdeas } = useProjectIdeasStore()
  const [isExporting, setIsExporting] = useState(false)

  // Verificar si hay ideas guardadas
  const hasSavedIdeas = savedIdeas.length > 0

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

  // Función para obtener los datos de las ideas guardadas
  const getSavedIdeasData = () => {
    return savedIdeas.map((savedIdea) => {
      const idea = getSafeIdea(savedIdea.id)

      return {
        id: savedIdea.id,
        titulo: idea.titulo,
        descripcion: idea.descripcion,
        categoria: idea.categoria,
        tecnologias: idea.tecnologias,
        tipo: idea.tipo,
        completado: savedIdea.completed,
        fechaGuardado: new Date(savedIdea.savedAt).toLocaleDateString("es-ES"),
      }
    })
  }

  // Exportar a TXT
  const exportToTxt = () => {
    setIsExporting(true)
    try {
      const ideas = getSavedIdeasData()
      let content = "DICERYN - IDEAS GUARDADAS\n\n"

      ideas.forEach((idea) => {
        content += `ID: ${idea.id}\n`
        content += `TÍTULO: ${idea.titulo}\n`
        content += `DESCRIPCIÓN: ${idea.descripcion}\n`
        content += `CATEGORÍA: ${idea.categoria}\n`
        content += `TIPO: ${idea.tipo}\n`
        content += `TECNOLOGÍAS: ${idea.tecnologias.join(", ")}\n`
        content += `ESTADO: ${idea.completado ? "Completado" : "Pendiente"}\n`
        content += `FECHA DE GUARDADO: ${idea.fechaGuardado}\n\n`
        content += "----------------------------------------\n\n"
      })

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "diceryn_ideas.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error al exportar a TXT:", error)
    } finally {
      setIsExporting(false)
    }
  }

  // Exportar a JSON
  const exportToJson = () => {
    setIsExporting(true)
    try {
      const ideas = getSavedIdeasData()
      const content = JSON.stringify(ideas, null, 2)

      const blob = new Blob([content], { type: "application/json;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "diceryn_ideas.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error al exportar a JSON:", error)
    } finally {
      setIsExporting(false)
    }
  }

  // Exportar a PDF
  const exportToPdf = () => {
    setIsExporting(true)
    try {
      const ideas = getSavedIdeasData()
      const doc = new jsPDF()

      // Título
      doc.setFont("times", "bold")
      doc.setFontSize(20)
      doc.text("DiceRyn - Ideas Guardadas", 105, 20, { align: "center" })

      let y = 40

      ideas.forEach((idea, index) => {
        // Verificar si necesitamos una nueva página
        if (y > 250) {
          doc.addPage()
          y = 20
        }

        doc.setFont("times", "bold")
        doc.setFontSize(14)
        doc.text(`Idea #${idea.id}: ${idea.titulo}`, 20, y)
        y += 10

        doc.setFont("times", "normal")
        doc.setFontSize(12)

        // Descripción (con manejo de texto largo)
        const descripcionLines = doc.splitTextToSize(idea.descripcion, 170)
        doc.text(descripcionLines, 20, y)
        y += descripcionLines.length * 7

        doc.text(`Categoría: ${idea.categoria}`, 20, y)
        y += 7

        doc.text(`Tipo: ${idea.tipo}`, 20, y)
        y += 7

        doc.text(`Tecnologías: ${idea.tecnologias.join(", ")}`, 20, y)
        y += 7

        doc.text(`Estado: ${idea.completado ? "Completado" : "Pendiente"}`, 20, y)
        y += 7

        doc.text(`Fecha de guardado: ${idea.fechaGuardado}`, 20, y)
        y += 15

        // Separador
        if (index < ideas.length - 1) {
          doc.setDrawColor(200)
          doc.line(20, y - 5, 190, y - 5)
          y += 10
        }
      })

      doc.save("diceryn_ideas.pdf")
    } catch (error) {
      console.error("Error al exportar a PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  // Exportar a Markdown
  const exportToMarkdown = () => {
    setIsExporting(true)
    try {
      const ideas = getSavedIdeasData()
      let content = "# DiceRyn - Ideas Guardadas\n\n"

      ideas.forEach((idea) => {
        content += `## Idea #${idea.id}: ${idea.titulo}\n\n`
        content += `**Descripción:** ${idea.descripcion}\n\n`
        content += `**Categoría:** ${idea.categoria}\n\n`
        content += `**Tipo:** ${idea.tipo}\n\n`
        content += `**Tecnologías:** ${idea.tecnologias.join(", ")}\n\n`
        content += `**Estado:** ${idea.completado ? "✅ Completado" : "⏳ Pendiente"}\n\n`
        content += `**Fecha de guardado:** ${idea.fechaGuardado}\n\n`
        content += "---\n\n"
      })

      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "diceryn_ideas.md"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error al exportar a Markdown:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="fantasy-button font-fondamento" disabled={!hasSavedIdeas || isExporting}>
          <Download className="mr-2 h-4 w-4" />
          <span className="font-fondamento">Exportar Ideas</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="fantasy-card">
        <DropdownMenuLabel className="font-cinzel">Formato de exportación</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={exportToTxt}
          disabled={!hasSavedIdeas || isExporting}
          className="cursor-pointer font-fondamento"
        >
          <FileText className="mr-2 h-4 w-4" />
          Texto plano (.txt)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToPdf}
          disabled={!hasSavedIdeas || isExporting}
          className="cursor-pointer font-fondamento"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Documento PDF (.pdf)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToMarkdown}
          disabled={!hasSavedIdeas || isExporting}
          className="cursor-pointer font-fondamento"
        >
          <FileCode className="mr-2 h-4 w-4" />
          Markdown (.md)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToJson}
          disabled={!hasSavedIdeas || isExporting}
          className="cursor-pointer font-fondamento"
        >
          <FileJson className="mr-2 h-4 w-4" />
          JSON (.json)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
