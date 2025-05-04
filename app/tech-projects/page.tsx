"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PageLayout } from "@/components/page-layout"
import { Roadmap } from "@/components/roadmap"
import { ProjectIdeas } from "@/components/project-ideas"
import { AppTypeFilter } from "@/components/app-type-filter"
import { LanguageFilter } from "@/components/language-filter"
import { FrameworkFilter } from "@/components/framework-filter"
import { DatabaseFilter } from "@/components/database-filter"
import { NivelFilter } from "@/components/nivel-filter"
import { SortOptions } from "@/components/sort-options"
import { NoResultsMessage } from "@/components/no-results-message"
import { useProjectIdeasStore } from "@/lib/store"
import { useFilteredProjectIdeas } from "@/components/filtered-project-ideas"
import { AnimatedSection } from "@/components/animated-section"

// Importar TechDice de forma dinámica para evitar problemas de SSR
const TechDice = dynamic(() => import("@/components/tech-dice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="text-xl font-fondamento text-white">Cargando dado...</div>
    </div>
  ),
})

const techRoadmapSteps = [
  {
    level: "Principiante",
    title: "Fundamentos de Programación",
    description: "Aprende los conceptos básicos de programación y familiarízate con un lenguaje inicial.",
    skills: [
      "Sintaxis básica de un lenguaje (JavaScript, Python)",
      "Variables y tipos de datos",
      "Estructuras de control (if/else, bucles)",
      "Funciones básicas",
      "HTML y CSS fundamentales",
    ],
    projects: [
      "Calculadora simple",
      "Lista de tareas básica",
      "Página web personal estática",
      "Juego de adivinanzas en consola",
      "Conversor de unidades",
    ],
  },
  {
    level: "Intermedio",
    title: "Desarrollo Web y Aplicaciones",
    description: "Profundiza en el desarrollo web y comienza a crear aplicaciones más complejas.",
    skills: [
      "Frameworks frontend (React, Vue, Angular)",
      "Manipulación del DOM",
      "APIs y peticiones HTTP",
      "Bases de datos relacionales y NoSQL",
      "Control de versiones con Git",
    ],
    projects: [
      "Aplicación de clima con API",
      "Blog con sistema de comentarios",
      "E-commerce simple",
      "Dashboard de datos",
      "Clon de redes sociales populares",
    ],
  },
  {
    level: "Avanzado",
    title: "Arquitectura y Optimización",
    description: "Aprende sobre arquitectura de software, optimización y prácticas avanzadas.",
    skills: [
      "Patrones de diseño",
      "Arquitectura de microservicios",
      "Testing automatizado",
      "CI/CD y DevOps",
      "Seguridad en aplicaciones",
    ],
    projects: [
      "Sistema de gestión empresarial",
      "Plataforma de streaming",
      "Aplicación con autenticación y autorización",
      "Sistema de recomendación con IA",
      "Plataforma SaaS completa",
    ],
  },
  {
    level: "Experto",
    title: "Innovación y Liderazgo Técnico",
    description: "Conviértete en un líder técnico y contribuye a la innovación en el campo.",
    skills: [
      "Arquitectura de sistemas distribuidos",
      "Escalabilidad y rendimiento",
      "Liderazgo técnico",
      "Investigación y desarrollo",
      "Mentoría y formación",
    ],
    projects: [
      "Plataforma cloud-native",
      "Sistema de procesamiento de big data",
      "Framework o librería open source",
      "Solución empresarial compleja",
      "Proyecto de investigación en tecnologías emergentes",
    ],
  },
]

export default function TechProjects() {
  const [mounted, setMounted] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [isRolling, setIsRolling] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState("")

  const {
    appTypeFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    setAppTypeFilter,
    setLanguageFilter,
    setFrameworkFilter,
    setDatabaseFilter,
    setNivelFilter,
  } = useProjectIdeasStore()

  const filteredIdeas = useFilteredProjectIdeas()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Verificar si hay resultados con los filtros actuales
  useEffect(() => {
    if (!mounted) return

    let ideas = [...filteredIdeas]

    // Aplicar filtros con comprobaciones de seguridad
    if (appTypeFilter) {
      ideas = ideas.filter((idea) => {
        // Asegurarse de que idea.tipo existe antes de usar includes
        return idea.tipo === appTypeFilter
      })
    }

    if (languageFilter) {
      ideas = ideas.filter((idea) => {
        // Asegurarse de que idea.tecnologias existe y es un array antes de usar includes
        return Array.isArray(idea.tecnologias) && idea.tecnologias.includes(languageFilter)
      })
    }

    if (frameworkFilter) {
      ideas = ideas.filter((idea) => {
        // Asegurarse de que idea.frameworks existe y es un array antes de usar includes
        return Array.isArray(idea.frameworks) && idea.frameworks.includes(frameworkFilter)
      })
    }

    if (databaseFilter) {
      ideas = ideas.filter((idea) => {
        // Asegurarse de que idea.basesdedatos existe y es un array antes de usar includes
        return Array.isArray(idea.basesdedatos) && idea.basesdedatos.includes(databaseFilter)
      })
    }

    if (nivelFilter) {
      ideas = ideas.filter((idea) => {
        // Asegurarse de que idea.nivel existe antes de comparar
        return idea.nivel === nivelFilter
      })
    }

    // Filtrar por término de búsqueda
    if (searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase()
      ideas = ideas.filter(
        (idea) =>
          idea.titulo.toLowerCase().includes(searchTerm) ||
          idea.descripcion.toLowerCase().includes(searchTerm) ||
          (idea.tecnologias && idea.tecnologias.some((tech) => tech.toLowerCase().includes(searchTerm))) ||
          (idea.frameworks && idea.frameworks.some((framework) => framework.toLowerCase().includes(searchTerm))) ||
          (idea.basesdedatos && idea.basesdedatos.some((db) => db.toLowerCase().includes(searchTerm))),
      )
    }

    // Actualizar estado de noResults
    setNoResults(ideas.length === 0)
  }, [appTypeFilter, languageFilter, frameworkFilter, databaseFilter, nivelFilter, searchInput, mounted, filteredIdeas])

  const handleRollComplete = (result: string) => {
    if (noResults) {
      // No hacer nada si no hay resultados
      return
    }

    // Filtrar ideas según los criterios seleccionados con comprobaciones de seguridad
    let ideas = [...filteredIdeas]

    if (appTypeFilter) {
      ideas = ideas.filter((idea) => idea.tipo === appTypeFilter)
    }

    if (languageFilter) {
      ideas = ideas.filter((idea) => {
        return Array.isArray(idea.tecnologias) && idea.tecnologias.includes(languageFilter)
      })
    }

    if (frameworkFilter) {
      ideas = ideas.filter((idea) => {
        return Array.isArray(idea.frameworks) && idea.frameworks.includes(frameworkFilter)
      })
    }

    if (databaseFilter) {
      ideas = ideas.filter((idea) => {
        return Array.isArray(idea.basesdedatos) && idea.basesdedatos.includes(databaseFilter)
      })
    }

    if (nivelFilter) {
      ideas = ideas.filter((idea) => idea.nivel === nivelFilter)
    }

    // Filtrar por término de búsqueda
    if (searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase()
      ideas = ideas.filter(
        (idea) =>
          idea.titulo.toLowerCase().includes(searchTerm) ||
          idea.descripcion.toLowerCase().includes(searchTerm) ||
          (idea.tecnologias && idea.tecnologias.some((tech) => tech.toLowerCase().includes(searchTerm))) ||
          (idea.frameworks && idea.frameworks.some((framework) => framework.toLowerCase().includes(searchTerm))) ||
          (idea.basesdedatos && idea.basesdedatos.some((db) => db.toLowerCase().includes(searchTerm))),
      )
    }

    // Si no hay ideas con los filtros aplicados, usar todas las ideas
    if (ideas.length === 0) {
      ideas = filteredIdeas
    }

    // Seleccionar idea aleatoria de las filtradas
    const randomIndex = Math.floor(Math.random() * ideas.length)
    const selectedIdeaIndex = filteredIdeas.findIndex((idea) => idea.titulo === ideas[randomIndex].titulo)

    // Usar el estado local en lugar del store
    setSelectedIdeaIndex(selectedIdeaIndex + 1)
  }

  const resetFilters = () => {
    setAppTypeFilter(null)
    setLanguageFilter(null)
    setFrameworkFilter(null)
    setDatabaseFilter(null)
    setNivelFilter(null)
    setSearchInput("")
  }

  // Función para obtener el color según el nivel
  const getLevelColor = (level: string | null) => {
    switch (level) {
      case "Student":
        return "text-green-400"
      case "Trainee":
        return "text-blue-400"
      case "Junior":
        return "text-yellow-400"
      case "Senior":
        return "text-orange-400"
      case "Master":
        return "text-red-400"
      default:
        return "text-white"
    }
  }

  // Función para obtener el emoji según el tipo de filtro
  const getFilterEmoji = (filterType: string, value: string | null) => {
    if (!value) return ""

    const emojiMap: Record<string, Record<string, string>> = {
      appType: {
        Web: "🌐",
        Móvil: "📱",
        Desktop: "💻",
        API: "🔌",
        Juego: "🎮",
        CLI: "⌨️",
      },
      language: {
        JavaScript: "📜",
        Python: "🐍",
        Java: "☕",
        "C#": "🔷",
        PHP: "🐘",
        Ruby: "💎",
        Go: "🐹",
        Rust: "🦀",
        TypeScript: "📘",
        Swift: "🍎",
        Kotlin: "🤖",
        "C++": "⚙️",
        Brainfuck: "🧠",
      },
      framework: {
        React: "⚛️",
        Angular: "🅰️",
        Vue: "🟢",
        "Next.js": "▲",
        Express: "🚂",
        Django: "🦄",
        Spring: "🍃",
        Laravel: "🔺",
        Flutter: "🦋",
        "React Native": "📱",
      },
      database: {
        MySQL: "🐬",
        PostgreSQL: "🐘",
        MongoDB: "🍃",
        SQLite: "🔋",
        Firebase: "🔥",
        Redis: "🔴",
        Oracle: "☁️",
        "SQL Server": "🔷",
      },
      level: {
        Student: "🧠",
        Trainee: "🌱",
        Junior: "🚀",
        Senior: "⭐",
        Master: "👑",
      },
    }

    return filterType in emojiMap && value in emojiMap[filterType] ? emojiMap[filterType][value] : ""
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#121214] text-white">
        <div className="text-2xl font-cinzel">Cargando DiceRyn...</div>
      </div>
    )
  }

  return (
    <PageLayout
      title="Generador de Ideas de Proyectos de Tecnología"
      description="Obtén ideas aleatorias para tu próximo proyecto de tecnología con un lanzamiento de dado."
    >
      {/* Filtros y controles */}
      <AnimatedSection className="w-full fantasy-card p-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-cinzel text-white">Filtros y Opciones</h2>

          {/* Buscador */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar ideas..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute -top-2 -right-2 z-10 text-lg">{getFilterEmoji("appType", appTypeFilter)}</div>
            <AppTypeFilter />
          </div>

          <div className="relative">
            <div className="absolute -top-2 -right-2 z-10 text-lg">{getFilterEmoji("language", languageFilter)}</div>
            <LanguageFilter />
          </div>

          <div className="relative">
            <div className="absolute -top-2 -right-2 z-10 text-lg">{getFilterEmoji("framework", frameworkFilter)}</div>
            <FrameworkFilter />
          </div>

          <div className="relative">
            <div className="absolute -top-2 -right-2 z-10 text-lg">{getFilterEmoji("database", databaseFilter)}</div>
            <DatabaseFilter />
          </div>

          <div className="relative">
            <div className="absolute -top-2 -right-2 z-10 text-lg">{getFilterEmoji("level", nivelFilter)}</div>
            <div className={getLevelColor(nivelFilter)}>
              <NivelFilter />
            </div>
          </div>

          <SortOptions />
        </div>
      </AnimatedSection>

      {/* Escena 3D del dado */}
      <AnimatedSection className="w-full h-[500px] relative fantasy-card p-4 mb-8" delay={0.2}>
        <TechDice isRolling={isRolling} setIsRolling={setIsRolling} onRollComplete={handleRollComplete} />
      </AnimatedSection>

      {/* Mensaje de no resultados o componente de ideas de proyecto */}
      <AnimatedSection delay={0.3}>
        {noResults ? (
          <NoResultsMessage onReset={resetFilters} />
        ) : (
          <ProjectIdeas selectedIdeaOverride={selectedIdeaIndex} />
        )}
      </AnimatedSection>

      {/* Botón para mostrar/ocultar roadmap */}
      <AnimatedSection className="w-full text-center mt-12 mb-6" delay={0.4}>
        <button
          onClick={() => setShowRoadmap(!showRoadmap)}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-md font-fondamento transition-all"
        >
          {showRoadmap ? "Ocultar Roadmap" : "Ver Roadmap de Aprendizaje"}
        </button>
      </AnimatedSection>

      {/* Roadmap */}
      {showRoadmap && (
        <AnimatedSection delay={0.1}>
          <Roadmap
            title="Roadmap de Desarrollo en Tecnología"
            description="Guía paso a paso para convertirte en un experto en desarrollo de software"
            steps={techRoadmapSteps}
            accentColor="purple"
          />
        </AnimatedSection>
      )}
    </PageLayout>
  )
}
