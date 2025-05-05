"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { useProjectIdeasStore } from "@/lib/store"
import { getAllProjectIdeas } from "@/lib/project-ideas"
import { Particles } from "@/components/particles"
import { useSound } from "@/hooks/use-sound"

// BaseDice component for reuse
const BaseDice = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#8844ff", onClick, rolling }) => {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (rolling && mesh.current) {
      mesh.current.rotation.x += 0.05
      mesh.current.rotation.y += 0.05
      mesh.current.rotation.z += 0.05
    }
  })

  return (
    <mesh
      position={position}
      rotation={rotation}
      ref={mesh}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "#aa66ff" : color} />
      <Text position={[0, 0, 1.01]} fontSize={0.5} color="white">
        1
      </Text>
      <Text position={[0, 0, -1.01]} fontSize={0.5} color="white" rotation={[0, Math.PI, 0]}>
        2
      </Text>
      <Text position={[0, 1.01, 0]} fontSize={0.5} color="white" rotation={[Math.PI / 2, 0, 0]}>
        3
      </Text>
      <Text position={[0, -1.01, 0]} fontSize={0.5} color="white" rotation={[-Math.PI / 2, 0, 0]}>
        4
      </Text>
      <Text position={[1.01, 0, 0]} fontSize={0.5} color="white" rotation={[0, Math.PI / 2, 0]}>
        5
      </Text>
      <Text position={[-1.01, 0, 0]} fontSize={0.5} color="white" rotation={[0, -Math.PI / 2, 0]}>
        6
      </Text>
    </mesh>
  )
}

// Scene component
const Scene = () => {
  const { camera } = useThree()
  const [rolling, setRolling] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [particlePosition, setParticlePosition] = useState([0, 0, 0])
  const { playSound } = useSound()

  const {
    setSelectedIdea,
    appTypeFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    sortOption,
    easterEggActivated,
  } = useProjectIdeasStore()

  // Get all project ideas based on Easter egg activation
  const allIdeas = useMemo(() => getAllProjectIdeas(easterEggActivated), [easterEggActivated])

  // Filter ideas based on selected filters
  const filteredIdeas = useMemo(() => {
    return allIdeas.filter((idea) => {
      // Filter by app type
      if (appTypeFilter && idea.tipo !== appTypeFilter) {
        return false
      }

      // Filter by language
      if (languageFilter && !idea.tecnologias.includes(languageFilter)) {
        return false
      }

      // Filter by framework
      if (frameworkFilter && !idea.frameworks.includes(frameworkFilter)) {
        return false
      }

      // Filter by database
      if (databaseFilter && !idea.basesdedatos.includes(databaseFilter)) {
        return false
      }

      // Filter by nivel - Master level projects should only be shown when Master filter is selected
      if (idea.nivel === "Master" && nivelFilter !== "Master") {
        return false
      }

      // For other levels, apply normal filtering
      if (nivelFilter && idea.nivel !== nivelFilter) {
        return false
      }

      return true
    })
  }, [allIdeas, appTypeFilter, languageFilter, frameworkFilter, databaseFilter, nivelFilter])

  // Sort ideas based on selected sort option
  const sortedIdeas = useMemo(() => {
    if (sortOption === "alfabetico") {
      return [...filteredIdeas].sort((a, b) => a.titulo.localeCompare(b.titulo))
    } else if (sortOption === "nivel") {
      const nivelOrder = { Student: 1, Trainee: 2, Junior: 3, Senior: 4, Master: 5 }
      return [...filteredIdeas].sort((a, b) => nivelOrder[a.nivel] - nivelOrder[b.nivel])
    } else {
      // Random sort - shuffle the array
      return [...filteredIdeas].sort(() => Math.random() - 0.5)
    }
  }, [filteredIdeas, sortOption])

  const handleDiceClick = () => {
    if (rolling) return

    // Play dice roll sound
    playSound("diceRoll")

    setRolling(true)
    setShowParticles(false)

    setTimeout(() => {
      if (sortedIdeas.length > 0) {
        // Select a random idea from the filtered and sorted list
        const randomIndex = Math.floor(Math.random() * sortedIdeas.length)
        const selectedIdea = sortedIdeas[randomIndex]

        // Find the original index in the allIdeas array
        const originalIndex = allIdeas.findIndex(
          (idea) => idea.titulo === selectedIdea.titulo && idea.descripcion === selectedIdea.descripcion,
        )

        if (originalIndex !== -1) {
          setSelectedIdea(originalIndex + 1) // +1 because indices are 0-based but IDs are 1-based

          // Show particles at dice position
          setParticlePosition([0, 0, 0])
          setShowParticles(true)

          // Play success sound
          playSound("success")
        }
      } else {
        // No matching ideas - play error sound
        playSound("error")
      }

      setRolling(false)
    }, 1500)
  }

  useEffect(() => {
    // Position camera
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <BaseDice onClick={handleDiceClick} rolling={rolling} />
      {showParticles && <Particles position={particlePosition} />}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

export function DiceScene() {
  return (
    <div className="w-full h-[400px] fantasy-card">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
