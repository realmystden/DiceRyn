"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { BaseDice } from "./base-dice"

// Resultados posibles para el dado de anime
const animeResults = [
  "Un personaje de anime en pose heroica",
  "Una escena de batalla épica",
  "Un momento emotivo entre personajes",
  "Un paisaje de fantasía con estilo anime",
  "Un personaje con transformación dramática",
  "Una escena cotidiana con estilo slice of life",
  "Un villano carismático en pose amenazante",
  "Una escena de comedia con expresiones exageradas",
]

interface AnimeDiceProps {
  isRolling?: boolean
  setIsRolling?: (isRolling: boolean) => void
  onRollComplete?: (result: string) => void
  height?: number
  continuousSpin?: boolean
  spinSpeed?: number
}

export default function AnimeDice({
  isRolling = false,
  setIsRolling = () => {},
  onRollComplete = () => {},
  height = 500,
  continuousSpin = false,
  spinSpeed = 1,
}: AnimeDiceProps) {
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
          diceType="d8"
          color="#be185d" // pink-700
          glowColor="#ec4899" // pink-500
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          onRollComplete={onRollComplete}
          results={animeResults}
          continuousSpin={continuousSpin}
          spinSpeed={spinSpeed}
        />
        <Environment preset="night" />
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
