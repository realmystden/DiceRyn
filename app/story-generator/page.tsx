"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Roadmap } from "@/components/roadmap"
import { Button } from "@/components/ui/button"
import { BookOpen, RefreshCw } from "lucide-react"
import dynamic from "next/dynamic"

// Import StoryDice dynamically
const StoryDice = dynamic(() => import("@/components/story-dice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="text-xl font-fondamento text-white">Cargando dado...</div>
    </div>
  ),
})

// Datos para el generador de historias
const characters = [
  "un detective cansado",
  "una bruja novata",
  "un robot con sentimientos",
  "una exploradora intrépida",
  "un fantasma melancólico",
  "un superhéroe retirado",
  "una científica brillante",
  "un dragón disfrazado de humano",
  "un pirata reformado",
  "una viajera del tiempo perdida",
  "un hada rebelde",
  "un vampiro vegetariano",
  "una ninja adolescente",
  "un mago distraído",
  "una sirena varada en tierra",
]

const settings = [
  "una ciudad futurista abandonada",
  "un pequeño pueblo con un secreto oscuro",
  "una isla que aparece y desaparece",
  "una estación espacial al borde del colapso",
  "un bosque encantado que cambia constantemente",
  "un reino subterráneo olvidado",
  "una mansión con habitaciones que desafían la física",
  "un desierto donde llueven memorias",
  "una biblioteca infinita",
  "un tren que nunca se detiene",
  "un mundo donde la gravedad es impredecible",
  "una ciudad construida sobre el lomo de una criatura gigante",
  "un hotel entre dimensiones",
  "un planeta donde los sueños se materializan",
  "un barco que navega entre las nubes",
]

const plots = [
  "debe encontrar un objeto mágico antes que su rival",
  "descubre una conspiración que amenaza a todos",
  "se enfrenta a su mayor miedo para salvar a un ser querido",
  "debe resolver un misterio antes de que sea demasiado tarde",
  "emprende un viaje para romper una antigua maldición",
  "se encuentra atrapado en un bucle temporal",
  "debe infiltrarse en una organización peligrosa",
  "descubre que tiene poderes que no puede controlar",
  "debe elegir entre salvar el mundo o salvar a quien ama",
  "busca redención por un error del pasado",
  "se ve obligado a trabajar con su peor enemigo",
  "descubre que su vida entera ha sido una mentira",
  "debe recuperar recuerdos perdidos para sobrevivir",
  "se enfrenta a una versión malvada de sí mismo",
  "debe impedir que alguien cambie el curso de la historia",
]

const twists = [
  "el villano resulta ser un familiar cercano",
  "el objeto que busca está dentro de sí mismo",
  "descubre que es un clon",
  "todo era parte de un experimento",
  "el mundo entero es una simulación",
  "su mentor ha estado manipulándolo desde el principio",
  "su enemigo y aliado intercambian roles",
  "el protagonista es en realidad el antagonista de otra historia",
  "los eventos ocurren en orden inverso",
  "todo sucede en la mente de otra persona",
  "el protagonista muere pero la historia continúa",
  "el antagonista tenía razón todo el tiempo",
  "los eventos se repiten en un ciclo infinito",
  "la historia es contada por un narrador no confiable",
  "el final revela que todo era un sueño... o no",
]

export default function StoryGenerator() {
  const [mounted, setMounted] = useState(false)
  const [story, setStory] = useState<null | {
    character: string
    setting: string
    plot: string
    twist: string
  }>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [prompt, setPrompt] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRollComplete = (storyPrompt: string) => {
    setPrompt(storyPrompt)

    // Generate random story elements
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    const randomSetting = settings[Math.floor(Math.random() * settings.length)]
    const randomPlot = plots[Math.floor(Math.random() * plots.length)]
    const randomTwist = twists[Math.floor(Math.random() * twists.length)]

    setStory({
      character: randomCharacter,
      setting: randomSetting,
      plot: randomPlot,
      twist: randomTwist,
    })
  }

  const generateStory = () => {
    setIsRolling(true)
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
      title="Generador de Ideas para Historias Cortas"
      description="Obtén ideas aleatorias para tus historias con personajes, escenarios, tramas y giros inesperados."
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Botón de generación */}
        <div className="text-center mb-6">
          <Button
            onClick={generateStory}
            disabled={isRolling}
            className="px-8 py-6 bg-blue-700 hover:bg-blue-600 rounded-md font-fondamento text-lg transition-all flex items-center gap-2"
          >
            {isRolling ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generando idea...
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                Generar Idea para Historia
              </>
            )}
          </Button>
        </div>

        {/* Dado 3D */}
        <div className="w-full h-[400px] relative fantasy-card p-4 mb-8">
          <StoryDice
            onRollComplete={handleRollComplete}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
            height={400}
          />
        </div>

        {/* Contenedor separado para la idea generada */}
        <AnimatePresence>
          {(story || prompt || isRolling) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="fantasy-card p-6 rounded-lg border border-blue-800 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 mb-8"
            >
              <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-blue-300">Tu Idea de Historia</h2>

              {isRolling ? (
                <div className="text-center animate-pulse">
                  <p className="text-lg font-fondamento">Generando idea...</p>
                </div>
              ) : prompt ? (
                <div className="mb-6 p-4 bg-blue-900/30 rounded-lg">
                  <h3 className="text-lg font-cinzel text-blue-400 mb-2">Prompt:</h3>
                  <p className="text-xl font-fondamento">{prompt}</p>
                </div>
              ) : null}

              {story && (
                <div className="space-y-6 font-fondamento">
                  <div>
                    <h3 className="text-lg font-cinzel text-blue-400 mb-2">Personaje Principal:</h3>
                    <p className="text-xl">{story.character}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-blue-400 mb-2">Escenario:</h3>
                    <p className="text-xl">{story.setting}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-blue-400 mb-2">Trama:</h3>
                    <p className="text-xl">El protagonista {story.plot}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-blue-400 mb-2">Giro Inesperado:</h3>
                    <p className="text-xl">Pero al final, {story.twist}</p>
                  </div>

                  <div className="mt-8 p-4 bg-blue-950/50 rounded-lg border border-blue-900">
                    <h3 className="text-lg font-cinzel text-blue-300 mb-2">Historia Completa:</h3>
                    <p className="font-fondamento italic">
                      En {story.setting}, {story.character} {story.plot}. Tras muchos desafíos y aventuras, cuando todo
                      parece resolverse, descubre que {story.twist}.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón para mostrar/ocultar roadmap */}
        <div className="w-full text-center mt-12 mb-6">
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-md font-fondamento transition-all"
          >
            {showRoadmap ? "Ocultar Roadmap" : "Ver Roadmap de Escritura"}
          </button>
        </div>

        {/* Roadmap */}
        {showRoadmap && <Roadmap category="story" />}
      </div>
    </PageLayout>
  )
}
