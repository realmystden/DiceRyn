"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Roadmap } from "@/components/roadmap"
import { Button } from "@/components/ui/button"
import { RefreshCw, PenTool } from "lucide-react"
import dynamic from "next/dynamic"

// Import AnimeDice dynamically
const AnimeDice = dynamic(() => import("@/components/anime-dice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="text-xl font-fondamento text-white">Cargando dado...</div>
    </div>
  ),
})

// Datos para el generador de ideas de dibujos anime
const characters = [
  "una chica maga con cabello multicolor",
  "un samurái con una espada maldita",
  "un chico con poderes elementales",
  "una idol que es secretamente una superheroína",
  "un demonio reformado que ayuda a humanos",
  "una androide que busca emociones humanas",
  "un estudiante de preparatoria con un secreto sobrenatural",
  "una princesa guerrera de un reino lejano",
  "un ninja moderno en una ciudad futurista",
  "un espíritu de la naturaleza con forma humanoide",
  "un cazador de monstruos con habilidades únicas",
  "una bruja que controla el tiempo",
  "un viajero interdimensional perdido",
  "un chef con armas culinarias mágicas",
  "un detective paranormal con un familiar espiritual",
]

const poses = [
  "en posición de batalla con su arma característica",
  "saltando desde un edificio alto",
  "en una pose heroica con el viento moviendo su ropa",
  "sentado tranquilamente bajo un árbol de cerezo",
  "realizando un hechizo mágico con círculos arcanos",
  "en medio de una transformación dramática",
  "corriendo a toda velocidad",
  "en una pose kawaii con signos de paz",
  "meditando con aura visible a su alrededor",
  "en un momento emotivo con lágrimas dramáticas",
  "en una pose de victoria tras una batalla",
  "en un momento cotidiano que muestra su personalidad",
  "interactuando con su mascota o familiar mágico",
  "mostrando su poder especial en todo su esplendor",
  "en una pose dinámica que muestra movimiento",
]

const settings = [
  "una academia de magia con arquitectura imposible",
  "un campo de batalla post-apocalíptico",
  "una ciudad futurista con elementos tradicionales japoneses",
  "un bosque espiritual con criaturas luminiscentes",
  "un reino flotante entre las nubes",
  "una estación espacial con gravedad artificial",
  "un festival tradicional japonés con elementos fantásticos",
  "un mundo subacuático con civilizaciones avanzadas",
  "una dimensión paralela con física alterada",
  "un café temático con clientes no humanos",
  "un templo antiguo con tecnología avanzada",
  "una isla que aparece solo durante la luna llena",
  "un tren interdimensional que conecta mundos",
  "un coliseo donde se celebran duelos mágicos",
  "una ciudad oculta dentro de un árbol gigante",
]

const styles = [
  "estilo shonen con líneas dinámicas y efectos de acción",
  "estilo shoujo con detalles delicados y efectos brillantes",
  "estilo chibi adorable con proporciones exageradas",
  "estilo seinen realista con anatomía detallada",
  "estilo acuarela con colores suaves y difuminados",
  "estilo minimalista con pocos trazos pero expresivos",
  "estilo cyberpunk con neones y elementos tecnológicos",
  "estilo tradicional japonés mezclado con anime moderno",
  "estilo oscuro y sombrío con alto contraste",
  "estilo pastel con colores suaves y atmósfera soñadora",
  "estilo manga monocromático con tramas detalladas",
  "estilo moe con personajes adorables y expresivos",
  "estilo de anime de los 90 con nostalgia retro",
  "estilo experimental con perspectivas inusuales",
  "estilo de anime moderno con efectos digitales avanzados",
]

// Roadmap para el desarrollo de habilidades de dibujo anime
const animeDrawingRoadmap = [
  {
    level: "Principiante",
    title: "Fundamentos del Dibujo Anime",
    description: "Aprende los conceptos básicos del dibujo de anime y manga.",
    skills: [
      "Proporciones básicas de personajes anime",
      "Dibujo de rostros y expresiones simples",
      "Anatomía básica estilizada",
      "Líneas limpias y consistentes",
      "Conceptos básicos de sombreado",
    ],
    projects: [
      "Retratos frontales de personajes anime",
      "Expresiones faciales básicas",
      "Poses simples de cuerpo completo",
      "Copiar diseños de personajes existentes",
      "Crear un personaje original simple",
    ],
  },
  {
    level: "Intermedio",
    title: "Desarrollo de Estilo y Técnica",
    description: "Profundiza en técnicas más avanzadas y comienza a desarrollar un estilo propio.",
    skills: [
      "Anatomía anime avanzada",
      "Perspectiva y poses dinámicas",
      "Diseño de vestuario y accesorios",
      "Técnicas de coloreado básicas",
      "Expresiones faciales complejas",
    ],
    projects: [
      "Personajes en poses dinámicas",
      "Ilustraciones con fondos simples",
      "Diseño de personajes originales detallados",
      "Escenas con múltiples personajes",
      "Experimentación con diferentes estilos de anime",
    ],
  },
  {
    level: "Avanzado",
    title: "Maestría en Ilustración Anime",
    description: "Domina técnicas avanzadas y desarrolla un estilo distintivo.",
    skills: [
      "Composición avanzada",
      "Técnicas de iluminación complejas",
      "Diseño de escenarios detallados",
      "Narrativa visual",
      "Técnicas de coloreado avanzadas",
    ],
    projects: [
      "Ilustraciones completas con fondos detallados",
      "Secuencias de acción dinámicas",
      "Escenas emotivas con atmósfera",
      "Portadas de manga o novela ligera",
      "Serie de ilustraciones con tema coherente",
    ],
  },
  {
    level: "Experto",
    title: "Innovación y Profesionalismo",
    description: "Lleva tu arte al nivel profesional y desarrolla un estilo único reconocible.",
    skills: [
      "Dirección de arte y conceptos visuales",
      "Técnicas mixtas y experimentales",
      "Workflow profesional y eficiente",
      "Adaptación a diferentes estilos según necesidades",
      "Narrativa visual avanzada",
    ],
    projects: [
      "Portafolio profesional de ilustraciones",
      "Webcomic o manga original",
      "Concept art para personajes y escenarios",
      "Ilustraciones comerciales",
      "Dirección de arte para proyectos colaborativos",
    ],
  },
]

export default function AnimeDrawingIdeas() {
  const [mounted, setMounted] = useState(false)
  const [drawingIdea, setDrawingIdea] = useState<null | {
    character: string
    pose: string
    setting: string
    style: string
  }>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [prompt, setPrompt] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRollComplete = (drawingPrompt: string) => {
    setPrompt(drawingPrompt)

    // Generate random drawing elements
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    const randomPose = poses[Math.floor(Math.random() * poses.length)]
    const randomSetting = settings[Math.floor(Math.random() * settings.length)]
    const randomStyle = styles[Math.floor(Math.random() * styles.length)]

    setDrawingIdea({
      character: randomCharacter,
      pose: randomPose,
      setting: randomSetting,
      style: randomStyle,
    })
  }

  const generateDrawingIdea = () => {
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
      title="Generador de Ideas para Dibujos Anime"
      description="Obtén ideas aleatorias para tus ilustraciones de anime con personajes, poses, escenarios y estilos."
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Botón de generación */}
        <div className="text-center mb-6">
          <Button
            onClick={generateDrawingIdea}
            disabled={isRolling}
            className="px-8 py-6 bg-pink-700 hover:bg-pink-600 rounded-md font-fondamento text-lg transition-all flex items-center gap-2"
          >
            {isRolling ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generando idea...
              </>
            ) : (
              <>
                <PenTool className="w-5 h-5" />
                Generar Idea para Dibujo
              </>
            )}
          </Button>
        </div>

        {/* Dado 3D */}
        <div className="w-full h-[400px] relative fantasy-card p-4 mb-8 bg-gradient-to-br from-pink-900/30 to-purple-900/30">
          <AnimeDice
            onRollComplete={handleRollComplete}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
            height={400}
          />
        </div>

        {/* Contenedor separado para la idea generada */}
        <AnimatePresence>
          {(drawingIdea || prompt || isRolling) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="fantasy-card p-6 rounded-lg border border-pink-800 bg-gradient-to-br from-pink-900/30 to-purple-900/30 mb-8"
            >
              <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-pink-300">Tu Idea de Dibujo Anime</h2>

              {isRolling ? (
                <div className="text-center animate-pulse">
                  <p className="text-lg font-fondamento">Generando idea...</p>
                </div>
              ) : prompt ? (
                <div className="mb-6 p-4 bg-pink-900/30 rounded-lg">
                  <h3 className="text-lg font-cinzel text-pink-400 mb-2">Prompt:</h3>
                  <p className="text-xl font-fondamento">{prompt}</p>
                </div>
              ) : null}

              {drawingIdea && (
                <div className="space-y-6 font-fondamento">
                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Personaje:</h3>
                    <p className="text-xl">{drawingIdea.character}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Pose:</h3>
                    <p className="text-xl">{drawingIdea.pose}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Escenario:</h3>
                    <p className="text-xl">{drawingIdea.setting}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Estilo:</h3>
                    <p className="text-xl">{drawingIdea.style}</p>
                  </div>

                  <div className="mt-8 p-4 bg-pink-950/50 rounded-lg border border-pink-900">
                    <h3 className="text-lg font-cinzel text-pink-300 mb-2">Descripción Completa:</h3>
                    <p className="font-fondamento italic">
                      Dibuja a {drawingIdea.character} {drawingIdea.pose} en {drawingIdea.setting}, utilizando{" "}
                      {drawingIdea.style}.
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
            className="px-6 py-3 bg-pink-700 hover:bg-pink-600 rounded-md font-fondamento transition-all"
          >
            {showRoadmap ? "Ocultar Roadmap" : "Ver Roadmap de Dibujo Anime"}
          </button>
        </div>

        {/* Roadmap */}
        {showRoadmap && (
          <Roadmap
            title="Roadmap de Dibujo de Anime"
            description="Guía paso a paso para convertirte en un experto en ilustración de anime"
            steps={animeDrawingRoadmap}
            accentColor="pink"
          />
        )}
      </div>
    </PageLayout>
  )
}
