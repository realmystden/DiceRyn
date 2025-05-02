"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Dice1Icon as Dice, BookOpen, PenTool, CuboidIcon as Cube } from "lucide-react"
import dynamic from "next/dynamic"

// Importar los dados de forma dinámica para evitar problemas de SSR
const TechDice = dynamic(() => import("@/components/tech-dice"), {
  ssr: false,
  loading: () => <div className="h-40 w-40 bg-purple-900/20 rounded-lg animate-pulse"></div>,
})

const StoryDice = dynamic(() => import("@/components/story-dice"), {
  ssr: false,
  loading: () => <div className="h-40 w-40 bg-blue-900/20 rounded-lg animate-pulse"></div>,
})

const AnimeDice = dynamic(() => import("@/components/anime-dice"), {
  ssr: false,
  loading: () => <div className="h-40 w-40 bg-pink-900/20 rounded-lg animate-pulse"></div>,
})

const ModelDice = dynamic(() => import("@/components/model-dice"), {
  ssr: false,
  loading: () => <div className="h-40 w-40 bg-green-900/20 rounded-lg animate-pulse"></div>,
})

const sections = [
  {
    title: "Proyectos de Tecnología",
    description: "Genera ideas para proyectos de programación, desarrollo web, aplicaciones móviles y más.",
    icon: <Dice className="w-12 h-12 mb-4 text-purple-400" />,
    href: "/tech-projects",
    color: "from-purple-900/50 to-indigo-900/50",
    borderColor: "border-purple-700",
    hoverColor: "hover:bg-purple-800/30",
    diceComponent: TechDice,
  },
  {
    title: "Historias Cortas",
    description: "Obtén ideas para historias con personajes, escenarios, tramas y giros inesperados.",
    icon: <BookOpen className="w-12 h-12 mb-4 text-blue-400" />,
    href: "/story-generator",
    color: "from-blue-900/50 to-cyan-900/50",
    borderColor: "border-blue-700",
    hoverColor: "hover:bg-blue-800/30",
    diceComponent: StoryDice,
  },
  {
    title: "Dibujos Anime",
    description: "Descubre ideas para ilustraciones de anime con personajes, poses, escenarios y estilos.",
    icon: <PenTool className="w-12 h-12 mb-4 text-pink-400" />,
    href: "/anime-ideas",
    color: "from-pink-900/50 to-red-900/50",
    borderColor: "border-pink-700",
    hoverColor: "hover:bg-pink-800/30",
    diceComponent: AnimeDice,
  },
  {
    title: "Modelos 3D",
    description: "Genera ideas para modelado 3D con temas, estilos, técnicas y detalles especiales.",
    icon: <Cube className="w-12 h-12 mb-4 text-green-400" />,
    href: "/3d-model-ideas",
    color: "from-green-900/50 to-teal-900/50",
    borderColor: "border-green-700",
    hoverColor: "hover:bg-green-800/30",
    diceComponent: ModelDice,
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#121214] text-white">
        <div className="text-2xl font-cinzel">Cargando DiceRyn...</div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#121214] text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-600/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-blue-600/20 via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left md:w-1/2">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-cinzel font-bold mb-4"
                >
                  DiceRyn
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl font-fondamento mb-8 opacity-90"
                >
                  Generador de ideas creativas para tus proyectos de tecnología, historias, arte y modelado 3D.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link
                    href="/tech-projects"
                    className="px-8 py-3 bg-purple-700 hover:bg-purple-600 rounded-md font-fondamento text-lg transition-all inline-block"
                  >
                    Comenzar
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:w-1/2 flex justify-center"
              >
                <Image
                  src="/diceryn-new.png"
                  alt="DiceRyn Logo"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-2xl shadow-purple-500/20"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sections Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-center mb-12">Explora Nuestras Secciones</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={section.href}>
                    <div
                      className={`h-full p-6 rounded-lg border ${section.borderColor} bg-gradient-to-br ${section.color} transition-all ${section.hoverColor} flex flex-col`}
                    >
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="h-40 w-40 mb-4">
                          {section.diceComponent && (
                            <section.diceComponent height={160} continuousSpin spinSpeed={0.5} />
                          )}
                        </div>
                        <h3 className="text-2xl font-cinzel font-bold mb-2">{section.title}</h3>
                      </div>
                      <p className="font-fondamento text-center mb-6 flex-grow">{section.description}</p>
                      <div className="text-center mt-auto">
                        <span
                          className={`px-4 py-2 rounded-md border ${section.borderColor} font-fondamento inline-block`}
                        >
                          Explorar
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-cinzel font-bold mb-6">Sobre DiceRyn</h2>
            <p className="text-lg font-fondamento mb-8">
              DiceRyn es una plataforma diseñada para inspirar tu creatividad cuando te enfrentas al bloqueo creativo.
              Ya sea que estés buscando ideas para tu próximo proyecto de programación, una historia cautivadora, un
              dibujo de anime impresionante o un modelo 3D único, DiceRyn está aquí para ayudarte.
            </p>
            <p className="text-lg font-fondamento">
              Cada sección incluye un generador de ideas aleatorias y un roadmap detallado para ayudarte a mejorar tus
              habilidades, desde principiante hasta experto.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
