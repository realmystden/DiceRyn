"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Roadmap } from "@/components/roadmap"
import { Button } from "@/components/ui/button"
import { RefreshCw, CuboidIcon as Cube } from "lucide-react"
import dynamic from "next/dynamic"

// Import ModelDice dynamically
const ModelDice = dynamic(() => import("@/components/model-dice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="text-xl font-fondamento text-white">Cargando dado...</div>
    </div>
  ),
})

// Datos para el generador de modelos 3D
const categories = [
  "Personaje",
  "Criatura",
  "Vehículo",
  "Arma",
  "Prop",
  "Entorno",
  "Arquitectura",
  "Robot",
  "Mueble",
  "Planta",
  "Nave espacial",
  "Monstruo",
  "Máquina",
  "Objeto cotidiano",
  "Instrumento",
]

const styles = [
  "Realista",
  "Estilizado",
  "Low Poly",
  "Cartoon",
  "Sci-Fi",
  "Fantasy",
  "Steampunk",
  "Cyberpunk",
  "Post-apocalíptico",
  "Medieval",
  "Futurista",
  "Minimalista",
  "Voxel",
  "Anime",
  "Horror",
]

const details = [
  "con texturas detalladas",
  "con sistema de partículas",
  "con animación de ciclo",
  "con rig completo",
  "con efectos de luz",
  "con materiales PBR",
  "con pose dinámica",
  "con sistema de destrucción",
  "con variaciones de color",
  "con efectos de ambiente",
  "con detalles esculpidos",
  "con sistema modular",
  "con efectos de fluidos",
  "con detalles metálicos",
  "con efectos de desgaste",
]

const purposes = [
  "para un videojuego",
  "para una película de animación",
  "para realidad virtual",
  "para impresión 3D",
  "para un portfolio",
  "para un asset store",
  "para un cortometraje",
  "para una aplicación educativa",
  "para un simulador",
  "para un juego de mesa",
  "para una experiencia interactiva",
  "para un proyecto de arquitectura",
  "para un prototipo",
  "para una presentación",
  "para un museo virtual",
]

// Componente principal de la página
export default function ModelIdeas() {
  const [mounted, setMounted] = useState(false)
  const [idea, setIdea] = useState<null | {
    category: string
    style: string
    detail: string
    purpose: string
  }>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const generateIdea = () => {
    setIsGenerating(true)
    setIsRolling(true)

    // Simular un pequeño retraso para el efecto de "generación"
    setTimeout(() => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      const randomStyle = styles[Math.floor(Math.random() * styles.length)]
      const randomDetail = details[Math.floor(Math.random() * details.length)]
      const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)]

      setIdea({
        category: randomCategory,
        style: randomStyle,
        detail: randomDetail,
        purpose: randomPurpose,
      })

      setIsGenerating(false)

      // Dar tiempo para que el dado termine de rodar
      setTimeout(() => {
        setIsRolling(false)
      }, 1500)
    }, 800)
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
      title="Generador de Ideas para Modelos 3D"
      description="Obtén ideas aleatorias para tus proyectos de modelado 3D con categorías, estilos, técnicas y propósitos."
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Área del dado */}
          <div className="w-full md:w-1/2 h-[500px] relative">
            <ModelDice isRolling={isRolling} />
          </div>

          {/* Área de contenido */}
          <div className="w-full md:w-1/2">
            {/* Botón de generación */}
            <div className="text-center mb-8">
              <Button
                onClick={generateIdea}
                disabled={isGenerating}
                className="px-8 py-6 bg-green-700 hover:bg-green-600 rounded-md font-fondamento text-lg transition-all flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generando idea...
                  </>
                ) : (
                  <>
                    <Cube className="w-5 h-5" />
                    Generar Idea para Modelo 3D
                  </>
                )}
              </Button>
            </div>

            {/* Resultado */}
            <AnimatePresence>
              {idea && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="fantasy-card p-6 rounded-lg border border-green-800 bg-gradient-to-br from-green-900/30 to-teal-900/30"
                >
                  <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-green-300">
                    Tu Idea de Modelo 3D
                  </h2>

                  <div className="space-y-6 font-fondamento">
                    <div>
                      <h3 className="text-lg font-cinzel text-green-400 mb-2">Categoría:</h3>
                      <p className="text-xl">{idea.category}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-cinzel text-green-400 mb-2">Estilo:</h3>
                      <p className="text-xl">{idea.style}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-cinzel text-green-400 mb-2">Detalle:</h3>
                      <p className="text-xl">{idea.detail}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-cinzel text-green-400 mb-2">Propósito:</h3>
                      <p className="text-xl">{idea.purpose}</p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-green-950/50 rounded-lg border border-green-900">
                    <h3 className="text-lg font-cinzel text-green-300 mb-2">Descripción Completa:</h3>
                    <p className="font-fondamento italic">
                      Crea un {idea.category} en estilo {idea.style}, {idea.detail}, {idea.purpose}.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Botón para mostrar/ocultar roadmap */}
        <div className="w-full text-center mt-12 mb-6">
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="px-6 py-3 bg-green-700 hover:bg-green-600 rounded-md font-fondamento transition-all"
          >
            {showRoadmap ? "Ocultar Roadmap" : "Ver Roadmap de Modelado 3D"}
          </button>
        </div>

        {/* Roadmap */}
        {showRoadmap && (
          <Roadmap
            title="Roadmap de Modelado 3D"
            description="Guía paso a paso para convertirte en un experto en modelado 3D"
            steps={[
              {
                level: "Principiante",
                title: "Fundamentos del Modelado 3D",
                description: "Aprende los conceptos básicos del modelado 3D y familiarízate con el software.",
                skills: [
                  "Navegación en el espacio 3D",
                  "Modelado con primitivas básicas",
                  "Transformaciones básicas (mover, rotar, escalar)",
                  "Conceptos de topología simple",
                  "Materiales y texturas básicas",
                ],
                projects: [
                  "Objetos simples con primitivas",
                  "Props básicos para interiores",
                  "Personaje low-poly simple",
                  "Escenario minimalista",
                  "Recreación de objetos cotidianos simples",
                ],
              },
              {
                level: "Intermedio",
                title: "Técnicas Avanzadas y Especialización",
                description: "Profundiza en técnicas más avanzadas y comienza a especializarte en áreas específicas.",
                skills: [
                  "Modelado orgánico básico",
                  "Hard surface modeling",
                  "UV unwrapping eficiente",
                  "Texturizado PBR básico",
                  "Rigging y animación básica",
                ],
                projects: [
                  "Personaje con topología correcta",
                  "Vehículo o máquina con partes móviles",
                  "Entorno detallado con varios assets",
                  "Criatura con anatomía correcta",
                  "Objeto con texturizado PBR completo",
                ],
              },
              {
                level: "Avanzado",
                title: "Maestría y Optimización",
                description: "Domina técnicas avanzadas y aprende a optimizar modelos para diferentes plataformas.",
                skills: [
                  "Esculpido digital avanzado",
                  "Retopología y optimización",
                  "Texturizado avanzado y baking",
                  "Sistemas de partículas y efectos",
                  "Pipeline profesional de producción",
                ],
                projects: [
                  "Personaje hiperrealista con blend shapes",
                  "Entorno completo optimizado para tiempo real",
                  "Demo reel con variedad de modelos",
                  "Asset pack temático completo",
                  "Escena con iluminación y efectos avanzados",
                ],
              },
            ]}
            accentColor="green"
          />
        )}
      </div>
    </PageLayout>
  )
}
