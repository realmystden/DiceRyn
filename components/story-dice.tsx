"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { BaseDice } from "./base-dice"

// Resultados posibles para el dado de historias
const storyResults = [
  "Una historia de aventura en un mundo fantástico",
  "Un relato de misterio en una pequeña ciudad",
  "Una historia de ciencia ficción en el espacio",
  "Un cuento de terror psicológico",
  "Una historia de amor prohibido",
  "Una fábula con animales que hablan",
  "Un relato histórico con elementos fantásticos",
  "Una historia de supervivencia en condiciones extremas",
  "Un cuento sobre viajes en el tiempo",
  "Una historia de redención personal",
  "Un relato sobre una civilización perdida",
  "Una historia de espionaje internacional",
]

interface StoryDiceProps {
  isRolling?: boolean
  setIsRolling?: (isRolling: boolean) => void
  onRollComplete?: (result: string) => void
  height?: number
  continuousSpin?: boolean
  spinSpeed?: number
}

export default function StoryDice({
  isRolling = false,
  setIsRolling = () => {},
  onRollComplete = () => {},
  height = 500,
  continuousSpin = false,
  spinSpeed = 1,
}: StoryDiceProps) {
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
          diceType="d12"
          color="#1d4ed8" // blue-700
          glowColor="#3b82f6" // blue-500
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          onRollComplete={onRollComplete}
          results={storyResults}
          continuousSpin={continuousSpin}
          spinSpeed={spinSpeed}
        />
        <Environment preset="forest" />
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
