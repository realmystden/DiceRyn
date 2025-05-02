import { create } from "zustand"

// Definir tipos
type SortOption = "default" | "category" | "language" | "framework" | "database" | "nivel"

// Modificar el tipo de aplicación para que solo permita web, móvil o escritorio
type AppType = "Aplicación Web" | "Aplicación Móvil" | "Aplicación de Escritorio" | "Videojuego" | null

type NivelType = "Student" | "Trainee" | "Junior" | "Senior" | null

type ProjectIdeasStore = {
  // Estado para la idea seleccionada
  selectedIdea: number | null
  setSelectedIdea: (idea: number | null) => void

  // Estado para el filtro de tipo de aplicación
  appTypeFilter: AppType
  setAppTypeFilter: (appType: AppType) => void

  // Estado para ordenación
  sortOption: SortOption
  setSortOption: (option: SortOption) => void

  // Estado para el filtro de lenguaje
  languageFilter: string | null
  setLanguageFilter: (language: string | null) => void

  // Estado para el filtro de framework
  frameworkFilter: string | null
  setFrameworkFilter: (framework: string | null) => void

  // Estado para el filtro de base de datos
  databaseFilter: string | null
  setDatabaseFilter: (database: string | null) => void

  // Estado para el filtro de nivel
  nivelFilter: NivelType
  setNivelFilter: (nivel: NivelType) => void
}

// Función para verificar si estamos en el navegador
const isBrowser = typeof window !== "undefined"

// Crear store
export const useProjectIdeasStore = create<ProjectIdeasStore>()((set) => ({
  // Idea seleccionada
  selectedIdea: null,
  setSelectedIdea: (idea) => {
    set({ selectedIdea: idea })
  },

  // Filtro de tipo de aplicación
  appTypeFilter: "Aplicación Web",
  setAppTypeFilter: (appType) => set({ appTypeFilter: appType }),

  // Ordenación
  sortOption: "default",
  setSortOption: (option) => set({ sortOption: option }),

  // Filtro de lenguaje
  languageFilter: null,
  setLanguageFilter: (language) => set({ languageFilter: language }),

  // Filtro de framework
  frameworkFilter: null,
  setFrameworkFilter: (framework) => set({ frameworkFilter: framework }),

  // Filtro de base de datos
  databaseFilter: null,
  setDatabaseFilter: (database) => set({ databaseFilter: database }),

  // Filtro de nivel
  nivelFilter: null,
  setNivelFilter: (nivel) => set({ nivelFilter: nivel }),
}))
