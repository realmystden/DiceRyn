import { create } from "zustand"
import { persist } from "zustand/middleware"
import { projectIdeas } from "./project-ideas"

// Añadir nuevos tipos para los logros
export type AchievementLevel = "Student" | "Trainee" | "Junior" | "Senior" | "Master"

// Actualizar la interfaz Achievement para soportar combinaciones específicas
export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  completed: boolean
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
    databases?: string[]
    count: number
  }
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

  checkAndUnlockAchievements: () => void
}

export interface CompletedProject {
  id: number
  completedAt: number
  title: string
  level: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
}

// Actualizar la lista de logros predeterminados con muchos más logros tecnológicos
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
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter((a) => a.completed)
      },

      // Actualizar la función checkAndUnlockAchievements para verificar los nuevos logros
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
              shouldUnlock = languageCounts.every((count) => count >= 5)
            } else if (
              achievement.id.includes("ninja") ||
              achievement.id.includes("master") ||
              achievement.id.includes("wizard") ||
              achievement.id.includes("guru")
            ) {
              shouldUnlock = languageCounts.every((count) => count >= 10)
            } else if (achievement.id === "functional-programmer") {
              // Al menos un proyecto en alguno de estos lenguajes
              shouldUnlock = languageCounts.some((count) => count >= 1)
            } else if (achievement.id === "assembly-wizard" || achievement.id === "brainfuck-master") {
              // Solo requiere un proyecto
              shouldUnlock = languageCounts.some((count) => count >= 1)
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
              shouldUnlock = frameworkCounts.every((count) => count >= 5)
            } else if (
              achievement.id.includes("architect") ||
              achievement.id.includes("master") ||
              achievement.id.includes("expert")
            ) {
              shouldUnlock = frameworkCounts.every((count) => count >= 10)
            }
          }

          // Verificar requisitos de bases de datos
          if (achievement.requiredDatabases) {
            const dbCounts = achievement.requiredDatabases.map((db) => {
              // Aquí necesitaríamos implementar una función para contar proyectos por base de datos
              // Por ahora, asumimos que existe una función similar a getCompletedProjectsByFramework
              return state.getCompletedProjectsByDatabase(db) || 0
            })

            if (
              achievement.id.includes("apprentice") ||
              achievement.id.includes("explorer") ||
              achievement.id.includes("developer")
            ) {
              shouldUnlock = dbCounts.some((count) => count >= 5)
            } else if (achievement.id.includes("architect") || achievement.id.includes("master")) {
              shouldUnlock = dbCounts.some((count) => count >= 10)
            }
          }

          // Verificar requisitos de tipos de aplicaciones
          if (achievement.requiredAppTypes) {
            const appTypeCounts = achievement.requiredAppTypes.map((type) => {
              // Aquí necesitaríamos implementar una función para contar proyectos por tipo
              return state.getCompletedProjectsByAppType(type) || 0
            })

            if (
              achievement.id.includes("developer") ||
              achievement.id.includes("engineer") ||
              achievement.id.includes("explorer")
            ) {
              shouldUnlock = appTypeCounts.some((count) => count >= 5)
            } else if (achievement.id.includes("architect") || achievement.id.includes("researcher")) {
              shouldUnlock = appTypeCounts.some((count) => count >= 10)
            }
          }

          // Verificar logro de frameworks
          if (achievement.id === "framework-master") {
            const uniqueFrameworks = new Set<string>()
            state.completedProjects.forEach((project) => {
              project.frameworks.forEach((framework) => {
                uniqueFrameworks.add(framework)
              })
            })
            shouldUnlock = uniqueFrameworks.size >= 5
          }

          // Verificar logro de políglota
          if (achievement.id === "polyglot") {
            const uniqueLanguages = new Set<string>()
            state.completedProjects.forEach((project) => {
              project.technologies.forEach((tech) => {
                uniqueLanguages.add(tech)
              })
            })
            shouldUnlock = uniqueLanguages.size >= 6
          }

          // Verificar logro de coleccionista de lenguajes
          if (achievement.id === "language-collector") {
            const uniqueLanguages = new Set<string>()
            state.completedProjects.forEach((project) => {
              project.technologies.forEach((tech) => {
                uniqueLanguages.add(tech)
              })
            })
            shouldUnlock = uniqueLanguages.size >= 10
          }

          // Verificar logro de coleccionista de frameworks
          if (achievement.id === "framework-collector") {
            const uniqueFrameworks = new Set<string>()
            state.completedProjects.forEach((project) => {
              project.frameworks.forEach((framework) => {
                uniqueFrameworks.add(framework)
              })
            })
            shouldUnlock = uniqueFrameworks.size >= 10
          }

          // Verificar logro de coleccionista de bases de datos
          if (achievement.id === "database-collector") {
            const uniqueDatabases = new Set<string>()
            state.completedProjects.forEach((project) => {
              project.databases.forEach((db) => {
                uniqueDatabases.add(db)
              })
            })
            shouldUnlock = uniqueDatabases.size >= 5
          }

          // Verificar logros por nivel específico
          if (achievement.requiredLevelProjects) {
            const { level, count } = achievement.requiredLevelProjects
            const levelProjects = state.getCompletedProjectsByLevel(level)
            shouldUnlock = levelProjects >= count
          }

          // Verificar logros por stack específico
          if (achievement.requiredStack) {
            // Implementación simplificada - en una implementación real
            // necesitaríamos verificar que los proyectos usen todas las tecnologías del stack
            const stackCounts = achievement.requiredStack.map((tech) => {
              // Combinamos tecnologías, frameworks y bases de datos
              const techCount = state.getCompletedProjectsByLanguage(tech) || 0
              const frameworkCount = state.getCompletedProjectsByFramework(tech) || 0
              const dbCount = state.getCompletedProjectsByDatabase(tech) || 0
              return techCount + frameworkCount + dbCount
            })
            shouldUnlock =
              stackCounts.every((count) => count >= 1) &&
              state.completedProjects.filter((p) =>
                achievement.requiredStack?.some(
                  (tech) => p.technologies.includes(tech) || p.frameworks.includes(tech) || p.databases.includes(tech),
                ),
              ).length >= 5
          }

          // Verificar logros por tags específicos
          if (achievement.requiredTags) {
            // Esta es una implementación simplificada
            // En una implementación real, necesitaríamos tener tags en los proyectos
            const taggedProjects = state.completedProjects.filter((p) =>
              achievement.requiredTags?.some(
                (tag) =>
                  p.technologies.some((tech) => tech.toLowerCase().includes(tag)) ||
                  p.frameworks.some((framework) => framework.toLowerCase().includes(tag)) ||
                  p.title.toLowerCase().includes(tag),
              ),
            )
            shouldUnlock = taggedProjects.length >= (achievement.id.includes("pioneer") ? 3 : 5)
          }

          // Verificar logros por combinaciones específicas
          if (achievement.requiredCombination) {
            const { languages, frameworks, databases, count, frameworks2 } = achievement.requiredCombination

            // Contar proyectos que usan esta combinación específica
            let combinationProjects = 0

            state.completedProjects.forEach((project) => {
              let matchesLanguages = true
              let matchesFrameworks = true
              let matchesFrameworks2 = true
              let matchesDatabases = true

              // Verificar lenguajes requeridos
              if (languages && languages.length > 0) {
                matchesLanguages = languages.every((lang) => project.technologies.some((tech) => tech.includes(lang)))
              }

              // Verificar frameworks requeridos
              if (frameworks && frameworks.length > 0) {
                matchesFrameworks = frameworks.every((framework) =>
                  project.frameworks.some((f) => f.includes(framework)),
                )
              }

              // Verificar frameworks secundarios requeridos (si existen)
              if (frameworks2 && frameworks2.length > 0) {
                matchesFrameworks2 = frameworks2.every((framework) =>
                  project.frameworks.some((f) => f.includes(framework)),
                )
              }

              // Verificar bases de datos requeridas
              if (databases && databases.length > 0) {
                matchesDatabases = databases.every((db) => project.databases.some((d) => d.includes(db)))
              }

              // Si el proyecto cumple con todos los requisitos, incrementar el contador
              if (matchesLanguages && matchesFrameworks && matchesFrameworks2 && matchesDatabases) {
                combinationProjects++
              }
            })

            // Desbloquear el logro si se alcanza el número requerido de proyectos
            shouldUnlock = combinationProjects >= count
          }

          // Desbloquear el logro si se cumplen las condiciones
          if (shouldUnlock) {
            state.unlockAchievement(achievement.id)
          }
        })
      },
      getCompletedProjectsByDatabase: (database: string) => {
        return get().completedProjects.filter((p) => p.databases.includes(database)).length
      },
      getCompletedProjectsByAppType: (appType: string) => {
        // This requires that the projectIdeas data has an appType field
        // and that the completedProjects objects somehow store this information
        // For now, return 0
        return get().completedProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(appType.toLowerCase()) ||
            p.technologies.some((tech) => tech.toLowerCase().includes(appType.toLowerCase())),
        ).length
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
