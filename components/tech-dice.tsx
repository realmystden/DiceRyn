"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { BaseDice } from "./base-dice"

// Resultados posibles para el dado de tecnología
const techResults = [
  "Una aplicación web para gestionar proyectos",
  "Un juego móvil educativo",
  "Una API para conectar servicios",
  "Una herramienta de productividad",
  "Un dashboard interactivo",
  "Una aplicación de realidad aumentada",
  "Un sistema de gestión de contenidos",
  "Una plataforma de e-learning",
  "Un asistente virtual con IA",
  "Una aplicación de análisis de datos",
  "Una red social especializada",
  "Una extensión para navegador",
  "Una aplicación IoT para el hogar",
  "Un sistema de recomendaciones",
  "Una plataforma de comercio electrónico",
  "Una aplicación de salud y bienestar",
  "Un sistema de gestión de inventario",
  "Una herramienta de diseño colaborativo",
  "Una plataforma de streaming personalizada",
  "Un sistema de automatización de tareas",
]

interface TechDiceProps {
  isRolling?: boolean
  setIsRolling?: (isRolling: boolean) => void
  onRollComplete?: (result: string) => void
  height?: number
  continuousSpin?: boolean
  spinSpeed?: number
}

export default function TechDice({
  isRolling = false,
  setIsRolling = () => {},
  onRollComplete = () => {},
  height = 500,
  continuousSpin = false,
  spinSpeed = 1,
}: TechDiceProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ height: `${height}px` }} className="flex items-center justify-center">
        <div className="text-xl font-fondamento">Cargando dado...</div>
      </div>
    )
  }

  return (
    <div
      style={{ height: `${height}px` }}
      className="w-full cursor-pointer"
      onClick={() => !isRolling && setIsRolling(true)}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <BaseDice
          diceType="d20"
          color="#7e22ce" // purple-700
          glowColor="#a855f7" // purple-500
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          onRollComplete={onRollComplete}
          results={techResults}
          continuousSpin={continuousSpin}
          spinSpeed={spinSpeed}
        />
        <Environment preset="sunset" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableRotate={!isRolling && !continuousSpin}
        />
      </Canvas>
    </div>
  )
}
