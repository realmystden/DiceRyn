"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { BaseDice } from "./base-dice"

// Resultados posibles para el dado de modelado 3D
const modelResults = [
  "Un personaje estilizado para videojuegos",
  "Un vehículo futurista con detalles mecánicos",
  "Un entorno natural con vegetación detallada",
  "Un edificio arquitectónico con interiores",
  "Una criatura fantástica con textura realista",
  "Un objeto cotidiano reimaginado",
]

interface ModelDiceProps {
  isRolling?: boolean
  setIsRolling?: (isRolling: boolean) => void
  onRollComplete?: (result: string) => void
  height?: number
  continuousSpin?: boolean
  spinSpeed?: number
}

export default function ModelDice({
  isRolling = false,
  setIsRolling = () => {},
  onRollComplete = () => {},
  height = 500,
  continuousSpin = false,
  spinSpeed = 1,
}: ModelDiceProps) {
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
          diceType="d6"
          color="#047857" // green-700
          glowColor="#10b981" // green-500
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          onRollComplete={onRollComplete}
          results={modelResults}
          continuousSpin={continuousSpin}
          spinSpeed={spinSpeed}
        />
        <Environment preset="warehouse" />
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
