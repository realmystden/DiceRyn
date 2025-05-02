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

  // Estado para el color actual
  currentColor: string
}

// Colores para el tema de fantasía
const themeColors = [
  "linear-gradient(to bottom right, #2D0A31, #0A0A1A)", // Púrpura oscuro a azul oscuro
  "linear-gradient(to bottom right, #3A0D45, #0F0F1F)", // Púrpura a azul oscuro
  "linear-gradient(to bottom right, #4B1055, #141429)", // Púrpura medio a azul oscuro
  "linear-gradient(to bottom right, #5C1365, #19193D)", // Púrpura claro a azul medio
  "linear-gradient(to bottom right, #6D1675, #1E1E4F)", // Púrpura brillante a azul medio
  "linear-gradient(to bottom right, #2A0A0A, #0A0A1A)", // Rojo oscuro a azul oscuro
  "linear-gradient(to bottom right, #350D0D, #0F0F1F)", // Rojo a azul oscuro
  "linear-gradient(to bottom right, #401010, #141429)", // Rojo medio a azul oscuro
  "linear-gradient(to bottom right, #4B1313, #19193D)", // Rojo claro a azul medio
  "linear-gradient(to bottom right, #561616, #1E1E4F)", // Rojo brillante a azul medio
]

// Crear store
export const useProjectIdeasStore = create<ProjectIdeasStore>((set) => ({
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

  // Color actual
  currentColor: themeColors[0],
}))
