"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

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
}

// Update the RoadmapProps interface to include an optional category prop
interface RoadmapProps {
  title?: string
  description?: string
  steps?: RoadmapStep[]
  accentColor?: string
  category?: string
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

                <div>
                  <h4 className="font-cinzel font-bold mb-2 text-gray-300">Proyectos recomendados:</h4>
                  <ul className="list-disc list-inside space-y-1 font-fondamento">
                    {step.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
