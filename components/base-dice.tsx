"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Particles } from "@/components/particles"

// Tipos de dados disponibles
export type DiceType = "d20" | "d12" | "d8" | "d6"

// Props para el componente BaseDice
interface BaseDiceProps {
  diceType: DiceType
  color: string
  glowColor: string
  isRolling: boolean
  setIsRolling: (isRolling: boolean) => void
  onRollComplete: (result: string) => void
  results: string[]
  height?: number
  continuousSpin?: boolean
  spinSpeed?: number
}

// Función para crear la geometría del dado según el tipo
const createDiceGeometry = (diceType: DiceType) => {
  switch (diceType) {
    case "d20":
      return new THREE.IcosahedronGeometry(1, 0) // 20 caras
    case "d12":
      return new THREE.DodecahedronGeometry(1, 0) // 12 caras
    case "d8":
      return new THREE.OctahedronGeometry(1, 0) // 8 caras
    case "d6":
      return new THREE.BoxGeometry(1, 1, 1) // 6 caras
    default:
      return new THREE.IcosahedronGeometry(1, 0)
  }
}

// Componente BaseDice
export function BaseDice({
  diceType,
  color,
  glowColor,
  isRolling,
  setIsRolling,
  onRollComplete,
  results,
  height = 500,
  continuousSpin = false,
  spinSpeed = 1,
}: BaseDiceProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const rotationRef = useRef({ x: 0, y: 0, z: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 })
  const velocityRef = useRef({ x: 0, y: 0, z: 0 })
  const rollTimeRef = useRef(0)
  const rollDurationRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)

  // Efecto para el lanzamiento del dado
  useEffect(() => {
    if (!isRolling) return

    // Establecer velocidad inicial aleatoria
    velocityRef.current = {
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.3,
    }

    // Establecer duración del lanzamiento (entre 1.5 y 2.5 segundos)
    rollDurationRef.current = 1.5 + Math.random() * 1
    rollTimeRef.current = 0

    // Reproducir sonido de lanzamiento si está disponible
    const rollSound = new Audio("/sounds/dice-roll.mp3")
    rollSound.volume = 0.5
    rollSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))
  }, [isRolling])

  // Animación del dado
  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Modo de rotación continua (para preview)
    if (continuousSpin && !isRolling) {
      meshRef.current.rotation.x += delta * 0.2 * spinSpeed
      meshRef.current.rotation.y += delta * 0.3 * spinSpeed
      return
    }

    // Animación suave cuando no está rodando
    if (!isRolling) {
      // Pequeña animación de "respiración" cuando está en reposo
      const breathingAmplitude = isHovered ? 0.01 : 0.005
      const breathingSpeed = isHovered ? 2 : 1
      meshRef.current.rotation.x =
        rotationRef.current.x + Math.sin(Date.now() * 0.001 * breathingSpeed) * breathingAmplitude
      meshRef.current.rotation.y =
        rotationRef.current.y + Math.sin(Date.now() * 0.0008 * breathingSpeed) * breathingAmplitude
      return
    }

    // Actualizar tiempo de lanzamiento
    rollTimeRef.current += delta

    // Calcular progreso de la animación (0 a 1)
    const progress = Math.min(rollTimeRef.current / rollDurationRef.current, 1)

    // Sistema de física simplificado
    if (progress < 0.7) {
      // Fase de lanzamiento activo
      // Aplicar impulsos aleatorios que disminuyen con el tiempo
      const impulseStrength = (1 - progress) * 0.05
      velocityRef.current.x += (Math.random() - 0.5) * impulseStrength
      velocityRef.current.y += (Math.random() - 0.5) * impulseStrength
      velocityRef.current.z += (Math.random() - 0.5) * impulseStrength

      // Limitar la velocidad máxima
      const maxSpeed = 0.2
      velocityRef.current.x = THREE.MathUtils.clamp(velocityRef.current.x, -maxSpeed, maxSpeed)
      velocityRef.current.y = THREE.MathUtils.clamp(velocityRef.current.y, -maxSpeed, maxSpeed)
      velocityRef.current.z = THREE.MathUtils.clamp(velocityRef.current.z, -maxSpeed, maxSpeed)
    } else {
      // Fase de desaceleración
      // Aplicar amortiguación para una desaceleración suave
      const dampingFactor = 0.95
      velocityRef.current.x *= dampingFactor
      velocityRef.current.y *= dampingFactor
      velocityRef.current.z *= dampingFactor
    }

    // Actualizar rotación basada en la velocidad
    rotationRef.current.x += velocityRef.current.x
    rotationRef.current.y += velocityRef.current.y
    rotationRef.current.z += velocityRef.current.z

    // Aplicar rotación al mesh
    meshRef.current.rotation.x = rotationRef.current.x
    meshRef.current.rotation.y = rotationRef.current.y
    meshRef.current.rotation.z = rotationRef.current.z

    // Finalizar animación
    if (progress >= 1) {
      setIsRolling(false)

      // Reproducir sonido de aterrizaje
      const landSound = new Audio("/sounds/dice-land.mp3")
      landSound.volume = 0.3
      landSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))

      // Seleccionar un resultado aleatorio
      const randomIndex = Math.floor(Math.random() * results.length)
      const result = results[randomIndex]
      onRollComplete(result)
    }
  })

  // Crear geometría del dado
  const geometry = createDiceGeometry(diceType)

  // Color del dado basado en si está rodando o en hover
  const diceColor = isRolling ? color.replace("700", "600") : isHovered ? color.replace("700", "600") : color
  const emissiveIntensity = isRolling ? 0.5 : isHovered ? 0.3 : 0.2

  return (
    <group dispose={null}>
      {/* Dado */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={[0, 0, 0]}
        scale={1.8}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial
          color={diceColor}
          metalness={0.8}
          roughness={0.2}
          emissive={color.replace("700", "500")}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Efecto de brillo */}
      <mesh geometry={geometry} scale={1.9}>
        <meshBasicMaterial color={glowColor} transparent opacity={isRolling ? 0.2 : isHovered ? 0.15 : 0.1} />
      </mesh>

      {/* Partículas (visibles solo cuando el dado está rodando) */}
      {isRolling && <Particles count={50} color={glowColor} />}
    </group>
  )
}
