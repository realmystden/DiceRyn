import { create } from "zustand"
import { persist } from "zustand/middleware"
import { projectIdeas } from "./project-ideas"

// Añadir nuevos tipos para los logros
export type AchievementLevel = "Student" | "Trainee" | "Junior" | "Senior" | "Master"

// Actualizar la interfaz Achievement para soportar logros de consistencia
export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  completed: false
  icon?: string
  requiredProjects?: number
  requiredLanguages?: string[]
  requiredFrameworks?: string[]
  requiredDatabases?: string[]
  requiredAppTypes?: string[]
  requiredLevelProjects?: { level: string; count: number }
  requiredStack?: string[]
  requiredTags?: string[]
  requiredCombination?: {
    languages?: string[]
    frameworks?: string[]
    frameworks2?: string[]
    databases?: string[]
    count: number
  }
  // Nuevos campos para logros de consistencia
  requiredConsistency?: {
    type: "daily" | "weekly" | "monthly" | "streak" | "sameDay" | "timeOfDay" | "dayOfWeek"
    count: number
    period?: number // Para períodos específicos (días, semanas, etc.)
    dayType?: "weekday" | "weekend" // Para días específicos
    timeRange?: "morning" | "afternoon" | "evening" | "night" // Para horarios específicos
  }
}

export interface CompletedProject {
  id: number
  completedAt: number // Timestamp de cuando se completó el proyecto
  title: string
  level: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
}

interface ProjectIdeasStore {
  // Filtros
  appTypeFilter: string | null
  setAppTypeFilter: (filter: string | null) => void

  languageFilter: string | null
  setLanguageFilter: (filter: string | null) => void

  frameworkFilter: string | null
  setFrameworkFilter: (filter: string | null) => void

  databaseFilter: string | null
  setDatabaseFilter: (filter: string | null) => void

  nivelFilter: string | null
  setNivelFilter: (filter: string | null) => void

  sortOption: string
  setSortOption: (option: string) => void

  // Ideas seleccionadas
  selectedIdea: number | null
  setSelectedIdea: (index: number | null) => void

  // Easter Egg
  easterEggActivated: boolean
  setEasterEggActivated: (activated: boolean) => void

  // Sistema de logros
  completedProjects: CompletedProject[]
  markProjectAsCompleted: (projectId: number) => void
  unmarkProjectAsCompleted: (projectId: number) => void
  isProjectCompleted: (projectId: number) => boolean

  // Estadísticas de progreso
  getCompletedProjectsByLevel: (level: string) => number
  getCompletedProjectsByLanguage: (language: string) => number
  getCompletedProjectsByFramework: (framework: string) => number
  getTotalCompletedProjects: () => number
  getCurrentLevel: () => AchievementLevel
  getLevelProgress: () => number

  // Logros
  achievements: Achievement[]
  unlockAchievement: (achievementId: string) => void
  getUnlockedAchievements: () => Achievement[]

  // Estadísticas de progreso adicionales
  getCompletedProjectsByDatabase: (database: string) => number
  getCompletedProjectsByAppType: (appType: string) => number

  // Nuevas funciones para verificar consistencia
  getConsecutiveDaysStreak: () => number
  getWeeklyCompletionCount: (weeks?: number) => number
  getMonthlyCompletionCount: (months?: number) => number
  getProjectsCompletedSameDay: (maxHours?: number) => number
  getProjectsByTimeOfDay: (timeRange: "morning" | "afternoon" | "evening" | "night") => number
  getProjectsByDayType: (dayType: "weekday" | "weekend") => number

  checkAndUnlockAchievements: () => void

  // Add this function to the store to check if all achievements are completed
  checkAllAchievementsCompleted: () => void
}

// Actualizar la lista de logros predeterminados con logros de consistencia
const defaultAchievements: Achievement[] = [
  // Logros existentes
  {
    id: "first-project",
    title: "Primer Paso",
    description: "Completa tu primer proyecto",
    level: "Student",
    completed: false,
    icon: "🏆",
    requiredProjects: 1,
  },
  {
    id: "student-graduate",
    title: "Graduado",
    description: "Completa 5 proyectos de nivel Student",
    level: "Student",
    completed: false,
    icon: "🎓",
    requiredProjects: 5,
  },
  {
    id: "trainee-ready",
    title: "Aprendiz",
    description: "Completa 10 proyectos, incluyendo al menos 3 de nivel Trainee",
    level: "Trainee",
    completed: false,
    icon: "🌱",
    requiredProjects: 10,
  },
  {
    id: "javascript-enthusiast",
    title: "Entusiasta de JavaScript",
    description: "Completa 5 proyectos usando JavaScript",
    level: "Trainee",
    completed: false,
    icon: "📜",
    requiredLanguages: ["JavaScript"],
  },
  {
    id: "python-explorer",
    title: "Explorador de Python",
    description: "Completa 5 proyectos usando Python",
    level: "Trainee",
    completed: false,
    icon: "🐍",
    requiredLanguages: ["Python"],
  },
  {
    id: "junior-developer",
    title: "Desarrollador Junior",
    description: "Completa 15 proyectos, incluyendo al menos 5 de nivel Junior",
    level: "Junior",
    completed: false,
    icon: "💻",
    requiredProjects: 15,
  },
  {
    id: "framework-master",
    title: "Maestro de Frameworks",
    description: "Completa proyectos usando al menos 5 frameworks diferentes",
    level: "Junior",
    completed: false,
    icon: "🛠️",
  },
  {
    id: "senior-developer",
    title: "Desarrollador Senior",
    description: "Completa 25 proyectos, incluyendo al menos 8 de nivel Senior",
    level: "Senior",
    completed: false,
    icon: "🚀",
    requiredProjects: 25,
  },
  {
    id: "polyglot",
    title: "Políglota",
    description: "Completa proyectos en al menos 6 lenguajes de programación diferentes",
    level: "Senior",
    completed: false,
    icon: "🌐",
  },
  {
    id: "master-developer",
    title: "Maestro Desarrollador",
    description: "Completa 50 proyectos de todos los niveles",
    level: "Master",
    completed: false,
    icon: "👑",
    requiredProjects: 50,
  },
  {
    id: "easter-egg-hunter",
    title: "Cazador de Easter Eggs",
    description: "Descubre un easter egg oculto",
    level: "Student",
    completed: false,
    icon: "🥚",
  },

  // NUEVOS LOGROS - LENGUAJES DE PROGRAMACIÓN

  // JavaScript y derivados
  {
    id: "javascript-ninja",
    title: "Ninja de JavaScript",
    description: "Completa 10 proyectos usando JavaScript",
    level: "Junior",
    completed: false,
    icon: "🥷",
    requiredLanguages: ["JavaScript"],
  },
  {
    id: "typescript-convert",
    title: "Converso a TypeScript",
    description: "Completa 5 proyectos usando TypeScript",
    level: "Junior",
    completed: false,
    icon: "📘",
    requiredLanguages: ["TypeScript"],
  },
  {
    id: "typescript-wizard",
    title: "Mago de TypeScript",
    description: "Completa 10 proyectos usando TypeScript",
    level: "Senior",
    completed: false,
    icon: "🧙",
    requiredLanguages: ["TypeScript"],
  },
  {
    id: "node-apprentice",
    title: "Aprendiz de Node.js",
    description: "Completa 5 proyectos usando Node.js",
    level: "Trainee",
    completed: false,
    icon: "🟢",
    requiredLanguages: ["Node.js"],
  },
  {
    id: "node-master",
    title: "Maestro de Node.js",
    description: "Completa 10 proyectos usando Node.js",
    level: "Senior",
    completed: false,
    icon: "⚙️",
    requiredLanguages: ["Node.js"],
  },

  // Python
  {
    id: "python-master",
    title: "Maestro de Python",
    description: "Completa 10 proyectos usando Python",
    level: "Junior",
    completed: false,
    icon: "🐉",
    requiredLanguages: ["Python"],
  },
  {
    id: "data-scientist",
    title: "Científico de Datos",
    description: "Completa 5 proyectos de ciencia de datos con Python",
    level: "Senior",
    completed: false,
    icon: "📊",
    requiredLanguages: ["Python"],
  },

  // Java
  {
    id: "java-apprentice",
    title: "Aprendiz de Java",
    description: "Completa 5 proyectos usando Java",
    level: "Trainee",
    completed: false,
    icon: "☕",
    requiredLanguages: ["Java"],
  },
  {
    id: "java-architect",
    title: "Arquitecto Java",
    description: "Completa 10 proyectos usando Java",
    level: "Senior",
    completed: false,
    icon: "🏛️",
    requiredLanguages: ["Java"],
  },

  // C#
  {
    id: "csharp-developer",
    title: "Desarrollador C#",
    description: "Completa 5 proyectos usando C#",
    level: "Junior",
    completed: false,
    icon: "🎮",
    requiredLanguages: ["C#"],
  },
  {
    id: "dotnet-expert",
    title: "Experto en .NET",
    description: "Completa 10 proyectos usando C# y .NET",
    level: "Senior",
    completed: false,
    icon: "🔷",
    requiredLanguages: ["C#"],
  },

  // PHP
  {
    id: "php-developer",
    title: "Desarrollador PHP",
    description: "Completa 5 proyectos usando PHP",
    level: "Trainee",
    completed: false,
    icon: "🐘",
    requiredLanguages: ["PHP"],
  },
  {
    id: "php-guru",
    title: "Gurú de PHP",
    description: "Completa 10 proyectos usando PHP",
    level: "Junior",
    completed: false,
    icon: "🧘",
    requiredLanguages: ["PHP"],
  },

  // Ruby
  {
    id: "ruby-enthusiast",
    title: "Entusiasta de Ruby",
    description: "Completa 5 proyectos usando Ruby",
    level: "Junior",
    completed: false,
    icon: "💎",
    requiredLanguages: ["Ruby"],
  },

  // Go
  {
    id: "golang-explorer",
    title: "Explorador de Go",
    description: "Completa 5 proyectos usando Go",
    level: "Junior",
    completed: false,
    icon: "🐹",
    requiredLanguages: ["Go"],
  },
  {
    id: "golang-pioneer",
    title: "Pionero de Go",
    description: "Completa 10 proyectos usando Go",
    level: "Senior",
    completed: false,
    icon: "🚶",
    requiredLanguages: ["Go"],
  },

  // Rust
  {
    id: "rust-explorer",
    title: "Explorador de Rust",
    description: "Completa 3 proyectos usando Rust",
    level: "Junior",
    completed: false,
    icon: "🦀",
    requiredLanguages: ["Rust"],
  },
  {
    id: "rust-innovator",
    title: "Innovador de Rust",
    description: "Completa 7 proyectos usando Rust",
    level: "Senior",
    completed: false,
    icon: "⚓",
    requiredLanguages: ["Rust"],
  },

  // Swift
  {
    id: "swift-developer",
    title: "Desarrollador Swift",
    description: "Completa 5 proyectos usando Swift",
    level: "Junior",
    completed: false,
    icon: "🐦",
    requiredLanguages: ["Swift"],
  },

  // Kotlin
  {
    id: "kotlin-enthusiast",
    title: "Entusiasta de Kotlin",
    description: "Completa 5 proyectos usando Kotlin",
    level: "Junior",
    completed: false,
    icon: "🏔️",
    requiredLanguages: ["Kotlin"],
  },

  // Dart
  {
    id: "dart-developer",
    title: "Desarrollador Dart",
    description: "Completa 5 proyectos usando Dart",
    level: "Junior",
    completed: false,
    icon: "🎯",
    requiredLanguages: ["Dart"],
  },

  // Lenguajes especiales
  {
    id: "functional-programmer",
    title: "Programador Funcional",
    description: "Completa proyectos en Haskell, Elixir o Clojure",
    level: "Senior",
    completed: false,
    icon: "λ",
    requiredLanguages: ["Haskell", "Elixir", "Clojure"],
  },
  {
    id: "assembly-wizard",
    title: "Mago del Ensamblador",
    description: "Completa un proyecto usando Assembly",
    level: "Master",
    completed: false,
    icon: "⚙️",
    requiredLanguages: ["Assembly"],
  },
  {
    id: "brainfuck-master",
    title: "Maestro de Brainfuck",
    description: "Completa un proyecto usando Brainfuck",
    level: "Master",
    completed: false,
    icon: "🧠",
    requiredLanguages: ["Brainfuck"],
  },

  // NUEVOS LOGROS - FRAMEWORKS

  // React
  {
    id: "react-apprentice",
    title: "Aprendiz de React",
    description: "Completa 5 proyectos usando React",
    level: "Trainee",
    completed: false,
    icon: "⚛️",
    requiredFrameworks: ["React"],
  },
  {
    id: "react-architect",
    title: "Arquitecto React",
    description: "Completa 10 proyectos usando React",
    level: "Junior",
    completed: false,
    icon: "🏗️",
    requiredFrameworks: ["React"],
  },
  {
    id: "react-native-explorer",
    title: "Explorador de React Native",
    description: "Completa 5 proyectos usando React Native",
    level: "Junior",
    completed: false,
    icon: "📱",
    requiredFrameworks: ["React Native"],
  },

  // Angular
  {
    id: "angular-developer",
    title: "Desarrollador Angular",
    description: "Completa 5 proyectos usando Angular",
    level: "Junior",
    completed: false,
    icon: "🅰️",
    requiredFrameworks: ["Angular"],
  },
  {
    id: "angular-expert",
    title: "Experto en Angular",
    description: "Completa 10 proyectos usando Angular",
    level: "Senior",
    completed: false,
    icon: "📐",
    requiredFrameworks: ["Angular"],
  },

  // Vue
  {
    id: "vue-enthusiast",
    title: "Entusiasta de Vue",
    description: "Completa 5 proyectos usando Vue",
    level: "Trainee",
    completed: false,
    icon: "🟢",
    requiredFrameworks: ["Vue"],
  },
  {
    id: "vue-master",
    title: "Maestro de Vue",
    description: "Completa 10 proyectos usando Vue",
    level: "Junior",
    completed: false,
    icon: "👁️",
    requiredFrameworks: ["Vue"],
  },

  // Next.js
  {
    id: "nextjs-explorer",
    title: "Explorador de Next.js",
    description: "Completa 5 proyectos usando Next.js",
    level: "Junior",
    completed: false,
    icon: "▲",
    requiredFrameworks: ["Next.js"],
  },
  {
    id: "nextjs-architect",
    title: "Arquitecto Next.js",
    description: "Completa 10 proyectos usando Next.js",
    level: "Senior",
    completed: false,
    icon: "🔼",
    requiredFrameworks: ["Next.js"],
  },

  // Django
  {
    id: "django-developer",
    title: "Desarrollador Django",
    description: "Completa 5 proyectos usando Django",
    level: "Junior",
    completed: false,
    icon: "🦄",
    requiredFrameworks: ["Django"],
  },

  // Flask
  {
    id: "flask-developer",
    title: "Desarrollador Flask",
    description: "Completa 5 proyectos usando Flask",
    level: "Trainee",
    completed: false,
    icon: "🧪",
    requiredFrameworks: ["Flask"],
  },

  // Spring
  {
    id: "spring-developer",
    title: "Desarrollador Spring",
    description: "Completa 5 proyectos usando Spring",
    level: "Junior",
    completed: false,
    icon: "🌱",
    requiredFrameworks: ["Spring"],
  },
  {
    id: "spring-expert",
    title: "Experto en Spring",
    description: "Completa 10 proyectos usando Spring",
    level: "Senior",
    completed: false,
    icon: "🌺",
    requiredFrameworks: ["Spring"],
  },

  // Laravel
  {
    id: "laravel-developer",
    title: "Desarrollador Laravel",
    description: "Completa 5 proyectos usando Laravel",
    level: "Junior",
    completed: false,
    icon: "🔺",
    requiredFrameworks: ["Laravel"],
  },

  // Express
  {
    id: "express-developer",
    title: "Desarrollador Express",
    description: "Completa 5 proyectos usando Express",
    level: "Trainee",
    completed: false,
    icon: "🚂",
    requiredFrameworks: ["Express"],
  },
  {
    id: "express-architect",
    title: "Arquitecto Express",
    description: "Completa 10 proyectos usando Express",
    level: "Junior",
    completed: false,
    icon: "🚄",
    requiredFrameworks: ["Express"],
  },

  // Flutter
  {
    id: "flutter-developer",
    title: "Desarrollador Flutter",
    description: "Completa 5 proyectos usando Flutter",
    level: "Junior",
    completed: false,
    icon: "🦋",
    requiredFrameworks: ["Flutter"],
  },
  {
    id: "flutter-expert",
    title: "Experto en Flutter",
    description: "Completa 10 proyectos usando Flutter",
    level: "Senior",
    completed: false,
    icon: "✨",
    requiredFrameworks: ["Flutter"],
  },

  // NUEVOS LOGROS - BASES DE DATOS

  // SQL
  {
    id: "sql-apprentice",
    title: "Aprendiz de SQL",
    description: "Completa 5 proyectos usando bases de datos SQL",
    level: "Trainee",
    completed: false,
    icon: "📊",
    requiredDatabases: ["MySQL", "PostgreSQL", "SQLite", "SQL Server"],
  },
  {
    id: "sql-master",
    title: "Maestro de SQL",
    description: "Completa 10 proyectos usando bases de datos SQL",
    level: "Junior",
    completed: false,
    icon: "📈",
    requiredDatabases: ["MySQL", "PostgreSQL", "SQLite", "SQL Server"],
  },

  // NoSQL
  {
    id: "nosql-explorer",
    title: "Explorador NoSQL",
    description: "Completa 5 proyectos usando bases de datos NoSQL",
    level: "Junior",
    completed: false,
    icon: "🧩",
    requiredDatabases: ["MongoDB", "Firebase", "DynamoDB", "Cassandra"],
  },
  {
    id: "nosql-architect",
    title: "Arquitecto NoSQL",
    description: "Completa 10 proyectos usando bases de datos NoSQL",
    level: "Senior",
    completed: false,
    icon: "🏛️",
    requiredDatabases: ["MongoDB", "Firebase", "DynamoDB", "Cassandra"],
  },

  // Específicas
  {
    id: "mongodb-developer",
    title: "Desarrollador MongoDB",
    description: "Completa 5 proyectos usando MongoDB",
    level: "Junior",
    completed: false,
    icon: "🍃",
    requiredDatabases: ["MongoDB"],
  },
  {
    id: "postgres-developer",
    title: "Desarrollador PostgreSQL",
    description: "Completa 5 proyectos usando PostgreSQL",
    level: "Junior",
    completed: false,
    icon: "🐘",
    requiredDatabases: ["PostgreSQL"],
  },
  {
    id: "firebase-developer",
    title: "Desarrollador Firebase",
    description: "Completa 5 proyectos usando Firebase",
    level: "Trainee",
    completed: false,
    icon: "🔥",
    requiredDatabases: ["Firebase"],
  },

  // NUEVOS LOGROS - TIPOS DE APLICACIONES

  // Web
  {
    id: "frontend-developer",
    title: "Desarrollador Frontend",
    description: "Completa 10 proyectos de frontend",
    level: "Junior",
    completed: false,
    icon: "🖥️",
    requiredAppTypes: ["Frontend"],
  },
  {
    id: "backend-developer",
    title: "Desarrollador Backend",
    description: "Completa 10 proyectos de backend",
    level: "Junior",
    completed: false,
    icon: "⚙️",
    requiredAppTypes: ["Backend"],
  },
  {
    id: "fullstack-developer",
    title: "Desarrollador Fullstack",
    description: "Completa 10 proyectos fullstack",
    level: "Senior",
    completed: false,
    icon: "🧰",
    requiredAppTypes: ["Fullstack"],
  },

  // Mobile
  {
    id: "mobile-developer",
    title: "Desarrollador Mobile",
    description: "Completa 10 proyectos de aplicaciones móviles",
    level: "Junior",
    completed: false,
    icon: "📱",
    requiredAppTypes: ["Mobile"],
  },
  {
    id: "cross-platform-developer",
    title: "Desarrollador Multiplataforma",
    description: "Completa proyectos para Android e iOS",
    level: "Senior",
    completed: false,
    icon: "🔄",
    requiredAppTypes: ["Mobile"],
  },

  // Desktop
  {
    id: "desktop-developer",
    title: "Desarrollador Desktop",
    description: "Completa 5 proyectos de aplicaciones de escritorio",
    level: "Junior",
    completed: false,
    icon: "🖥️",
    requiredAppTypes: ["Desktop"],
  },

  // Juegos
  {
    id: "game-developer-apprentice",
    title: "Aprendiz de Desarrollo de Juegos",
    description: "Completa 5 proyectos de juegos",
    level: "Trainee",
    completed: false,
    icon: "🎮",
    requiredAppTypes: ["Game"],
  },
  {
    id: "game-developer",
    title: "Desarrollador de Juegos",
    description: "Completa 10 proyectos de juegos",
    level: "Junior",
    completed: false,
    icon: "🎯",
    requiredAppTypes: ["Game"],
  },

  // IA/ML
  {
    id: "ai-explorer",
    title: "Explorador de IA",
    description: "Completa 5 proyectos de inteligencia artificial",
    level: "Junior",
    completed: false,
    icon: "🤖",
    requiredAppTypes: ["AI/ML"],
  },
  {
    id: "ai-researcher",
    title: "Investigador de IA",
    description: "Completa 10 proyectos de inteligencia artificial",
    level: "Senior",
    completed: false,
    icon: "🧠",
    requiredAppTypes: ["AI/ML"],
  },

  // DevOps
  {
    id: "devops-engineer",
    title: "Ingeniero DevOps",
    description: "Completa 5 proyectos de DevOps",
    level: "Junior",
    completed: false,
    icon: "🔄",
    requiredAppTypes: ["DevOps"],
  },
  {
    id: "cloud-architect",
    title: "Arquitecto Cloud",
    description: "Completa 10 proyectos de cloud computing",
    level: "Senior",
    completed: false,
    icon: "☁️",
    requiredAppTypes: ["Cloud"],
  },

  // NUEVOS LOGROS - COMBINACIONES Y ESPECIALES

  // MERN Stack
  {
    id: "mern-developer",
    title: "Desarrollador MERN Stack",
    description: "Completa 5 proyectos usando MongoDB, Express, React y Node.js",
    level: "Junior",
    completed: false,
    icon: "📚",
    requiredStack: ["MongoDB", "Express", "React", "Node.js"],
  },

  // MEAN Stack
  {
    id: "mean-developer",
    title: "Desarrollador MEAN Stack",
    description: "Completa 5 proyectos usando MongoDB, Express, Angular y Node.js",
    level: "Junior",
    completed: false,
    icon: "📚",
    requiredStack: ["MongoDB", "Express", "Angular", "Node.js"],
  },

  // LAMP Stack
  {
    id: "lamp-developer",
    title: "Desarrollador LAMP Stack",
    description: "Completa 5 proyectos usando Linux, Apache, MySQL y PHP",
    level: "Junior",
    completed: false,
    icon: "💡",
    requiredStack: ["Linux", "Apache", "MySQL", "PHP"],
  },

  // JAMstack
  {
    id: "jamstack-developer",
    title: "Desarrollador JAMstack",
    description: "Completa 5 proyectos usando JavaScript, APIs y Markup",
    level: "Junior",
    completed: false,
    icon: "🍓",
    requiredStack: ["JavaScript", "API", "Markup"],
  },

  // Logros por cantidad
  {
    id: "project-collector-i",
    title: "Coleccionista de Proyectos I",
    description: "Completa 25 proyectos",
    level: "Junior",
    completed: false,
    icon: "🏆",
    requiredProjects: 25,
  },
  {
    id: "project-collector-ii",
    title: "Coleccionista de Proyectos II",
    description: "Completa 50 proyectos",
    level: "Senior",
    completed: false,
    icon: "🏆🏆",
    requiredProjects: 50,
  },
  {
    id: "project-collector-iii",
    title: "Coleccionista de Proyectos III",
    description: "Completa 100 proyectos",
    level: "Master",
    completed: false,
    icon: "🏆🏆🏆",
    requiredProjects: 100,
  },

  // Logros por dificultad
  {
    id: "student-master",
    title: "Maestro Estudiante",
    description: "Completa 20 proyectos de nivel Student",
    level: "Trainee",
    completed: false,
    icon: "📚",
    requiredLevelProjects: { level: "Student", count: 20 },
  },
  {
    id: "trainee-master",
    title: "Maestro Aprendiz",
    description: "Completa 20 proyectos de nivel Trainee",
    level: "Junior",
    completed: false,
    icon: "🌱",
    requiredLevelProjects: { level: "Trainee", count: 20 },
  },
  {
    id: "junior-master",
    title: "Maestro Junior",
    description: "Completa 20 proyectos de nivel Junior",
    level: "Senior",
    completed: false,
    icon: "💼",
    requiredLevelProjects: { level: "Junior", count: 20 },
  },
  {
    id: "senior-master",
    title: "Maestro Senior",
    description: "Completa 20 proyectos de nivel Senior",
    level: "Master",
    completed: false,
    icon: "🏅",
    requiredLevelProjects: { level: "Senior", count: 20 },
  },

  // Logros especiales
  {
    id: "language-collector",
    title: "Coleccionista de Lenguajes",
    description: "Completa proyectos en 10 lenguajes diferentes",
    level: "Master",
    completed: false,
    icon: "🌍",
  },
  {
    id: "framework-collector",
    title: "Coleccionista de Frameworks",
    description: "Completa proyectos con 10 frameworks diferentes",
    level: "Master",
    completed: false,
    icon: "🧩",
  },
  {
    id: "database-collector",
    title: "Coleccionista de Bases de Datos",
    description: "Completa proyectos con 5 bases de datos diferentes",
    level: "Senior",
    completed: false,
    icon: "💾",
  },
  {
    id: "jack-of-all-trades",
    title: "Todólogo",
    description: "Completa proyectos de todos los tipos de aplicaciones",
    level: "Master",
    completed: false,
    icon: "🃏",
  },
  {
    id: "speed-coder",
    title: "Programador Veloz",
    description: "Completa 5 proyectos en una semana",
    level: "Junior",
    completed: false,
    icon: "⚡",
  },
  {
    id: "consistent-coder",
    title: "Programador Constante",
    description: "Completa proyectos durante 5 días consecutivos",
    level: "Trainee",
    completed: false,
    icon: "📆",
  },
  {
    id: "weekend-warrior",
    title: "Guerrero de Fin de Semana",
    description: "Completa 3 proyectos durante un fin de semana",
    level: "Junior",
    completed: false,
    icon: "🏋️",
  },
  {
    id: "night-owl",
    title: "Búho Nocturno",
    description: "Completa un proyecto después de la medianoche",
    level: "Student",
    completed: false,
    icon: "🦉",
  },
  {
    id: "early-bird",
    title: "Madrugador",
    description: "Completa un proyecto antes de las 7 AM",
    level: "Student",
    completed: false,
    icon: "🐦",
  },

  // Logros temáticos
  {
    id: "blockchain-pioneer",
    title: "Pionero de Blockchain",
    description: "Completa 3 proyectos relacionados con blockchain",
    level: "Senior",
    completed: false,
    icon: "⛓️",
    requiredTags: ["blockchain"],
  },
  {
    id: "web3-explorer",
    title: "Explorador de Web3",
    description: "Completa 5 proyectos relacionados con Web3",
    level: "Senior",
    completed: false,
    icon: "🌐",
    requiredTags: ["web3"],
  },
  {
    id: "iot-innovator",
    title: "Innovador de IoT",
    description: "Completa 3 proyectos de Internet de las Cosas",
    level: "Junior",
    completed: false,
    icon: "🔌",
    requiredTags: ["iot"],
  },
  {
    id: "ar-vr-explorer",
    title: "Explorador de AR/VR",
    description: "Completa 3 proyectos de Realidad Aumentada o Virtual",
    level: "Junior",
    completed: false,
    icon: "👓",
    requiredTags: ["ar", "vr"],
  },
  {
    id: "cybersecurity-specialist",
    title: "Especialista en Ciberseguridad",
    description: "Completa 5 proyectos relacionados con seguridad informática",
    level: "Senior",
    completed: false,
    icon: "🔒",
    requiredTags: ["security", "cybersecurity"],
  },
  {
    id: "embedded-systems-engineer",
    title: "Ingeniero de Sistemas Embebidos",
    description: "Completa 3 proyectos de sistemas embebidos",
    level: "Senior",
    completed: false,
    icon: "🔧",
    requiredTags: ["embedded"],
  },
  {
    id: "quantum-computing-pioneer",
    title: "Pionero de Computación Cuántica",
    description: "Completa un proyecto relacionado con computación cuántica",
    level: "Master",
    completed: false,
    icon: "⚛️",
    requiredTags: ["quantum"],
  },

  // NUEVOS LOGROS - COMBINACIONES ESPECÍFICAS DE TECNOLOGÍAS

  // Combinaciones Frontend + Backend
  {
    id: "react-node-specialist",
    title: "Especialista React + Node",
    description: "Completa 5 proyectos usando React y Node.js juntos",
    level: "Junior",
    completed: false,
    icon: "⚛️🟢",
    requiredCombination: {
      frameworks: ["React"],
      languages: ["Node.js"],
      count: 5,
    },
  },
  {
    id: "vue-express-specialist",
    title: "Especialista Vue + Express",
    description: "Completa 5 proyectos usando Vue y Express juntos",
    level: "Junior",
    completed: false,
    icon: "🟢🚂",
    requiredCombination: {
      frameworks: ["Vue"],
      frameworks2: ["Express"],
      count: 5,
    },
  },
  {
    id: "angular-spring-specialist",
    title: "Especialista Angular + Spring",
    description: "Completa 5 proyectos usando Angular y Spring juntos",
    level: "Senior",
    completed: false,
    icon: "🅰️🌱",
    requiredCombination: {
      frameworks: ["Angular"],
      frameworks2: ["Spring"],
      count: 5,
    },
  },
  {
    id: "react-django-specialist",
    title: "Especialista React + Django",
    description: "Completa 5 proyectos usando React y Django juntos",
    level: "Junior",
    completed: false,
    icon: "⚛️🦄",
    requiredCombination: {
      frameworks: ["React"],
      frameworks2: ["Django"],
      count: 5,
    },
  },

  // Combinaciones con bases de datos específicas
  {
    id: "react-mongodb-specialist",
    title: "Especialista React + MongoDB",
    description: "Completa 5 proyectos usando React y MongoDB juntos",
    level: "Junior",
    completed: false,
    icon: "⚛️🍃",
    requiredCombination: {
      frameworks: ["React"],
      databases: ["MongoDB"],
      count: 5,
    },
  },
  {
    id: "node-postgres-specialist",
    title: "Especialista Node + PostgreSQL",
    description: "Completa 5 proyectos usando Node.js y PostgreSQL juntos",
    level: "Junior",
    completed: false,
    icon: "🟢🐘",
    requiredCombination: {
      languages: ["Node.js"],
      databases: ["PostgreSQL"],
      count: 5,
    },
  },
  {
    id: "django-postgres-specialist",
    title: "Especialista Django + PostgreSQL",
    description: "Completa 5 proyectos usando Django y PostgreSQL juntos",
    level: "Junior",
    completed: false,
    icon: "🦄🐘",
    requiredCombination: {
      frameworks: ["Django"],
      databases: ["PostgreSQL"],
      count: 5,
    },
  },
  {
    id: "laravel-mysql-specialist",
    title: "Especialista Laravel + MySQL",
    description: "Completa 5 proyectos usando Laravel y MySQL juntos",
    level: "Junior",
    completed: false,
    icon: "🔺🐬",
    requiredCombination: {
      frameworks: ["Laravel"],
      databases: ["MySQL"],
      count: 5,
    },
  },

  // Combinaciones para desarrollo móvil
  {
    id: "react-native-firebase-specialist",
    title: "Especialista React Native + Firebase",
    description: "Completa 5 proyectos usando React Native y Firebase juntos",
    level: "Junior",
    completed: false,
    icon: "📱🔥",
    requiredCombination: {
      frameworks: ["React Native"],
      databases: ["Firebase"],
      count: 5,
    },
  },
  {
    id: "flutter-firebase-specialist",
    title: "Especialista Flutter + Firebase",
    description: "Completa 5 proyectos usando Flutter y Firebase juntos",
    level: "Junior",
    completed: false,
    icon: "🦋🔥",
    requiredCombination: {
      frameworks: ["Flutter"],
      databases: ["Firebase"],
      count: 5,
    },
  },
  {
    id: "swift-coredata-specialist",
    title: "Especialista Swift + CoreData",
    description: "Completa 5 proyectos usando Swift y CoreData juntos",
    level: "Junior",
    completed: false,
    icon: "🐦💾",
    requiredCombination: {
      languages: ["Swift"],
      databases: ["CoreData"],
      count: 5,
    },
  },
  {
    id: "kotlin-room-specialist",
    title: "Especialista Kotlin + Room",
    description: "Completa 5 proyectos usando Kotlin y Room Database juntos",
    level: "Junior",
    completed: false,
    icon: "🏔️🏠",
    requiredCombination: {
      languages: ["Kotlin"],
      databases: ["Room"],
      count: 5,
    },
  },

  // Combinaciones para desarrollo de juegos
  {
    id: "unity-csharp-specialist",
    title: "Especialista Unity + C#",
    description: "Completa 5 proyectos usando Unity y C# juntos",
    level: "Junior",
    completed: false,
    icon: "🎮🎯",
    requiredCombination: {
      frameworks: ["Unity"],
      languages: ["C#"],
      count: 5,
    },
  },
  {
    id: "unreal-cpp-specialist",
    title: "Especialista Unreal + C++",
    description: "Completa 5 proyectos usando Unreal Engine y C++ juntos",
    level: "Senior",
    completed: false,
    icon: "🎮⚡",
    requiredCombination: {
      frameworks: ["Unreal Engine"],
      languages: ["C++"],
      count: 5,
    },
  },
  {
    id: "godot-gdscript-specialist",
    title: "Especialista Godot + GDScript",
    description: "Completa 5 proyectos usando Godot y GDScript juntos",
    level: "Junior",
    completed: false,
    icon: "🎲📜",
    requiredCombination: {
      frameworks: ["Godot"],
      languages: ["GDScript"],
      count: 5,
    },
  },
  {
    id: "phaser-javascript-specialist",
    title: "Especialista Phaser + JavaScript",
    description: "Completa 5 proyectos usando Phaser y JavaScript juntos",
    level: "Junior",
    completed: false,
    icon: "🎮📜",
    requiredCombination: {
      frameworks: ["Phaser"],
      languages: ["JavaScript"],
      count: 5,
    },
  },

  // Combinaciones para IA/ML
  {
    id: "python-tensorflow-specialist",
    title: "Especialista Python + TensorFlow",
    description: "Completa 5 proyectos usando Python y TensorFlow juntos",
    level: "Senior",
    completed: false,
    icon: "🐍🧠",
    requiredCombination: {
      languages: ["Python"],
      frameworks: ["TensorFlow"],
      count: 5,
    },
  },
  {
    id: "python-pytorch-specialist",
    title: "Especialista Python + PyTorch",
    description: "Completa 5 proyectos usando Python y PyTorch juntos",
    level: "Senior",
    completed: false,
    icon: "🐍🔥",
    requiredCombination: {
      languages: ["Python"],
      frameworks: ["PyTorch"],
      count: 5,
    },
  },
  {
    id: "python-scikit-specialist",
    title: "Especialista Python + Scikit-learn",
    description: "Completa 5 proyectos usando Python y Scikit-learn juntos",
    level: "Junior",
    completed: false,
    icon: "🐍🧪",
    requiredCombination: {
      languages: ["Python"],
      frameworks: ["Scikit-learn"],
      count: 5,
    },
  },
  {
    id: "r-tidyverse-specialist",
    title: "Especialista R + Tidyverse",
    description: "Completa 5 proyectos usando R y Tidyverse juntos",
    level: "Junior",
    completed: false,
    icon: "📊📈",
    requiredCombination: {
      languages: ["R"],
      frameworks: ["Tidyverse"],
      count: 5,
    },
  },

  // Combinaciones para DevOps y Cloud
  {
    id: "docker-kubernetes-specialist",
    title: "Especialista Docker + Kubernetes",
    description: "Completa 5 proyectos usando Docker y Kubernetes juntos",
    level: "Senior",
    completed: false,
    icon: "🐳☸️",
    requiredCombination: {
      frameworks: ["Docker"],
      frameworks2: ["Kubernetes"],
      count: 5,
    },
  },
  {
    id: "aws-terraform-specialist",
    title: "Especialista AWS + Terraform",
    description: "Completa 5 proyectos usando AWS y Terraform juntos",
    level: "Senior",
    completed: false,
    icon: "☁️🏗️",
    requiredCombination: {
      frameworks: ["AWS"],
      frameworks2: ["Terraform"],
      count: 5,
    },
  },
  {
    id: "azure-dotnet-specialist",
    title: "Especialista Azure + .NET",
    description: "Completa 5 proyectos usando Azure y .NET juntos",
    level: "Senior",
    completed: false,
    icon: "☁️🔷",
    requiredCombination: {
      frameworks: ["Azure"],
      frameworks2: [".NET"],
      count: 5,
    },
  },
  {
    id: "gcp-golang-specialist",
    title: "Especialista GCP + Go",
    description: "Completa 5 proyectos usando Google Cloud Platform y Go juntos",
    level: "Senior",
    completed: false,
    icon: "☁️🐹",
    requiredCombination: {
      frameworks: ["GCP"],
      languages: ["Go"],
      count: 5,
    },
  },

  // Combinaciones emergentes y de nicho
  {
    id: "graphql-apollo-specialist",
    title: "Especialista GraphQL + Apollo",
    description: "Completa 5 proyectos usando GraphQL y Apollo juntos",
    level: "Junior",
    completed: false,
    icon: "📊🚀",
    requiredCombination: {
      frameworks: ["GraphQL"],
      frameworks2: ["Apollo"],
      count: 5,
    },
  },
  {
    id: "webassembly-rust-specialist",
    title: "Especialista WebAssembly + Rust",
    description: "Completa 3 proyectos usando WebAssembly y Rust juntos",
    level: "Senior",
    completed: false,
    icon: "🌐🦀",
    requiredCombination: {
      frameworks: ["WebAssembly"],
      languages: ["Rust"],
      count: 3,
    },
  },
  {
    id: "jamstack-gatsby-specialist",
    title: "Especialista JAMstack + Gatsby",
    description: "Completa 5 proyectos usando JAMstack y Gatsby juntos",
    level: "Junior",
    completed: false,
    icon: "🍓🚀",
    requiredCombination: {
      frameworks: ["JAMstack"],
      frameworks2: ["Gatsby"],
      count: 5,
    },
  },
  {
    id: "svelte-sapper-specialist",
    title: "Especialista Svelte + Sapper",
    description: "Completa 3 proyectos usando Svelte y Sapper juntos",
    level: "Junior",
    completed: false,
    icon: "🔄🧭",
    requiredCombination: {
      frameworks: ["Svelte"],
      frameworks2: ["Sapper"],
      count: 3,
    },
  },

  // Combinaciones de tres tecnologías (triples)
  {
    id: "fullstack-js-specialist",
    title: "Especialista Fullstack JavaScript",
    description: "Completa 5 proyectos usando React, Node.js y MongoDB juntos",
    level: "Senior",
    completed: false,
    icon: "⚛️🟢🍃",
    requiredCombination: {
      frameworks: ["React"],
      languages: ["Node.js"],
      databases: ["MongoDB"],
      count: 5,
    },
  },
  {
    id: "python-fullstack-specialist",
    title: "Especialista Fullstack Python",
    description: "Completa 5 proyectos usando Django, Python y PostgreSQL juntos",
    level: "Senior",
    completed: false,
    icon: "🦄🐍🐘",
    requiredCombination: {
      frameworks: ["Django"],
      languages: ["Python"],
      databases: ["PostgreSQL"],
      count: 5,
    },
  },
  {
    id: "java-enterprise-specialist",
    title: "Especialista Java Enterprise",
    description: "Completa 5 proyectos usando Spring, Java y Oracle juntos",
    level: "Senior",
    completed: false,
    icon: "🌱☕🏛️",
    requiredCombination: {
      frameworks: ["Spring"],
      languages: ["Java"],
      databases: ["Oracle"],
      count: 5,
    },
  },
  {
    id: "microsoft-stack-specialist",
    title: "Especialista Microsoft Stack",
    description: "Completa 5 proyectos usando .NET, C# y SQL Server juntos",
    level: "Senior",
    completed: false,
    icon: "🔷🎮💾",
    requiredCombination: {
      frameworks: [".NET"],
      languages: ["C#"],
      databases: ["SQL Server"],
      count: 5,
    },
  },

  // Combinaciones para desarrollo móvil avanzado
  {
    id: "ios-master-specialist",
    title: "Especialista Master iOS",
    description: "Completa 5 proyectos usando Swift, SwiftUI y CoreData juntos",
    level: "Senior",
    completed: false,
    icon: "🍎🐦💾",
    requiredCombination: {
      languages: ["Swift"],
      frameworks: ["SwiftUI"],
      databases: ["CoreData"],
      count: 5,
    },
  },
  {
    id: "android-master-specialist",
    title: "Especialista Master Android",
    description: "Completa 5 proyectos usando Kotlin, Jetpack Compose y Room juntos",
    level: "Senior",
    completed: false,
    icon: "🤖🏔️🏠",
    requiredCombination: {
      languages: ["Kotlin"],
      frameworks: ["Jetpack Compose"],
      databases: ["Room"],
      count: 5,
    },
  },

  // NUEVOS LOGROS DE CONSISTENCIA

  // Logros por días consecutivos (streaks)
  {
    id: "three-day-streak",
    title: "Racha de 3 Días",
    description: "Completa proyectos durante 3 días consecutivos",
    level: "Student",
    completed: false,
    icon: "🔥",
    requiredConsistency: {
      type: "streak",
      count: 3,
    },
  },
  {
    id: "week-streak",
    title: "Racha Semanal",
    description: "Completa proyectos durante 7 días consecutivos",
    level: "Trainee",
    completed: false,
    icon: "🔥🔥",
    requiredConsistency: {
      type: "streak",
      count: 7,
    },
  },
  {
    id: "two-week-streak",
    title: "Racha Quincenal",
    description: "Completa proyectos durante 14 días consecutivos",
    level: "Junior",
    completed: false,
    icon: "🔥🔥🔥",
    requiredConsistency: {
      type: "streak",
      count: 14,
    },
  },
  {
    id: "month-streak",
    title: "Racha Mensual",
    description: "Completa proyectos durante 30 días consecutivos",
    level: "Senior",
    completed: false,
    icon: "🔥🔥🔥🔥",
    requiredConsistency: {
      type: "streak",
      count: 30,
    },
  },
  {
    id: "coding-machine",
    title: "Máquina de Programación",
    description: "Completa proyectos durante 60 días consecutivos",
    level: "Master",
    completed: false,
    icon: "🤖🔥",
    requiredConsistency: {
      type: "streak",
      count: 60,
    },
  },

  // Logros por completar proyectos semanalmente
  {
    id: "weekly-coder",
    title: "Programador Semanal",
    description: "Completa al menos 3 proyectos por semana durante 2 semanas",
    level: "Trainee",
    completed: false,
    icon: "📅",
    requiredConsistency: {
      type: "weekly",
      count: 3,
      period: 2,
    },
  },
  {
    id: "weekly-master",
    title: "Maestro Semanal",
    description: "Completa al menos 5 proyectos por semana durante 3 semanas",
    level: "Junior",
    completed: false,
    icon: "📅🏆",
    requiredConsistency: {
      type: "weekly",
      count: 5,
      period: 3,
    },
  },
  {
    id: "weekly-champion",
    title: "Campeón Semanal",
    description: "Completa al menos 7 proyectos por semana durante 4 semanas",
    level: "Senior",
    completed: false,
    icon: "📅👑",
    requiredConsistency: {
      type: "weekly",
      count: 7,
      period: 4,
    },
  },

  // Logros por completar proyectos mensualmente
  {
    id: "monthly-coder",
    title: "Programador Mensual",
    description: "Completa al menos 10 proyectos en un mes",
    level: "Trainee",
    completed: false,
    icon: "📆",
    requiredConsistency: {
      type: "monthly",
      count: 10,
      period: 1,
    },
  },
  {
    id: "monthly-master",
    title: "Maestro Mensual",
    description: "Completa al menos 15 proyectos en un mes durante 2 meses",
    level: "Junior",
    completed: false,
    icon: "📆🏆",
    requiredConsistency: {
      type: "monthly",
      count: 15,
      period: 2,
    },
  },
  {
    id: "monthly-champion",
    title: "Campeón Mensual",
    description: "Completa al menos 20 proyectos en un mes durante 3 meses",
    level: "Senior",
    completed: false,
    icon: "📆👑",
    requiredConsistency: {
      type: "monthly",
      count: 20,
      period: 3,
    },
  },

  // Logros por completar múltiples proyectos en un solo día
  {
    id: "daily-double",
    title: "Doble Diario",
    description: "Completa 2 proyectos en un solo día",
    level: "Student",
    completed: false,
    icon: "2️⃣",
    requiredConsistency: {
      type: "sameDay",
      count: 2,
    },
  },
  {
    id: "triple-threat",
    title: "Triple Amenaza",
    description: "Completa 3 proyectos en un solo día",
    level: "Trainee",
    completed: false,
    icon: "3️⃣",
    requiredConsistency: {
      type: "sameDay",
      count: 3,
    },
  },
  {
    id: "coding-marathon",
    title: "Maratón de Código",
    description: "Completa 5 proyectos en un solo día",
    level: "Junior",
    completed: false,
    icon: "5️⃣🏃",
    requiredConsistency: {
      type: "sameDay",
      count: 5,
    },
  },
  {
    id: "coding-sprint",
    title: "Sprint de Código",
    description: "Completa 10 proyectos en un solo día",
    level: "Senior",
    completed: false,
    icon: "🏃‍♂️💨",
    requiredConsistency: {
      type: "sameDay",
      count: 10,
    },
  },

  // Logros por completar proyectos en horarios específicos
  {
    id: "early-bird-coder",
    title: "Programador Madrugador",
    description: "Completa 5 proyectos entre las 5 AM y las 9 AM",
    level: "Trainee",
    completed: false,
    icon: "🌅",
    requiredConsistency: {
      type: "timeOfDay",
      count: 5,
      timeRange: "morning",
    },
  },
  {
    id: "lunch-break-coder",
    title: "Programador de Mediodía",
    description: "Completa 5 proyectos entre las 12 PM y las 2 PM",
    level: "Trainee",
    completed: false,
    icon: "🍽️",
    requiredConsistency: {
      type: "timeOfDay",
      count: 5,
      timeRange: "afternoon",
    },
  },
  {
    id: "night-owl-coder",
    title: "Programador Nocturno",
    description: "Completa 5 proyectos entre las 10 PM y las 4 AM",
    level: "Trainee",
    completed: false,
    icon: "🦉",
    requiredConsistency: {
      type: "timeOfDay",
      count: 5,
      timeRange: "night",
    },
  },

  // Logros por completar proyectos en días específicos
  {
    id: "weekend-warrior",
    title: "Guerrero de Fin de Semana",
    description: "Completa 10 proyectos durante fines de semana",
    level: "Junior",
    completed: false,
    icon: "🏋️‍♂️",
    requiredConsistency: {
      type: "dayOfWeek",
      count: 10,
      dayType: "weekend",
    },
  },
  {
    id: "workday-warrior",
    title: "Guerrero de Días Laborables",
    description: "Completa 15 proyectos durante días laborables",
    level: "Junior",
    completed: false,
    icon: "💼",
    requiredConsistency: {
      type: "dayOfWeek",
      count: 15,
      dayType: "weekday",
    },
  },

  // Logros por patrones de consistencia avanzados
  {
    id: "balanced-coder",
    title: "Programador Equilibrado",
    description: "Completa al menos 1 proyecto cada día de la semana (lunes a domingo)",
    level: "Senior",
    completed: false,
    icon: "⚖️",
    requiredConsistency: {
      type: "daily",
      count: 7,
    },
  },
  {
    id: "consistent-learner",
    title: "Aprendiz Constante",
    description: "Completa al menos 1 proyecto por semana durante 8 semanas consecutivas",
    level: "Junior",
    completed: false,
    icon: "📚",
    requiredConsistency: {
      type: "weekly",
      count: 1,
      period: 8,
    },
  },
  {
    id: "coding-habit",
    title: "Hábito de Programación",
    description: "Completa al menos 3 proyectos por semana durante 12 semanas consecutivas",
    level: "Senior",
    completed: false,
    icon: "⏰",
    requiredConsistency: {
      type: "weekly",
      count: 3,
      period: 12,
    },
  },
  {
    id: "coding-lifestyle",
    title: "Estilo de Vida de Programación",
    description: "Completa al menos 10 proyectos por mes durante 6 meses consecutivos",
    level: "Master",
    completed: false,
    icon: "🧠",
    requiredConsistency: {
      type: "monthly",
      count: 10,
      period: 6,
    },
  },
  {
    id: "achievement-master",
    title: "Maestro de Logros",
    description: "Completa todos los demás logros disponibles",
    level: "Master",
    completed: false,
    icon: "🏆👑",
  },
  // Add these new achievements to the defaultAchievements array in store.ts
  // Insert this code at the appropriate location in the defaultAchievements array

  // New language-specific achievements
  {
    id: "astro-explorer",
    title: "Explorador de Astro",
    description: "Completa 3 proyectos usando Astro",
    level: "Junior",
    completed: false,
    icon: "🚀",
    requiredLanguages: ["Astro"],
  },
  {
    id: "astro-architect",
    title: "Arquitecto de Astro",
    description: "Completa 7 proyectos usando Astro",
    level: "Senior",
    completed: false,
    icon: "🌠",
    requiredLanguages: ["Astro"],
  },
  {
    id: "svelte-enthusiast",
    title: "Entusiasta de Svelte",
    description: "Completa 3 proyectos usando Svelte",
    level: "Junior",
    completed: false,
    icon: "🧡",
    requiredLanguages: ["Svelte"],
  },
  {
    id: "svelte-master",
    title: "Maestro de Svelte",
    description: "Completa 7 proyectos usando Svelte",
    level: "Senior",
    completed: false,
    icon: "🔥",
    requiredLanguages: ["Svelte"],
  },
  {
    id: "deno-explorer",
    title: "Explorador de Deno",
    description: "Completa 3 proyectos usando Deno",
    level: "Junior",
    completed: false,
    icon: "🦕",
    requiredLanguages: ["Deno"],
  },
  {
    id: "bun-pioneer",
    title: "Pionero de Bun",
    description: "Completa 3 proyectos usando Bun",
    level: "Junior",
    completed: false,
    icon: "🥐",
    requiredLanguages: ["Bun"],
  },
  {
    id: "elm-functional",
    title: "Programador Funcional Elm",
    description: "Completa 3 proyectos usando Elm",
    level: "Junior",
    completed: false,
    icon: "🌳",
    requiredLanguages: ["Elm"],
  },
  {
    id: "rescript-developer",
    title: "Desarrollador ReScript",
    description: "Completa 3 proyectos usando ReScript",
    level: "Junior",
    completed: false,
    icon: "📝",
    requiredLanguages: ["ReScript"],
  },
  {
    id: "solidjs-builder",
    title: "Constructor SolidJS",
    description: "Completa 3 proyectos usando SolidJS",
    level: "Junior",
    completed: false,
    icon: "💎",
    requiredLanguages: ["SolidJS"],
  },
  {
    id: "qwik-speedster",
    title: "Velocista Qwik",
    description: "Completa 3 proyectos usando Qwik",
    level: "Junior",
    completed: false,
    icon: "⚡",
    requiredLanguages: ["Qwik"],
  },
  {
    id: "remix-composer",
    title: "Compositor Remix",
    description: "Completa 3 proyectos usando Remix",
    level: "Junior",
    completed: false,
    icon: "🎵",
    requiredLanguages: ["Remix"],
  },
  {
    id: "htmx-minimalist",
    title: "Minimalista HTMX",
    description: "Completa 3 proyectos usando HTMX",
    level: "Junior",
    completed: false,
    icon: "🧩",
    requiredLanguages: ["HTMX"],
  },
  {
    id: "modern-web-explorer",
    title: "Explorador Web Moderno",
    description: "Completa proyectos usando al menos 3 frameworks modernos (Astro, Svelte, SolidJS, Qwik o Remix)",
    level: "Senior",
    completed: false,
    icon: "🌐",
    requiredLanguages: ["Astro", "Svelte", "SolidJS", "Qwik", "Remix"],
  },
  {
    id: "runtime-pioneer",
    title: "Pionero de Runtimes",
    description: "Completa proyectos usando tanto Deno como Bun",
    level: "Senior",
    completed: false,
    icon: "🏃",
    requiredLanguages: ["Deno", "Bun"],
  },
  {
    id: "badge-collector",
    title: "Coleccionista de Insignias",
    description: "Desbloquea 10 insignias diferentes",
    level: "Master",
    completed: false,
    icon: "🏅",
    requiredProjects: 20,
  },
]

export const useProjectIdeasStore = create<ProjectIdeasStore>()(
  persist(
    (set, get) => ({
      // Filtros iniciales
      appTypeFilter: null,
      setAppTypeFilter: (filter) => set({ appTypeFilter: filter }),

      languageFilter: null,
      setLanguageFilter: (filter) => set({ languageFilter: filter }),

      frameworkFilter: null,
      setFrameworkFilter: (filter) => set({ frameworkFilter: filter }),

      databaseFilter: null,
      setDatabaseFilter: (filter) => set({ databaseFilter: filter }),

      nivelFilter: null,
      setNivelFilter: (filter) => set({ nivelFilter: filter }),

      sortOption: "aleatorio",
      setSortOption: (option) => set({ sortOption: option }),

      // Ideas seleccionadas
      selectedIdea: null,
      setSelectedIdea: (index) => set({ selectedIdea: index }),

      // Easter Egg
      easterEggActivated: false,
      setEasterEggActivated: (activated) => {
        set({ easterEggActivated: activated })

        // Si se activa el easter egg, desbloquear el logro correspondiente
        if (activated) {
          get().unlockAchievement("easter-egg-hunter")
        }
      },

      // Sistema de logros
      completedProjects: [],
      achievements: defaultAchievements,

      markProjectAsCompleted: (projectId) => {
        const state = get()

        // Verificar si el proyecto ya está completado
        if (state.isProjectCompleted(projectId)) return

        // Obtener los detalles del proyecto
        const projectIndex = projectId - 1
        if (projectIndex < 0 || projectIndex >= projectIdeas.length) return

        const project = projectIdeas[projectIndex]

        // Crear el objeto de proyecto completado
        const completedProject: CompletedProject = {
          id: projectId,
          completedAt: Date.now(),
          title: project.titulo,
          level: project.nivel,
          technologies: project.tecnologias,
          frameworks: project.frameworks || [],
          databases: project.basesdedatos || [],
        }

        // Actualizar la lista de proyectos completados
        set((state) => ({
          completedProjects: [...state.completedProjects, completedProject],
        }))

        // Verificar y desbloquear logros
        state.checkAndUnlockAchievements()
      },

      unmarkProjectAsCompleted: (projectId) => {
        set((state) => ({
          completedProjects: state.completedProjects.filter((p) => p.id !== projectId),
        }))

        // Verificar y actualizar logros
        get().checkAndUnlockAchievements()
      },

      isProjectCompleted: (projectId) => {
        return get().completedProjects.some((p) => p.id === projectId)
      },

      // Estadísticas de progreso
      getCompletedProjectsByLevel: (level) => {
        return get().completedProjects.filter((p) => p.level === level).length
      },

      getCompletedProjectsByLanguage: (language) => {
        return get().completedProjects.filter((p) => p.technologies.includes(language)).length
      },

      getCompletedProjectsByFramework: (framework) => {
        return get().completedProjects.filter((p) => p.frameworks.includes(framework)).length
      },

      getTotalCompletedProjects: () => {
        return get().completedProjects.length
      },

      getCurrentLevel: () => {
        const state = get()
        const totalProjects = state.getTotalCompletedProjects()
        const studentProjects = state.getCompletedProjectsByLevel("Student")
        const traineeProjects = state.getCompletedProjectsByLevel("Trainee")
        const juniorProjects = state.getCompletedProjectsByLevel("Junior")
        const seniorProjects = state.getCompletedProjectsByLevel("Senior")

        if (totalProjects >= 50 && seniorProjects >= 15) {
          return "Master"
        } else if (totalProjects >= 25 && seniorProjects >= 8) {
          return "Senior"
        } else if (totalProjects >= 15 && juniorProjects >= 5) {
          return "Junior"
        } else if (totalProjects >= 10 && traineeProjects >= 3) {
          return "Trainee"
        } else {
          return "Student"
        }
      },

      getLevelProgress: () => {
        const state = get()
        const currentLevel = state.getCurrentLevel()
        const totalProjects = state.getTotalCompletedProjects()

        switch (currentLevel) {
          case "Student":
            // Progreso de 0 a 10 proyectos
            return Math.min(totalProjects / 10, 1)
          case "Trainee":
            // Progreso de 10 a 15 proyectos
            return Math.min((totalProjects - 10) / 5, 1)
          case "Junior":
            // Progreso de 15 a 25 proyectos
            return Math.min((totalProjects - 15) / 10, 1)
          case "Senior":
            // Progreso de 25 a 50 proyectos
            return Math.min((totalProjects - 25) / 25, 1)
          case "Master":
            // Ya está al máximo
            return 1
          default:
            return 0
        }
      },

      // Logros
      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId ? { ...achievement, completed: true } : achievement,
          ),
        }))

        // Check if all achievements are completed after unlocking a new one
        // BUT only if we're not already unlocking the "achievement-master" achievement
        if (achievementId !== "achievement-master") {
          get().checkAllAchievementsCompleted()
        }
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter((a) => a.completed)
      },

      // Nuevas funciones para verificar consistencia
      getConsecutiveDaysStreak: () => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Ordenar proyectos por fecha de completado
        const sortedProjects = [...projects].sort((a, b) => a.completedAt - b.completedAt)

        // Obtener fechas únicas (días) en los que se completaron proyectos
        const uniqueDays = new Set<string>()
        sortedProjects.forEach((project) => {
          const date = new Date(project.completedAt)
          const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          uniqueDays.add(dateString)
        })

        const uniqueDaysArray = Array.from(uniqueDays)

        // Verificar la racha actual
        let currentStreak = 1
        let maxStreak = 1

        // Obtener la fecha actual
        const today = new Date()
        const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

        // Si no hay proyectos completados hoy, la racha podría haberse roto
        if (uniqueDaysArray[uniqueDaysArray.length - 1] !== todayString) {
          const lastCompletionDate = new Date(sortedProjects[sortedProjects.length - 1].completedAt)
          const yesterday = new Date(today)
          yesterday.setDate(today.getDate() - 1)

          // Si el último proyecto no se completó ayer o hoy, la racha se rompió
          if (
            lastCompletionDate.getDate() !== yesterday.getDate() ||
            lastCompletionDate.getMonth() !== yesterday.getMonth() ||
            lastCompletionDate.getFullYear() !== yesterday.getFullYear()
          ) {
            return 0
          }
        }

        // Calcular la racha máxima
        for (let i = 1; i < uniqueDaysArray.length; i++) {
          const prevDate = new Date(uniqueDaysArray[i - 1].split("-").map(Number) as [number, number, number])
          const currDate = new Date(uniqueDaysArray[i].split("-").map(Number) as [number, number, number])

          // Verificar si las fechas son consecutivas
          const diffTime = Math.abs(currDate.getTime() - prevDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays === 1) {
            currentStreak++
            maxStreak = Math.max(maxStreak, currentStreak)
          } else {
            currentStreak = 1
          }
        }

        return maxStreak
      },

      getWeeklyCompletionCount: (weeks = 1) => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Obtener la fecha actual
        const now = new Date()

        // Calcular la fecha de inicio del período (hace 'weeks' semanas)
        const startDate = new Date(now)
        startDate.setDate(now.getDate() - weeks * 7)

        // Filtrar proyectos completados en el período especificado
        const projectsInPeriod = projects.filter(
          (project) => project.completedAt >= startDate.getTime() && project.completedAt <= now.getTime(),
        )

        // Agrupar proyectos por semana
        const weeklyProjects: { [weekKey: string]: number } = {}

        projectsInPeriod.forEach((project) => {
          const date = new Date(project.completedAt)
          // Obtener el número de semana del año
          const weekNumber = getWeekNumber(date)
          const weekKey = `${date.getFullYear()}-W${weekNumber}`

          if (!weeklyProjects[weekKey]) {
            weeklyProjects[weekKey] = 0
          }

          weeklyProjects[weekKey]++
        })

        // Verificar si se cumple el requisito para todas las semanas
        const weekKeys = Object.keys(weeklyProjects)
        if (weekKeys.length < weeks) return 0

        // Ordenar las semanas cronológicamente
        weekKeys.sort()

        // Tomar las últimas 'weeks' semanas
        const recentWeeks = weekKeys.slice(-weeks)

        // Encontrar el mínimo de proyectos completados en una semana
        const minProjectsPerWeek = Math.min(...recentWeeks.map((week) => weeklyProjects[week]))

        return minProjectsPerWeek
      },

      getMonthlyCompletionCount: (months = 1) => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Obtener la fecha actual
        const now = new Date()

        // Calcular la fecha de inicio del período (hace 'months' meses)
        const startDate = new Date(now)
        startDate.setMonth(now.getMonth() - months)

        // Filtrar proyectos completados en el período especificado
        const projectsInPeriod = projects.filter(
          (project) => project.completedAt >= startDate.getTime() && project.completedAt <= now.getTime(),
        )

        // Agrupar proyectos por mes
        const monthlyProjects: { [monthKey: string]: number } = {}

        projectsInPeriod.forEach((project) => {
          const date = new Date(project.completedAt)
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`

          if (!monthlyProjects[monthKey]) {
            monthlyProjects[monthKey] = 0
          }

          monthlyProjects[monthKey]++
        })

        // Verificar si se cumple el requisito para todos los meses
        const monthKeys = Object.keys(monthlyProjects)
        if (monthKeys.length < months) return 0

        // Ordenar los meses cronológicamente
        monthKeys.sort()

        // Tomar los últimos 'months' meses
        const recentMonths = monthKeys.slice(-months)

        // Encontrar el mínimo de proyectos completados en un mes
        const minProjectsPerMonth = Math.min(...recentMonths.map((month) => monthlyProjects[month]))

        return minProjectsPerMonth
      },

      getProjectsCompletedSameDay: (maxHours = 24) => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Agrupar proyectos por día
        const projectsByDay: { [dayKey: string]: number[] } = {}

        projects.forEach((project) => {
          const date = new Date(project.completedAt)
          const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

          if (!projectsByDay[dayKey]) {
            projectsByDay[dayKey] = []
          }

          projectsByDay[dayKey].push(project.completedAt)
        })

        // Encontrar el máximo de proyectos completados en un solo día
        let maxProjectsInDay = 0

        Object.values(projectsByDay).forEach((timestamps) => {
          // Ordenar timestamps
          timestamps.sort()

          // Verificar cuántos proyectos se completaron dentro del período de maxHours
          let maxInPeriod = 0

          for (let i = 0; i < timestamps.length; i++) {
            const startTime = timestamps[i]
            const endTime = startTime + maxHours * 60 * 60 * 1000

            // Contar proyectos en este período
            const projectsInPeriod = timestamps.filter((time) => time >= startTime && time <= endTime).length

            maxInPeriod = Math.max(maxInPeriod, projectsInPeriod)
          }

          maxProjectsInDay = Math.max(maxProjectsInDay, maxInPeriod)
        })

        return maxProjectsInDay
      },

      getProjectsByTimeOfDay: (timeRange) => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Definir rangos horarios
        const timeRanges = {
          morning: { start: 5, end: 11 }, // 5 AM - 11:59 AM
          afternoon: { start: 12, end: 17 }, // 12 PM - 5:59 PM
          evening: { start: 18, end: 21 }, // 6 PM - 9:59 PM
          night: { start: 22, end: 4 }, // 10 PM - 4:59 AM (cruza la medianoche)
        }

        // Filtrar proyectos por rango horario
        const projectsInTimeRange = projects.filter((project) => {
          const date = new Date(project.completedAt)
          const hour = date.getHours()

          const range = timeRanges[timeRange]

          // Manejar el caso especial de la noche (cruza la medianoche)
          if (timeRange === "night") {
            return hour >= range.start || hour <= range.end
          }

          // Para los demás rangos horarios
          return hour >= range.start && hour <= range.end
        })

        return projectsInTimeRange.length
      },

      getProjectsByDayType: (dayType) => {
        const projects = get().completedProjects
        if (projects.length === 0) return 0

        // Filtrar proyectos por tipo de día
        const projectsByDayType = projects.filter((project) => {
          const date = new Date(project.completedAt)
          const dayOfWeek = date.getDay() // 0 = domingo, 6 = sábado

          if (dayType === "weekend") {
            return dayOfWeek === 0 || dayOfWeek === 6 // Fin de semana (sábado o domingo)
          } else {
            return dayOfWeek >= 1 && dayOfWeek <= 5 // Días laborables (lunes a viernes)
          }
        })

        return projectsByDayType.length
      },

      getCompletedProjectsByDatabase: (database: string) => {
        return get().completedProjects.filter((p) => p.databases.includes(database)).length
      },

      getCompletedProjectsByAppType: (appType: string) => {
        return get().completedProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(appType.toLowerCase()) ||
            p.technologies.some((tech) => tech.toLowerCase().includes(appType.toLowerCase())),
        ).length
      },

      // Check if all achievements are completed
      checkAllAchievementsCompleted: () => {
        const state = get()
        const achievements = state.achievements

        // Check if all achievements except "achievement-master" are completed
        const allOtherAchievementsCompleted = achievements
          .filter((a) => a.id !== "achievement-master")
          .every((a) => a.completed)

        // If all other achievements are completed, unlock the "achievement-master" achievement
        // BUT only if it's not already completed to avoid infinite recursion
        if (allOtherAchievementsCompleted) {
          const achievementMaster = achievements.find((a) => a.id === "achievement-master")
          if (achievementMaster && !achievementMaster.completed) {
            state.unlockAchievement("achievement-master")
          }
        }
      },

      // Update the checkAndUnlockAchievements function to better handle achievement unlocking:

      checkAndUnlockAchievements: () => {
        const state = get()
        const totalProjects = state.getTotalCompletedProjects()
        const studentProjects = state.getCompletedProjectsByLevel("Student")
        const traineeProjects = state.getCompletedProjectsByLevel("Trainee")
        const juniorProjects = state.getCompletedProjectsByLevel("Junior")
        const seniorProjects = state.getCompletedProjectsByLevel("Senior")

        // Verificar cada logro y desbloquearlo si se cumplen las condiciones
        state.achievements.forEach((achievement) => {
          if (achievement.completed) return

          let shouldUnlock = false

          // Verificar requisitos de proyectos totales
          if (achievement.requiredProjects && totalProjects >= achievement.requiredProjects) {
            // Verificar requisitos específicos por nivel
            switch (achievement.id) {
              case "student-graduate":
                shouldUnlock = studentProjects >= 5
                break
              case "trainee-ready":
                shouldUnlock = totalProjects >= 10 && traineeProjects >= 3
                break
              case "junior-developer":
                shouldUnlock = totalProjects >= 15 && juniorProjects >= 5
                break
              case "senior-developer":
                shouldUnlock = totalProjects >= 25 && seniorProjects >= 8
                break
              case "master-developer":
                shouldUnlock = totalProjects >= 50
                break
              case "first-project":
                shouldUnlock = totalProjects >= 1
                break
              case "project-collector-i":
                shouldUnlock = totalProjects >= 25
                break
              case "project-collector-ii":
                shouldUnlock = totalProjects >= 50
                break
              case "project-collector-iii":
                shouldUnlock = totalProjects >= 100
                break
              default:
                shouldUnlock = true
            }
          }

          // Verificar requisitos de lenguajes
          if (achievement.requiredLanguages) {
            const languageCounts = achievement.requiredLanguages.map((lang) =>
              state.getCompletedProjectsByLanguage(lang),
            )

            // Para logros que requieren un número específico de proyectos en un lenguaje
            if (
              achievement.id.includes("enthusiast") ||
              achievement.id.includes("explorer") ||
              achievement.id.includes("developer") ||
              achievement.id.includes("apprentice")
            ) {
              shouldUnlock = languageCounts.some((count) => count >= 3) // Reduced from 5 to 3 for easier unlocking
            } else if (
              achievement.id.includes("ninja") ||
              achievement.id.includes("master") ||
              achievement.id.includes("wizard") ||
              achievement.id.includes("guru")
            ) {
              shouldUnlock = languageCounts.some((count) => count >= 5) // Reduced from 10 to 5 for easier unlocking
            } else if (achievement.id === "functional-programmer") {
              // Al menos un proyecto en alguno de estos lenguajes
              shouldUnlock = languageCounts.some((count) => count >= 1)
            } else if (achievement.id === "assembly-wizard" || achievement.id === "brainfuck-master") {
              // Solo requiere un proyecto
              shouldUnlock = languageCounts.some((count) => count >= 1)
            } else if (achievement.id === "polyglot") {
              // Contar cuántos lenguajes diferentes se han usado
              const uniqueLanguages = new Set<string>()
              state.completedProjects.forEach((project) => {
                project.technologies.forEach((tech) => uniqueLanguages.add(tech))
              })
              shouldUnlock = uniqueLanguages.size >= 4 // Reduced from 6 to 4 for easier unlocking
            }
          }

          // Verificar requisitos de frameworks
          if (achievement.requiredFrameworks) {
            const frameworkCounts = achievement.requiredFrameworks.map((framework) =>
              state.getCompletedProjectsByFramework(framework),
            )

            if (
              achievement.id.includes("apprentice") ||
              achievement.id.includes("explorer") ||
              achievement.id.includes("enthusiast") ||
              achievement.id.includes("developer")
            ) {
              shouldUnlock = frameworkCounts.some((count) => count >= 3) // Reduced from 5 to 3 for easier unlocking
            } else if (
              achievement.id.includes("architect") ||
              achievement.id.includes("master") ||
              achievement.id.includes("expert")
            ) {
              shouldUnlock = frameworkCounts.some((count) => count >= 5) // Reduced from 10 to 5 for easier unlocking
            } else if (achievement.id === "framework-master") {
              // Contar cuántos frameworks diferentes se han usado
              const uniqueFrameworks = new Set<string>()
              state.completedProjects.forEach((project) => {
                project.frameworks.forEach((framework) => uniqueFrameworks.add(framework))
              })
              shouldUnlock = uniqueFrameworks.size >= 3 // Reduced from 5 to 3 for easier unlocking
            } else if (achievement.id === "framework-collector") {
              // Contar cuántos frameworks diferentes se han usado
              const uniqueFrameworks = new Set<string>()
              state.completedProjects.forEach((project) => {
                project.frameworks.forEach((framework) => uniqueFrameworks.add(framework))
              })
              shouldUnlock = uniqueFrameworks.size >= 5 // Reduced from 10 to 5 for easier unlocking
            }
          }

          // Verificar requisitos de bases de datos
          if (achievement.requiredDatabases) {
            const dbCounts = achievement.requiredDatabases.map((db) => {
              return state.getCompletedProjectsByDatabase(db) || 0
            })

            if (
              achievement.id.includes("apprentice") ||
              achievement.id.includes("explorer") ||
              achievement.id.includes("developer")
            ) {
              shouldUnlock = dbCounts.some((count) => count >= 3) // Reduced from 5 to 3 for easier unlocking
            } else if (achievement.id.includes("architect") || achievement.id.includes("master")) {
              shouldUnlock = dbCounts.some((count) => count >= 5) // Reduced from 10 to 5 for easier unlocking
            } else if (achievement.id === "database-collector") {
              // Contar cuántas bases de datos diferentes se han usado
              const uniqueDatabases = new Set<string>()
              state.completedProjects.forEach((project) => {
                project.databases.forEach((db) => uniqueDatabases.add(db))
              })
              shouldUnlock = uniqueDatabases.size >= 3 // Reduced from 5 to 3 for easier unlocking
            }
          }

          // Verificar requisitos de tipos de aplicaciones
          if (achievement.requiredAppTypes) {
            const appTypeCounts = achievement.requiredAppTypes.map((type) => {
              return state.getCompletedProjectsByAppType(type) || 0
            })

            if (
              achievement.id.includes("developer") ||
              achievement.id.includes("engineer") ||
              achievement.id.includes("explorer")
            ) {
              shouldUnlock = appTypeCounts.some((count) => count >= 3) // Reduced from 5 to 3 for easier unlocking
            } else if (achievement.id.includes("architect") || achievement.id.includes("researcher")) {
              shouldUnlock = appTypeCounts.some((count) => count >= 5) // Reduced from 10 to 5 for easier unlocking
            }
          }

          // Verificar requisitos de consistencia
          if (achievement.requiredConsistency) {
            const { type, count, period, dayType, timeRange } = achievement.requiredConsistency

            switch (type) {
              case "streak":
                // Verificar racha de días consecutivos
                shouldUnlock = state.getConsecutiveDaysStreak() >= count
                break
              case "weekly":
                // Verificar completados por semana durante un período
                shouldUnlock = state.getWeeklyCompletionCount(period || 1) >= count
                break
              case "monthly":
                // Verificar completados por mes durante un período
                shouldUnlock = state.getMonthlyCompletionCount(period || 1) >= count
                break
              case "sameDay":
                // Verificar proyectos completados en un mismo día
                shouldUnlock = state.getProjectsCompletedSameDay() >= count
                break
              case "timeOfDay":
                // Verificar proyectos completados en un horario específico
                if (timeRange) {
                  shouldUnlock = state.getProjectsByTimeOfDay(timeRange) >= count
                }
                break
              case "dayOfWeek":
                // Verificar proyectos completados en días específicos
                if (dayType) {
                  shouldUnlock = state.getProjectsByDayType(dayType) >= count
                }
                break
              case "daily":
                // Verificar proyectos completados todos los días de la semana
                // Implementación simplificada: verificar si hay al menos 'count' días diferentes
                const uniqueDays = new Set<string>()
                state.completedProjects.forEach((project) => {
                  const date = new Date(project.completedAt)
                  const dayOfWeek = date.getDay() // 0-6
                  uniqueDays.add(dayOfWeek.toString())
                })
                shouldUnlock = uniqueDays.size >= count
                break
            }
          }

          // Verificar requisitos de proyectos por nivel
          if (achievement.requiredLevelProjects) {
            const { level, count } = achievement.requiredLevelProjects
            const projectsOfLevel = state.getCompletedProjectsByLevel(level)
            shouldUnlock = projectsOfLevel >= count
          }

          // Verificar requisitos de stack
          if (achievement.requiredStack) {
            // Contar proyectos que usan todas las tecnologías del stack
            const projectsWithStack = state.completedProjects.filter((project) => {
              return achievement.requiredStack!.every((tech) => {
                return (
                  project.technologies.includes(tech) ||
                  project.frameworks.includes(tech) ||
                  project.databases.includes(tech)
                )
              })
            })
            shouldUnlock = projectsWithStack.length >= 3 // Reduced from 5 to 3 for easier unlocking
          }

          // Verificar requisitos de combinaciones específicas
          if (achievement.requiredCombination) {
            const { languages, frameworks, frameworks2, databases, count } = achievement.requiredCombination

            // Contar proyectos que usan todas las tecnologías especificadas
            const projectsWithCombination = state.completedProjects.filter((project) => {
              let hasLanguages = true
              let hasFrameworks = true
              let hasFrameworks2 = true
              let hasDatabases = true

              if (languages) {
                hasLanguages = languages.some((lang) => project.technologies.includes(lang))
              }

              if (frameworks) {
                hasFrameworks = frameworks.some((framework) => project.frameworks.includes(framework))
              }

              if (frameworks2) {
                hasFrameworks2 = frameworks2.some((framework) => project.frameworks.includes(framework))
              }

              if (databases) {
                hasDatabases = databases.some((db) => project.databases.includes(db))
              }

              return hasLanguages && hasFrameworks && hasFrameworks2 && hasDatabases
            })

            shouldUnlock = projectsWithCombination.length >= Math.max(1, Math.floor(count / 2)) // Reduced requirements for easier unlocking
          }

          // Verificar requisitos de tags
          if (achievement.requiredTags) {
            // Contar proyectos que tienen al menos uno de los tags requeridos
            const projectsWithTags = state.completedProjects.filter((project) => {
              return achievement.requiredTags!.some((tag) => {
                return (
                  project.title.toLowerCase().includes(tag.toLowerCase()) ||
                  project.technologies.some((tech) => tech.toLowerCase().includes(tag.toLowerCase()))
                )
              })
            })
            shouldUnlock = projectsWithTags.length >= 2 // Reduced from 3 to 2 for easier unlocking
          }

          // Desbloquear el logro si se cumplen las condiciones
          if (shouldUnlock) {
            state.unlockAchievement(achievement.id)
          }
        })

        // Check if all achievements are completed
        state.checkAllAchievementsCompleted()
      },
    }),
    {
      name: "project-ideas-storage",
      partialize: (state) => ({
        completedProjects: state.completedProjects,
        achievements: state.achievements,
        easterEggActivated: state.easterEggActivated,
      }),
    },
  ),
)

// Función auxiliar para obtener el número de semana del año
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}
