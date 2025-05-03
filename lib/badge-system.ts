import type { AchievementLevel } from "./store"

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  level: AchievementLevel
  requirements: {
    type: "achievements" | "projects" | "languages" | "frameworks" | "combination" | "streak"
    count?: number
    specificIds?: string[]
    languages?: string[]
    frameworks?: string[]
    projectCount?: number
    streakDays?: number
    description: string
  }
}

// Define badges that are more challenging than regular achievements
export const badges: Badge[] = [
  // Student Level Badges
  {
    id: "student-explorer",
    name: "Explorador Novato",
    description: "Completa una variedad de proyectos de nivel Student",
    icon: "🔍",
    level: "Student",
    requirements: {
      type: "projects",
      projectCount: 5,
      description: "Completa 5 proyectos de nivel Student en al menos 2 lenguajes diferentes.",
    },
  },
  {
    id: "student-dedication",
    name: "Dedicación Estudiantil",
    description: "Muestra constancia en tu aprendizaje inicial",
    icon: "📚",
    level: "Student",
    requirements: {
      type: "streak",
      streakDays: 3,
      description: "Completa al menos un proyecto cada día durante 3 días consecutivos.",
    },
  },
  {
    id: "student-polyglot",
    name: "Políglota Principiante",
    description: "Experimenta con diferentes lenguajes de programación",
    icon: "🗣️",
    level: "Student",
    requirements: {
      type: "languages",
      count: 3,
      description: "Completa proyectos en 3 lenguajes de programación diferentes.",
    },
  },
  {
    id: "student-web-pioneer",
    name: "Pionero Web",
    description: "Primeros pasos en el desarrollo web",
    icon: "🌐",
    level: "Student",
    requirements: {
      type: "combination",
      languages: ["HTML", "CSS", "JavaScript"],
      count: 2,
      description: "Completa proyectos utilizando al menos 2 de estos lenguajes: HTML, CSS y JavaScript.",
    },
  },
  {
    id: "student-algorithm-master",
    name: "Maestro de Algoritmos Básicos",
    description: "Dominio de algoritmos fundamentales",
    icon: "🧮",
    level: "Student",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos enfocados en algoritmos básicos.",
    },
  },
  {
    id: "student-mobile-explorer",
    name: "Explorador Móvil",
    description: "Primeros pasos en el desarrollo móvil",
    icon: "📱",
    level: "Student",
    requirements: {
      type: "combination",
      frameworks: ["React Native", "Flutter"],
      count: 1,
      description: "Completa un proyecto utilizando React Native o Flutter.",
    },
  },
  {
    id: "student-game-developer",
    name: "Desarrollador de Juegos Novato",
    description: "Creación de juegos simples",
    icon: "🎮",
    level: "Student",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos de juegos simples.",
    },
  },
  {
    id: "student-database-initiate",
    name: "Iniciado en Bases de Datos",
    description: "Primeros pasos con bases de datos",
    icon: "💾",
    level: "Student",
    requirements: {
      type: "combination",
      frameworks: ["MySQL", "MongoDB", "SQLite"],
      count: 1,
      description: "Completa un proyecto utilizando una base de datos.",
    },
  },

  // Trainee Level Badges
  {
    id: "trainee-specialist",
    name: "Especialista en Formación",
    description: "Domina un lenguaje específico a nivel Trainee",
    icon: "🛠️",
    level: "Trainee",
    requirements: {
      type: "combination",
      languages: ["JavaScript", "Python", "Java"],
      projectCount: 5,
      description: "Completa 5 proyectos en uno de estos lenguajes: JavaScript, Python o Java.",
    },
  },
  {
    id: "trainee-framework-explorer",
    name: "Explorador de Frameworks",
    description: "Experimenta con diferentes frameworks",
    icon: "🧩",
    level: "Trainee",
    requirements: {
      type: "frameworks",
      count: 2,
      description: "Completa proyectos usando 2 frameworks diferentes.",
    },
  },
  {
    id: "trainee-consistency",
    name: "Consistencia en Desarrollo",
    description: "Mantén un ritmo constante de aprendizaje",
    icon: "📅",
    level: "Trainee",
    requirements: {
      type: "combination",
      projectCount: 8,
      streakDays: 5,
      description: "Completa 8 proyectos y mantén una racha de 5 días.",
    },
  },
  {
    id: "trainee-api-master",
    name: "Maestro de APIs",
    description: "Dominio en la integración de APIs",
    icon: "🔌",
    level: "Trainee",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos que integren APIs externas.",
    },
  },
  {
    id: "trainee-responsive-designer",
    name: "Diseñador Responsivo",
    description: "Especialista en diseño web adaptable",
    icon: "📐",
    level: "Trainee",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos con diseño responsivo avanzado.",
    },
  },
  {
    id: "trainee-testing-pioneer",
    name: "Pionero en Testing",
    description: "Implementación de pruebas en proyectos",
    icon: "🧪",
    level: "Trainee",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos que incluyan pruebas unitarias o de integración.",
    },
  },
  {
    id: "trainee-database-architect",
    name: "Arquitecto de Bases de Datos",
    description: "Diseño avanzado de bases de datos",
    icon: "🗄️",
    level: "Trainee",
    requirements: {
      type: "combination",
      frameworks: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
      count: 2,
      description: "Completa proyectos utilizando 2 sistemas de bases de datos diferentes.",
    },
  },
  {
    id: "trainee-ui-specialist",
    name: "Especialista en UI",
    description: "Creación de interfaces de usuario atractivas",
    icon: "🎨",
    level: "Trainee",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos con enfoque en UI/UX avanzado.",
    },
  },

  // Junior Level Badges
  {
    id: "junior-fullstack",
    name: "Desarrollador Fullstack Junior",
    description: "Domina tanto frontend como backend",
    icon: "⚙️",
    level: "Junior",
    requirements: {
      type: "projects",
      projectCount: 5,
      description: "Completa 5 proyectos que combinen frontend y backend.",
    },
  },
  {
    id: "junior-database-master",
    name: "Maestro de Bases de Datos",
    description: "Experiencia con múltiples sistemas de bases de datos",
    icon: "💾",
    level: "Junior",
    requirements: {
      type: "frameworks",
      count: 3,
      description: "Utiliza 3 sistemas de bases de datos diferentes en tus proyectos.",
    },
  },
  {
    id: "junior-project-marathon",
    name: "Maratón de Proyectos",
    description: "Completa una gran cantidad de proyectos variados",
    icon: "🏃",
    level: "Junior",
    requirements: {
      type: "projects",
      projectCount: 15,
      description: "Completa 15 proyectos en total, incluyendo al menos 5 de nivel Junior o superior.",
    },
  },
  {
    id: "junior-cloud-architect",
    name: "Arquitecto Cloud",
    description: "Especialista en soluciones en la nube",
    icon: "☁️",
    level: "Junior",
    requirements: {
      type: "combination",
      frameworks: ["AWS", "Azure", "Google Cloud", "Firebase"],
      count: 1,
      description: "Completa proyectos utilizando al menos una plataforma cloud.",
    },
  },
  {
    id: "junior-security-specialist",
    name: "Especialista en Seguridad",
    description: "Implementación de medidas de seguridad avanzadas",
    icon: "🔒",
    level: "Junior",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos con enfoque en seguridad informática.",
    },
  },
  {
    id: "junior-performance-optimizer",
    name: "Optimizador de Rendimiento",
    description: "Mejora del rendimiento en aplicaciones",
    icon: "⚡",
    level: "Junior",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos con optimización avanzada de rendimiento.",
    },
  },
  {
    id: "junior-mobile-master",
    name: "Maestro Móvil",
    description: "Desarrollo avanzado de aplicaciones móviles",
    icon: "📲",
    level: "Junior",
    requirements: {
      type: "combination",
      frameworks: ["React Native", "Flutter", "Swift", "Kotlin"],
      count: 2,
      description: "Completa proyectos utilizando 2 frameworks móviles diferentes.",
    },
  },
  {
    id: "junior-devops-pioneer",
    name: "Pionero DevOps",
    description: "Implementación de prácticas DevOps",
    icon: "🔄",
    level: "Junior",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos que implementen CI/CD o prácticas DevOps.",
    },
  },

  // Senior Level Badges
  {
    id: "senior-tech-diversity",
    name: "Diversidad Tecnológica",
    description: "Dominio de múltiples tecnologías a nivel avanzado",
    icon: "🌐",
    level: "Senior",
    requirements: {
      type: "combination",
      languages: ["JavaScript", "Python", "Java", "C#", "Go", "Rust"],
      count: 3,
      projectCount: 3,
      description: "Completa al menos 3 proyectos en cada uno de 3 lenguajes diferentes de nivel Senior.",
    },
  },
  {
    id: "senior-architecture",
    name: "Arquitecto de Software",
    description: "Experiencia en diseño de sistemas complejos",
    icon: "🏛️",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 5,
      description: "Completa 5 proyectos de arquitectura de software complejos.",
    },
  },
  {
    id: "senior-mentor",
    name: "Mentor Tecnológico",
    description: "Dominio completo de múltiples niveles de desarrollo",
    icon: "👨‍🏫",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 20,
      description: "Completa 20 proyectos de diferentes niveles de dificultad.",
    },
  },
  {
    id: "senior-microservices-architect",
    name: "Arquitecto de Microservicios",
    description: "Diseño e implementación de arquitecturas de microservicios",
    icon: "🧱",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos basados en arquitectura de microservicios.",
    },
  },
  {
    id: "senior-ai-specialist",
    name: "Especialista en IA",
    description: "Implementación de soluciones de inteligencia artificial",
    icon: "🤖",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos que implementen algoritmos de IA o machine learning.",
    },
  },
  {
    id: "senior-scalability-expert",
    name: "Experto en Escalabilidad",
    description: "Diseño de sistemas altamente escalables",
    icon: "📈",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos con arquitecturas escalables para alto tráfico.",
    },
  },
  {
    id: "senior-security-architect",
    name: "Arquitecto de Seguridad",
    description: "Diseño de sistemas con seguridad avanzada",
    icon: "🛡️",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 3,
      description: "Completa 3 proyectos con enfoque en ciberseguridad avanzada.",
    },
  },
  {
    id: "senior-blockchain-pioneer",
    name: "Pionero en Blockchain",
    description: "Desarrollo de soluciones basadas en blockchain",
    icon: "⛓️",
    level: "Senior",
    requirements: {
      type: "projects",
      projectCount: 2,
      description: "Completa 2 proyectos que implementen tecnologías blockchain.",
    },
  },

  // Master Level Badges
  {
    id: "master-polyglot",
    name: "Maestro Políglota",
    description: "Dominio excepcional de múltiples lenguajes de programación",
    icon: "🌍",
    level: "Master",
    requirements: {
      type: "languages",
      count: 6,
      description:
        "Completa proyectos en 6 lenguajes de programación diferentes, con al menos 3 proyectos en cada uno.",
    },
  },
  {
    id: "master-dedication",
    name: "Dedicación Legendaria",
    description: "Compromiso extraordinario con el desarrollo de software",
    icon: "⏰",
    level: "Master",
    requirements: {
      type: "combination",
      projectCount: 50,
      streakDays: 15,
      description: "Completa 50 proyectos en total y mantén una racha de 15 días consecutivos.",
    },
  },
  {
    id: "master-completionist",
    name: "Completista Supremo",
    description: "Dominio completo de todos los aspectos del desarrollo",
    icon: "👑",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 30,
      description: "Completa 30 proyectos de diferentes categorías y niveles.",
    },
  },
  {
    id: "master-innovation-leader",
    name: "Líder en Innovación",
    description: "Creación de soluciones tecnológicas innovadoras",
    icon: "💡",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 5,
      description: "Completa 5 proyectos que implementen tecnologías emergentes o soluciones innovadoras.",
    },
  },
  {
    id: "master-system-architect",
    name: "Arquitecto de Sistemas",
    description: "Diseño de arquitecturas de sistemas complejos",
    icon: "🏗️",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 10,
      description: "Completa 10 proyectos de arquitectura de sistemas complejos.",
    },
  },
  {
    id: "master-tech-visionary",
    name: "Visionario Tecnológico",
    description: "Anticipación y adopción de tendencias tecnológicas",
    icon: "🔮",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 10,
      description: "Completa 10 proyectos con tecnologías emergentes.",
    },
  },
  {
    id: "master-security-guru",
    name: "Gurú de Seguridad",
    description: "Máxima autoridad en seguridad informática",
    icon: "🔐",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 5,
      description: "Completa 5 proyectos enfocados en seguridad avanzada.",
    },
  },
  {
    id: "master-performance-wizard",
    name: "Mago del Rendimiento",
    description: "Optimización extrema de rendimiento en sistemas",
    icon: "⚡",
    level: "Master",
    requirements: {
      type: "projects",
      projectCount: 8,
      description: "Completa 8 proyectos con optimizaciones avanzadas de rendimiento.",
    },
  },
  {
    id: "master-tech-evangelist",
    name: "Evangelista Tecnológico",
    description: "Promoción y difusión de buenas prácticas en desarrollo",
    icon: "📢",
    level: "Master",
    requirements: {
      type: "combination",
      projectCount: 25,
      streakDays: 20,
      description: "Completa 25 proyectos y mantén una racha de 20 días.",
    },
  },

  // Brainfuck Badges
  {
    id: "brainfuck-initiate",
    name: "Iniciado en Brainfuck",
    description: "Primeros pasos en el enigmático lenguaje Brainfuck",
    icon: "🧠",
    level: "Student",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 1,
      description: "Completa tu primer proyecto en Brainfuck.",
    },
  },
  {
    id: "brainfuck-explorer",
    name: "Explorador de Brainfuck",
    description: "Aventurándote más profundamente en Brainfuck",
    icon: "🔍",
    level: "Trainee",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 3,
      description: "Completa 3 proyectos en Brainfuck.",
    },
  },
  {
    id: "brainfuck-enthusiast",
    name: "Entusiasta de Brainfuck",
    description: "Desarrollando habilidades sólidas en Brainfuck",
    icon: "💭",
    level: "Junior",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 5,
      description: "Completa 5 proyectos en Brainfuck.",
    },
  },
  {
    id: "brainfuck-master",
    name: "Maestro de Brainfuck",
    description: "Dominio avanzado del lenguaje Brainfuck",
    icon: "🧩",
    level: "Senior",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 8,
      description: "Completa 8 proyectos en Brainfuck.",
    },
  },
  {
    id: "brainfuck-guru",
    name: "Gurú de Brainfuck",
    description: "Maestría excepcional en el arte de Brainfuck",
    icon: "👑",
    level: "Master",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 12,
      description: "Completa 12 proyectos en Brainfuck y conviértete en un verdadero maestro.",
    },
  },
  {
    id: "brainfuck-innovator",
    name: "Innovador de Brainfuck",
    description: "Creando soluciones innovadoras con Brainfuck",
    icon: "💡",
    level: "Master",
    requirements: {
      type: "combination",
      languages: ["Brainfuck"],
      projectCount: 15,
      description: "Completa 15 proyectos en Brainfuck, demostrando verdadera innovación.",
    },
  },
]

// Function to check if a badge is unlocked based on user's achievements and projects
export const checkBadgeUnlocked = (
  badge: Badge,
  achievements: any[],
  completedProjects: any[],
  streakDays: number,
): { unlocked: boolean; progress: number } => {
  const { requirements } = badge
  let unlocked = false
  let progress = 0

  switch (requirements.type) {
    case "achievements":
      if (requirements.specificIds) {
        // Check if specific achievements are unlocked
        const unlockedCount = requirements.specificIds.filter((id) =>
          achievements.some((a) => a.id === id && a.completed),
        ).length
        progress = Math.min(Math.floor((unlockedCount / requirements.specificIds.length) * 100), 100)
        unlocked = unlockedCount === requirements.specificIds.length
      } else if (requirements.count) {
        // Check if a certain number of achievements are unlocked
        const unlockedCount = achievements.filter((a) => a.completed).length
        progress = Math.min(Math.floor((unlockedCount / requirements.count) * 100), 100)
        unlocked = unlockedCount >= requirements.count
      }
      break

    case "projects":
      const relevantProjects = completedProjects.filter((project) => {
        if (badge.level === "Student") {
          return project.level === "Student"
        } else if (badge.level === "Trainee") {
          return ["Student", "Trainee"].includes(project.level)
        } else if (badge.level === "Junior") {
          return ["Student", "Trainee", "Junior"].includes(project.level)
        } else if (badge.level === "Senior") {
          return ["Junior", "Senior"].includes(project.level)
        } else {
          return true // Master level considers all projects
        }
      })

      if (requirements.projectCount) {
        progress = Math.min(Math.floor((relevantProjects.length / requirements.projectCount) * 100), 100)
        unlocked = relevantProjects.length >= requirements.projectCount
      }
      break

    case "languages":
      const uniqueLanguages = new Set<string>()
      completedProjects.forEach((project) => {
        project.technologies.forEach((tech: string) => uniqueLanguages.add(tech))
      })

      if (requirements.count) {
        progress = Math.min(Math.floor((uniqueLanguages.size / requirements.count) * 100), 100)
        unlocked = uniqueLanguages.size >= requirements.count
      }
      break

    case "frameworks":
      const uniqueFrameworks = new Set<string>()
      completedProjects.forEach((project) => {
        project.frameworks.forEach((framework: string) => uniqueFrameworks.add(framework))
      })

      if (requirements.count) {
        progress = Math.min(Math.floor((uniqueFrameworks.size / requirements.count) * 100), 100)
        unlocked = uniqueFrameworks.size >= requirements.count
      }
      break

    case "combination":
      let combinationProgress = 0
      let combinationTotal = 0
      let combinationUnlocked = true

      // Check language requirements
      if (requirements.languages && requirements.count) {
        const languageCounts: Record<string, number> = {}
        completedProjects.forEach((project) => {
          project.technologies.forEach((tech: string) => {
            if (requirements.languages!.includes(tech)) {
              languageCounts[tech] = (languageCounts[tech] || 0) + 1
            }
          })
        })

        const languagesWithEnoughProjects = Object.keys(languageCounts).filter(
          (lang) => languageCounts[lang] >= (requirements.projectCount || 1),
        ).length

        combinationProgress += languagesWithEnoughProjects
        combinationTotal += requirements.count
        combinationUnlocked = combinationUnlocked && languagesWithEnoughProjects >= requirements.count
      }

      // Check for specific language with project count
      if (requirements.languages && requirements.languages.length === 1 && requirements.projectCount) {
        const language = requirements.languages[0]
        const projectsWithLanguage = completedProjects.filter((project) =>
          project.technologies.includes(language),
        ).length

        progress = Math.min(Math.floor((projectsWithLanguage / requirements.projectCount) * 100), 100)
        unlocked = projectsWithLanguage >= requirements.projectCount
        return { unlocked, progress }
      }

      // Check project count requirements
      if (requirements.projectCount && !requirements.languages) {
        combinationProgress += Math.min(completedProjects.length, requirements.projectCount)
        combinationTotal += requirements.projectCount
        combinationUnlocked = combinationUnlocked && completedProjects.length >= requirements.projectCount
      }

      // Check streak requirements
      if (requirements.streakDays) {
        combinationProgress += Math.min(streakDays, requirements.streakDays)
        combinationTotal += requirements.streakDays
        combinationUnlocked = combinationUnlocked && streakDays >= requirements.streakDays
      }

      progress = combinationTotal > 0 ? Math.min(Math.floor((combinationProgress / combinationTotal) * 100), 100) : 0
      unlocked = combinationUnlocked
      break

    case "streak":
      if (requirements.streakDays) {
        progress = Math.min(Math.floor((streakDays / requirements.streakDays) * 100), 100)
        unlocked = streakDays >= requirements.streakDays
      }
      break
  }

  return { unlocked, progress }
}
