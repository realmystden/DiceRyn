"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Roadmap } from "@/components/roadmap"
import { Button } from "@/components/ui/button"
import { RefreshCw, Tv2 } from "lucide-react"
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

// Datos para el generador de anime
const genres = [
  "Shonen (acción y aventura)",
  "Shojo (romance y drama)",
  "Seinen (temática adulta y compleja)",
  "Isekai (transportado a otro mundo)",
  "Mecha (robots y tecnología)",
  "Slice of Life (vida cotidiana)",
  "Fantasy (mundos mágicos)",
  "Horror (terror y suspenso)",
  "Mystery (misterio e intriga)",
  "Sports (deportes y competición)",
  "Comedy (comedia y situaciones humorísticas)",
  "Psychological (análisis psicológico)",
  "Historical (ambientación histórica)",
  "Cyberpunk (futuro distópico tecnológico)",
  "Supernatural (elementos sobrenaturales)",
]

const characters = [
  "un estudiante con un poder oculto",
  "un samurai con un pasado misterioso",
  "una chica mágica con una misión",
  "un robot con conciencia propia",
  "un detective sobrenatural",
  "un ninja en entrenamiento",
  "un viajero de mundos paralelos",
  "un cazador de monstruos",
  "un piloto de mecha novato",
  "un dios caído en desgracia",
  "un villano redimido",
  "un héroe reluctante",
  "un ser mitológico en el mundo moderno",
  "un idol con un secreto oscuro",
  "un científico con experimentos prohibidos",
]

const settings = [
  "una academia para personas con habilidades especiales",
  "un Japón feudal con elementos fantásticos",
  "un mundo post-apocalíptico",
  "una ciudad futurista con alta tecnología",
  "un reino mágico en guerra",
  "un universo donde los humanos conviven con criaturas mitológicas",
  "una realidad virtual donde los jugadores quedan atrapados",
  "una organización secreta que protege a la humanidad",
  "un torneo de artes marciales con participantes sobrenaturales",
  "una nave espacial en una misión de exploración",
  "un mundo donde la magia es una forma de tecnología",
  "una dimensión paralela con reglas diferentes",
  "una escuela normal que esconde secretos extraordinarios",
  "un planeta alienígena habitado por diversas especies",
  "un mundo donde los sueños y la realidad se entrelazan",
]

const plots = [
  "debe dominar sus poderes para salvar a sus seres queridos",
  "se embarca en un viaje para vengar a su familia",
  "descubre una conspiración que amenaza al mundo",
  "forma alianzas improbables para derrotar a un enemigo común",
  "lucha contra sus propios demonios internos",
  "compite en un torneo donde su vida está en juego",
  "busca artefactos legendarios con poderes inimaginables",
  "intenta recuperar sus recuerdos perdidos",
  "protege a un ser especial de aquellos que quieren explotarlo",
  "se infiltra en una organización enemiga",
  "entrena para superar sus limitaciones",
  "debe elegir entre el deber y sus deseos personales",
  "descubre la verdad sobre su origen",
  "forma un equipo de inadaptados con habilidades únicas",
  "intenta cambiar un destino aparentemente inevitable",
]

export default function AnimeIdeas() {
  const [mounted, setMounted] = useState(false)
  const [animeIdea, setAnimeIdea] = useState<null | {
    genre: string
    character: string
    setting: string
    plot: string
  }>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [prompt, setPrompt] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRollComplete = (animePrompt: string) => {
    setPrompt(animePrompt)

    // Generate random anime elements
    const randomGenre = genres[Math.floor(Math.random() * genres.length)]
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    const randomSetting = settings[Math.floor(Math.random() * settings.length)]
    const randomPlot = plots[Math.floor(Math.random() * plots.length)]

    setAnimeIdea({
      genre: randomGenre,
      character: randomCharacter,
      setting: randomSetting,
      plot: randomPlot,
    })
  }

  const generateAnimeIdea = () => {
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
      title="Generador de Ideas para Anime"
      description="Obtén ideas aleatorias para crear tu propio anime con géneros, personajes, escenarios y tramas."
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Botón de generación */}
        <div className="text-center mb-6">
          <Button
            onClick={generateAnimeIdea}
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
                <Tv2 className="w-5 h-5" />
                Generar Idea para Anime
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
          {(animeIdea || prompt || isRolling) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="fantasy-card p-6 rounded-lg border border-pink-800 bg-gradient-to-br from-pink-900/30 to-purple-900/30 mb-8"
            >
              <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-pink-300">Tu Idea de Anime</h2>

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

              {animeIdea && (
                <div className="space-y-6 font-fondamento">
                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Género:</h3>
                    <p className="text-xl">{animeIdea.genre}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Protagonista:</h3>
                    <p className="text-xl">{animeIdea.character}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Escenario:</h3>
                    <p className="text-xl">{animeIdea.setting}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel text-pink-400 mb-2">Trama:</h3>
                    <p className="text-xl">El protagonista {animeIdea.plot}</p>
                  </div>

                  <div className="mt-8 p-4 bg-pink-950/50 rounded-lg border border-pink-900">
                    <h3 className="text-lg font-cinzel text-pink-300 mb-2">Concepto Completo:</h3>
                    <p className="font-fondamento italic">
                      Un anime de género {animeIdea.genre} que sigue la historia de {animeIdea.character} en{" "}
                      {animeIdea.setting}. A lo largo de la serie, el protagonista {animeIdea.plot}, enfrentándose a
                      desafíos cada vez mayores y descubriendo verdades sorprendentes sobre el mundo y sobre sí mismo.
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
            {showRoadmap ? "Ocultar Roadmap" : "Ver Roadmap de Anime"}
          </button>
        </div>

        {/* Roadmap */}
        {showRoadmap && <Roadmap category="anime" />}
      </div>
    </PageLayout>
  )
}
