"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, BookOpen, Link, Video, Code } from "lucide-react"

// Definir la interfaz para los recursos de aprendizaje
interface LearningResource {
  title: string
  url: string
  type: "article" | "video" | "course" | "book" | "tool" | "documentation"
  free: boolean
}

// Add these roadmap data at the top of the file, after the imports
const roadmapData = {
  story: {
    title: "Roadmap de Escritura Creativa",
    description: "Una guía para desarrollar tus habilidades como escritor de historias",
    accentColor: "blue",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos de la Narrativa",
        description: "Aprende los conceptos básicos de la narración y la estructura de historias.",
        skills: [
          "Desarrollo de personajes básicos",
          "Estructura de tres actos",
          "Narración en primera y tercera persona",
          "Diálogos básicos",
          "Descripción de escenarios",
        ],
        projects: [
          "Escribir un relato corto de 1000 palabras",
          "Crear un perfil detallado de personaje",
          "Escribir una escena con diálogo entre dos personajes",
          "Describir un escenario utilizando los cinco sentidos",
        ],
        resources: [
          {
            title: "Elementos de la Narrativa",
            url: "https://www.masterclass.com/articles/what-are-the-elements-of-a-story",
            type: "article",
            free: true,
          },
          {
            title: "Curso de Escritura Creativa para Principiantes",
            url: "https://www.coursera.org/learn/craft-of-plot",
            type: "course",
            free: false,
          },
          {
            title: "Cómo Escribir Diálogos Efectivos",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "On Writing: A Memoir of the Craft - Stephen King",
            url: "https://www.goodreads.com/book/show/10569.On_Writing",
            type: "book",
            free: false,
          },
        ],
      },
      {
        level: "Intermedio",
        title: "Técnicas Narrativas Avanzadas",
        description: "Profundiza en técnicas más complejas y desarrolla tu voz como escritor.",
        skills: [
          "Arcos de personaje complejos",
          "Subtexto y simbolismo",
          "Construcción de mundos",
          "Manejo de múltiples líneas argumentales",
          "Técnicas de tensión narrativa",
        ],
        projects: [
          "Escribir un relato con múltiples perspectivas",
          "Crear un mundo ficticio con sus propias reglas",
          "Escribir una historia con un giro inesperado",
          "Desarrollar una novela corta con subtramas",
        ],
        resources: [
          {
            title: "Masterclass de Neil Gaiman sobre Storytelling",
            url: "https://www.masterclass.com/classes/neil-gaiman-teaches-the-art-of-storytelling",
            type: "course",
            free: false,
          },
          {
            title: "Construcción de Mundos para Escritores",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Save the Cat! Writes a Novel - Jessica Brody",
            url: "https://www.goodreads.com/book/show/38348667-save-the-cat-writes-a-novel",
            type: "book",
            free: false,
          },
          {
            title: "Herramienta de Mapeo de Tramas",
            url: "https://www.plottr.com/",
            type: "tool",
            free: false,
          },
        ],
      },
      {
        level: "Avanzado",
        title: "Maestría Narrativa",
        description: "Perfecciona tu arte y desarrolla obras literarias complejas y significativas.",
        skills: [
          "Experimentación con estructura narrativa",
          "Temas filosóficos y sociales complejos",
          "Metaficción y narrativas experimentales",
          "Edición y revisión profesional",
          "Desarrollo de estilo literario único",
        ],
        projects: [
          "Escribir una novela completa",
          "Crear una serie de relatos interconectados",
          "Desarrollar una obra con capas de significado",
          "Experimentar con formatos narrativos no convencionales",
        ],
        resources: [
          {
            title: "Story: Substance, Structure, Style - Robert McKee",
            url: "https://www.goodreads.com/book/show/48654.Story",
            type: "book",
            free: false,
          },
          {
            title: "Técnicas Avanzadas de Edición Literaria",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Comunidad de Crítica Literaria Avanzada",
            url: "https://www.scribophile.com/",
            type: "tool",
            free: true,
          },
          {
            title: "Curso de Narrativas Experimentales",
            url: "https://www.udemy.com/course/experimental-fiction/",
            type: "course",
            free: false,
          },
        ],
      },
    ],
  },
  anime: {
    title: "Roadmap de Dibujo de Anime",
    description: "Una guía para desarrollar tus habilidades como artista de anime",
    accentColor: "pink",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos del Dibujo",
        description: "Aprende los conceptos básicos del dibujo y las proporciones del estilo anime.",
        skills: [
          "Formas básicas y líneas",
          "Proporciones faciales de anime",
          "Expresiones básicas",
          "Poses simples",
          "Sombreado básico",
        ],
        projects: [
          "Dibujar rostros de anime desde diferentes ángulos",
          "Crear una hoja de expresiones para un personaje",
          "Dibujar un personaje de cuerpo completo en pose estática",
          "Recrear un personaje de anime existente",
        ],
        resources: [
          {
            title: "Cómo Dibujar Manga: Guía para Principiantes",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Proporciones Faciales en el Estilo Anime",
            url: "https://www.clip-studio.com/how-to-draw/tutorials/how-to-draw-anime-face",
            type: "article",
            free: true,
          },
          {
            title: "Curso Básico de Dibujo de Anime",
            url: "https://www.udemy.com/course/anime-drawing-for-beginners/",
            type: "course",
            free: false,
          },
          {
            title: "Procreate para Artistas de Anime",
            url: "https://procreate.art/",
            type: "tool",
            free: false,
          },
        ],
      },
      {
        level: "Intermedio",
        title: "Desarrollo de Personajes",
        description: "Profundiza en la creación de personajes únicos y dinámicos.",
        skills: [
          "Diseño de personajes originales",
          "Anatomía estilizada",
          "Ropa y accesorios",
          "Poses dinámicas",
          "Técnicas de coloreado",
        ],
        projects: [
          "Crear una hoja de modelo de personaje original",
          "Dibujar un personaje en diferentes atuendos",
          "Ilustrar una escena con dos personajes interactuando",
          "Desarrollar un personaje con un estilo único",
        ],
        resources: [
          {
            title: "Anatomía para Artistas de Manga",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Diseño de Personajes de Anime: Más Allá de lo Básico",
            url: "https://www.skillshare.com/classes/character-design-anime/",
            type: "course",
            free: false,
          },
          {
            title: "Técnicas de Coloreado Digital para Anime",
            url: "https://www.deviantart.com/tutorials/anime-coloring",
            type: "article",
            free: true,
          },
          {
            title: "Clip Studio Paint: La Herramienta Definitiva para Manga",
            url: "https://www.clipstudio.net/",
            type: "tool",
            free: false,
          },
        ],
      },
      {
        level: "Avanzado",
        title: "Ilustración Profesional",
        description: "Perfecciona tu arte y desarrolla ilustraciones de nivel profesional.",
        skills: [
          "Composición avanzada",
          "Efectos de iluminación complejos",
          "Fondos y ambientes",
          "Narrativa visual",
          "Técnicas digitales avanzadas",
        ],
        projects: [
          "Crear una ilustración completa con personaje y fondo",
          "Desarrollar una página de manga o cómic",
          "Diseñar un grupo de personajes para una historia",
          "Crear una ilustración con efectos visuales avanzados",
        ],
        resources: [
          {
            title: "Masterclass de Iluminación y Color en Ilustración de Anime",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Composición Avanzada para Ilustradores",
            url: "https://www.domestika.org/courses/composition-for-illustrators",
            type: "course",
            free: false,
          },
          {
            title: "Framed Ink: Drawing and Composition for Visual Storytellers",
            url: "https://www.goodreads.com/book/show/8564060-framed-ink",
            type: "book",
            free: false,
          },
          {
            title: "Comunidad de Crítica para Artistas de Anime",
            url: "https://www.artstation.com/",
            type: "tool",
            free: true,
          },
        ],
      },
    ],
  },
  model: {
    title: "Roadmap de Modelado 3D",
    description: "Una guía para desarrollar tus habilidades como artista 3D",
    accentColor: "green",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos del Modelado 3D",
        description: "Aprende los conceptos básicos del modelado 3D y la navegación en software.",
        skills: [
          "Modelado de primitivas",
          "Transformaciones básicas",
          "Navegación en el espacio 3D",
          "Modelado poligonal básico",
          "Materiales simples",
        ],
        projects: [
          "Crear objetos simples usando primitivas",
          "Modelar un objeto cotidiano sencillo",
          "Crear un personaje simple con formas básicas",
          "Diseñar un entorno minimalista",
        ],
        resources: [
          {
            title: "Introducción a Blender 3D",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Fundamentos del Modelado 3D",
            url: "https://www.udemy.com/course/blender-3d-modeling-fundamentals/",
            type: "course",
            free: false,
          },
          {
            title: "Blender: Software de Modelado 3D Gratuito",
            url: "https://www.blender.org/",
            type: "tool",
            free: true,
          },
          {
            title: "Guía de Navegación en el Espacio 3D",
            url: "https://docs.blender.org/manual/en/latest/interface/navigating.html",
            type: "documentation",
            free: true,
          },
        ],
      },
      {
        level: "Intermedio",
        title: "Técnicas Avanzadas de Modelado",
        description: "Profundiza en técnicas más complejas y flujos de trabajo profesionales.",
        skills: [
          "Topología y retopología",
          "Esculpido digital",
          "UV unwrapping",
          "Texturizado intermedio",
          "Rigging básico",
        ],
        projects: [
          "Modelar un personaje con buena topología",
          "Crear un asset para videojuegos optimizado",
          "Diseñar un entorno detallado",
          "Modelar y texturizar un prop detallado",
        ],
        resources: [
          {
            title: "Masterclass de Topología para Personajes 3D",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Curso de Esculpido Digital con ZBrush",
            url: "https://www.pluralsight.com/courses/zbrush-digital-sculpting",
            type: "course",
            free: false,
          },
          {
            title: "Substance Painter: Herramienta de Texturizado Profesional",
            url: "https://www.substance3d.com/products/substance-painter/",
            type: "tool",
            free: false,
          },
          {
            title: "Guía Completa de UV Mapping",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
        ],
      },
      {
        level: "Avanzado",
        title: "Maestría en Arte 3D",
        description: "Perfecciona tu arte y desarrolla modelos de nivel profesional.",
        skills: [
          "Esculpido orgánico avanzado",
          "Texturizado PBR avanzado",
          "Rigging y animación",
          "Iluminación y renderizado",
          "Efectos visuales y partículas",
        ],
        projects: [
          "Crear un personaje fotorrealista completo",
          "Desarrollar un entorno 3D inmersivo",
          "Animar una secuencia con un personaje rigged",
          "Crear un portfolio de modelos para industria",
        ],
        resources: [
          {
            title: "Renderizado Fotorrealista con Arnold",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Curso Avanzado de Animación de Personajes",
            url: "https://www.cgspectrum.com/courses/advanced-3d-character-animation",
            type: "course",
            free: false,
          },
          {
            title: "Houdini: Software para Efectos Visuales Avanzados",
            url: "https://www.sidefx.com/",
            type: "tool",
            free: false,
          },
          {
            title: "The Art of 3D Computer Animation and Effects",
            url: "https://www.goodreads.com/book/show/1385969.The_Art_of_3D_Computer_Animation_and_Effects",
            type: "book",
            free: false,
          },
        ],
      },
    ],
  },
  tech: {
    title: "Roadmap de Desarrollo Tecnológico",
    description: "Una guía para desarrollar tus habilidades como desarrollador",
    accentColor: "purple",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos de Programación",
        description: "Aprende los conceptos básicos de la programación y el desarrollo web.",
        skills: [
          "HTML y CSS básicos",
          "JavaScript fundamentals",
          "Control de versiones con Git",
          "Lógica de programación",
          "Estructuras de datos básicas",
        ],
        projects: [
          "Crear una página web personal",
          "Desarrollar una aplicación de lista de tareas",
          "Construir una calculadora interactiva",
          "Crear un juego simple como Piedra, Papel o Tijera",
        ],
        resources: [
          {
            title: "freeCodeCamp: Responsive Web Design",
            url: "https://www.freecodecamp.org/learn/responsive-web-design/",
            type: "course",
            free: true,
          },
          {
            title: "JavaScript.info - El Lenguaje JavaScript Moderno",
            url: "https://javascript.info/",
            type: "documentation",
            free: true,
          },
          {
            title: "Git & GitHub Crash Course",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "video",
            free: true,
          },
          {
            title: "Visual Studio Code: Editor de Código",
            url: "https://code.visualstudio.com/",
            type: "tool",
            free: true,
          },
        ],
      },
      {
        level: "Intermedio",
        title: "Desarrollo de Aplicaciones",
        description: "Profundiza en frameworks y técnicas más avanzadas.",
        skills: [
          "Frameworks frontend (React, Vue, etc.)",
          "Desarrollo backend básico",
          "Bases de datos relacionales y NoSQL",
          "APIs RESTful",
          "Autenticación y autorización",
        ],
        projects: [
          "Desarrollar una aplicación full-stack",
          "Crear un clon de una aplicación popular",
          "Construir una API para un servicio",
          "Implementar un sistema de autenticación",
        ],
        resources: [
          {
            title: "Documentación Oficial de React",
            url: "https://reactjs.org/docs/getting-started.html",
            type: "documentation",
            free: true,
          },
          {
            title: "The Complete Node.js Developer Course",
            url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
            type: "course",
            free: false,
          },
          {
            title: "MongoDB University: Cursos Gratuitos",
            url: "https://university.mongodb.com/",
            type: "course",
            free: true,
          },
          {
            title: "Postman: Herramienta para Probar APIs",
            url: "https://www.postman.com/",
            type: "tool",
            free: true,
          },
        ],
      },
      {
        level: "Avanzado",
        title: "Arquitectura y Escalabilidad",
        description: "Perfecciona tus habilidades con técnicas avanzadas y arquitecturas complejas.",
        skills: [
          "Arquitectura de software",
          "DevOps y CI/CD",
          "Microservicios",
          "Optimización de rendimiento",
          "Seguridad avanzada",
        ],
        projects: [
          "Desarrollar una aplicación con arquitectura de microservicios",
          "Implementar un pipeline de CI/CD completo",
          "Crear una aplicación escalable en la nube",
          "Desarrollar un proyecto open source",
        ],
        resources: [
          {
            title: "Patrones de Diseño en JavaScript",
            url: "https://www.patterns.dev/",
            type: "documentation",
            free: true,
          },
          {
            title: "AWS Certified Solutions Architect",
            url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            type: "course",
            free: false,
          },
          {
            title: "Docker & Kubernetes: The Practical Guide",
            url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
            type: "course",
            free: false,
          },
          {
            title: "Web Security Academy",
            url: "https://portswigger.net/web-security",
            type: "documentation",
            free: true,
          },
        ],
      },
    ],
  },
}

// Define the RoadmapStep interface
interface RoadmapStep {
  level: string
  title: string
  description: string
  skills: string[]
  projects: string[]
  resources?: LearningResource[]
}

// Update the RoadmapProps interface to include an optional category prop
interface RoadmapProps {
  title?: string
  description?: string
  steps?: RoadmapStep[]
  accentColor?: string
  category?: string
}

// Función para obtener el icono según el tipo de recurso
const getResourceIcon = (type: string) => {
  switch (type) {
    case "article":
      return <BookOpen className="w-4 h-4" />
    case "video":
      return <Video className="w-4 h-4" />
    case "course":
      return <BookOpen className="w-4 h-4" />
    case "book":
      return <BookOpen className="w-4 h-4" />
    case "tool":
      return <Code className="w-4 h-4" />
    case "documentation":
      return <BookOpen className="w-4 h-4" />
    default:
      return <Link className="w-4 h-4" />
  }
}

export function Roadmap({ title, description, steps, accentColor, category }: RoadmapProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  // If category is provided, use the corresponding roadmap data
  const roadmapTitle = title || (category && roadmapData[category]?.title) || "Roadmap"
  const roadmapDescription =
    description || (category && roadmapData[category]?.description) || "Una guía para desarrollar tus habilidades"
  const roadmapSteps = steps || (category && roadmapData[category]?.steps) || []
  const roadmapAccentColor = accentColor || (category && roadmapData[category]?.accentColor) || "blue"

  const toggleStep = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null)
    } else {
      setExpandedStep(index)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel font-bold mb-3">{roadmapTitle}</h2>
        <p className="text-lg font-fondamento opacity-90">{roadmapDescription}</p>
      </div>

      <div className="space-y-4">
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={step.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50`}
          >
            <button
              onClick={() => toggleStep(index)}
              className={`w-full p-4 flex justify-between items-center text-left transition-colors ${
                expandedStep === index ? `bg-${roadmapAccentColor}-900/30` : ""
              }`}
            >
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-md bg-${roadmapAccentColor}-700 text-white mb-2`}
                >
                  {step.level}
                </span>
                <h3 className="text-xl font-cinzel font-bold">{step.title}</h3>
              </div>
              {expandedStep === index ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedStep === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-t border-gray-800"
              >
                <p className="font-fondamento mb-4">{step.description}</p>

                <div className="mb-4">
                  <h4 className="font-cinzel font-bold mb-2 text-gray-300">Habilidades a desarrollar:</h4>
                  <ul className="list-disc list-inside space-y-1 font-fondamento">
                    {step.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-cinzel font-bold mb-2 text-gray-300">Proyectos recomendados:</h4>
                  <ul className="list-disc list-inside space-y-1 font-fondamento">
                    {step.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>

                {step.resources && step.resources.length > 0 && (
                  <div>
                    <h4 className="font-cinzel font-bold mb-2 text-gray-300">Recursos de aprendizaje:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.resources.map((resource, i) => (
                        <a
                          key={i}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center p-3 rounded-md transition-colors hover:bg-${roadmapAccentColor}-900/30 border border-gray-700`}
                        >
                          <div className={`mr-3 p-2 rounded-full bg-${roadmapAccentColor}-900/50`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-fondamento text-sm font-medium">{resource.title}</p>
                            <div className="flex items-center mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${resource.free ? "bg-green-900/50 text-green-300" : "bg-amber-900/50 text-amber-300"}`}
                              >
                                {resource.free ? "Gratis" : "De pago"}
                              </span>
                              <span className="text-xs ml-2 text-gray-400 capitalize">{resource.type}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
