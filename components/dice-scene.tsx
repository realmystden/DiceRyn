"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D } from "@react-three/drei"
import * as THREE from "three"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { Particles } from "@/components/particles"

// Componente para los números del dado
function DiceNumber({ position, rotation, number }) {
  return (
    <group position={position} rotation={rotation}>
      <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.35} height={0.1} curveSegments={12}>
        {number.toString()}
        <meshStandardMaterial color="white" />
      </Text3D>
    </group>
  )
}

// Componente del dado D20
function D20Model({ onClick, isRolling, setIsRolling }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const rotationRef = useRef({ x: 0, y: 0, z: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 })
  const rollSpeedRef = useRef(0)
  const rollTimeRef = useRef(0)

  const { setSelectedIdea } = useProjectIdeasStore()

  // Crear geometría del icosaedro (d20)
  const geometry = new THREE.IcosahedronGeometry(1, 0)

  // Efecto para el lanzamiento del dado
  useEffect(() => {
    if (!isRolling) return

    // Establecer rotación objetivo aleatoria
    targetRotationRef.current = {
      x: Math.random() * Math.PI * 8,
      y: Math.random() * Math.PI * 8,
      z: Math.random() * Math.PI * 8,
    }

    // Establecer velocidad de lanzamiento aleatoria
    rollSpeedRef.current = 0.3 + Math.random() * 0.2
    rollTimeRef.current = 0
  }, [isRolling])

  // Animación del dado
  // Asegurar que las fuentes se mantengan consistentes durante la animación
  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (!isRolling) {
      // Animación suave cuando no está rodando
      meshRef.current.rotation.x = rotationRef.current.x + Math.sin(Date.now() * 0.001) * 0.05
      meshRef.current.rotation.y = rotationRef.current.y + Date.now() * 0.0005
      return
    }

    rollTimeRef.current += delta

    // Función de suavizado para desaceleración
    const progress = Math.min(rollTimeRef.current / 2, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    // Añadir algo de aleatoriedad a la rotación durante el lanzamiento
    if (progress < 0.7) {
      targetRotationRef.current.x += (Math.random() - 0.5) * 0.1
      targetRotationRef.current.y += (Math.random() - 0.5) * 0.1
      targetRotationRef.current.z += (Math.random() - 0.5) * 0.1
    }

    // Actualizar rotación basada en el progreso
    rotationRef.current.x = THREE.MathUtils.lerp(
      rotationRef.current.x,
      targetRotationRef.current.x,
      easeOut * rollSpeedRef.current,
    )

    rotationRef.current.y = THREE.MathUtils.lerp(
      rotationRef.current.y,
      targetRotationRef.current.y,
      easeOut * rollSpeedRef.current,
    )

    rotationRef.current.z = THREE.MathUtils.lerp(
      rotationRef.current.z,
      targetRotationRef.current.z,
      easeOut * rollSpeedRef.current,
    )

    meshRef.current.rotation.x = rotationRef.current.x
    meshRef.current.rotation.y = rotationRef.current.y
    meshRef.current.rotation.z = rotationRef.current.z

    // Finalizar animación
    if (progress >= 1) {
      setIsRolling(false)

      try {
        // Obtener ideas filtradas
        const { appTypeFilter, languageFilter, frameworkFilter, databaseFilter, nivelFilter } =
          useProjectIdeasStore.getState()

        let filteredIdeas = [...projectIdeas]

        // Aplicar filtros
        if (appTypeFilter) {
          filteredIdeas = filteredIdeas.filter((idea) => idea.tipo === appTypeFilter)
        }

        if (languageFilter) {
          filteredIdeas = filteredIdeas.filter((idea) => idea.tecnologias.includes(languageFilter))
        }

        if (frameworkFilter) {
          filteredIdeas = filteredIdeas.filter((idea) => idea.frameworks.includes(frameworkFilter))
        }

        if (databaseFilter) {
          filteredIdeas = filteredIdeas.filter((idea) => idea.basesdedatos.includes(databaseFilter))
        }

        if (nivelFilter) {
          filteredIdeas = filteredIdeas.filter((idea) => idea.nivel === nivelFilter)
        }

        // Si no hay ideas con los filtros aplicados, usar todas las ideas
        if (filteredIdeas.length === 0) {
          filteredIdeas = projectIdeas
        }

        // Seleccionar idea aleatoria de las filtradas
        const randomIndex = Math.floor(Math.random() * filteredIdeas.length)
        const selectedIdeaIndex = projectIdeas.findIndex((idea) => idea.titulo === filteredIdeas[randomIndex].titulo)

        setSelectedIdea(selectedIdeaIndex + 1)
      } catch (error) {
        console.error("Error al seleccionar idea:", error)
        // Seleccionar una idea aleatoria como fallback
        const randomIndex = Math.floor(Math.random() * projectIdeas.length)
        setSelectedIdea(randomIndex + 1)
      }
    }
  })

  // Posiciones para los 20 números del dado (icosaedro)
  const numberPositions = [
    { pos: [0, 1.1, 0], rot: [-Math.PI / 2, 0, 0], num: 1 },
    { pos: [0.85, 0.85, 0], rot: [-Math.PI / 4, Math.PI / 4, 0], num: 2 },
    { pos: [0, 0.85, 0.85], rot: [-Math.PI / 4, 0, Math.PI / 4], num: 3 },
    { pos: [-0.85, 0.85, 0], rot: [-Math.PI / 4, -Math.PI / 4, 0], num: 4 },
    { pos: [0, 0.85, -0.85], rot: [-Math.PI / 4, 0, -Math.PI / 4], num: 5 },
    { pos: [0.85, 0, 0.85], rot: [0, Math.PI / 4, Math.PI / 4], num: 6 },
    { pos: [0.85, 0, -0.85], rot: [0, Math.PI / 4, -Math.PI / 4], num: 7 },
    { pos: [-0.85, 0, -0.85], rot: [0, -Math.PI / 4, -Math.PI / 4], num: 8 },
    { pos: [-0.85, 0, 0.85], rot: [0, -Math.PI / 4, Math.PI / 4], num: 9 },
    { pos: [0.85, -0.85, 0], rot: [Math.PI / 4, Math.PI / 4, 0], num: 10 },
    { pos: [0, -0.85, 0.85], rot: [Math.PI / 4, 0, Math.PI / 4], num: 11 },
    { pos: [-0.85, -0.85, 0], rot: [Math.PI / 4, -Math.PI / 4, 0], num: 12 },
    { pos: [0, -0.85, -0.85], rot: [Math.PI / 4, 0, -Math.PI / 4], num: 13 },
    { pos: [0.5, 0.5, 0.5], rot: [-Math.PI / 4, Math.PI / 4, Math.PI / 4], num: 14 },
    { pos: [-0.5, 0.5, 0.5], rot: [-Math.PI / 4, -Math.PI / 4, Math.PI / 4], num: 15 },
    { pos: [-0.5, 0.5, -0.5], rot: [-Math.PI / 4, -Math.PI / 4, -Math.PI / 4], num: 16 },
    { pos: [0.5, 0.5, -0.5], rot: [-Math.PI / 4, Math.PI / 4, -Math.PI / 4], num: 17 },
    { pos: [0.5, -0.5, 0.5], rot: [Math.PI / 4, Math.PI / 4, Math.PI / 4], num: 18 },
    { pos: [-0.5, -0.5, 0.5], rot: [Math.PI / 4, -Math.PI / 4, Math.PI / 4], num: 19 },
    { pos: [0, -1.1, 0], rot: [Math.PI / 2, 0, 0], num: 20 },
  ]

  // Color del dado basado en si está rodando
  const diceColor = isRolling ? "#ff7700" : "#ff5500"
  const emissiveIntensity = isRolling ? 0.5 : 0.2

  return (
    <group dispose={null}>
      {/* Dado */}
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} scale={2} onClick={onClick}>
        <meshStandardMaterial
          color={diceColor}
          metalness={0.8}
          roughness={0.2}
          emissive="#ff3300"
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Glow effect */}
      <mesh geometry={geometry} scale={2.1}>
        <meshBasicMaterial color={isRolling ? "#ff9500" : "#ff7700"} transparent opacity={0.2} />
      </mesh>

      {/* Números del dado */}
      {numberPositions.map((item, index) => (
        <DiceNumber key={index} position={item.pos} rotation={item.rot} number={item.num} />
      ))}

      {/* Partículas (visibles solo cuando el dado está rodando) */}
      {isRolling && <Particles count={100} />}
    </group>
  )
}

export default function DiceScene() {
  const [isRolling, setIsRolling] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDiceClick = () => {
    if (!isRolling) {
      setIsRolling(true)
    }
  }

  if (!mounted) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-xl font-fondamento">Cargando dado...</div>
      </div>
    )
  }

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <D20Model onClick={handleDiceClick} isRolling={isRolling} setIsRolling={setIsRolling} />
      <Environment preset="sunset" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
    </Canvas>
  )
}
