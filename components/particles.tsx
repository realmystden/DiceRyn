"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticlesProps {
  count?: number
  color?: string
}

export function Particles({ count = 50, color = "#ffffff" }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null)

  // Usar useMemo para crear las partículas una sola vez
  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    // Convertir el color hexadecimal a RGB
    const colorObj = new THREE.Color(color)

    // Inicializar partículas
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Posiciones iniciales (alrededor del dado)
      positions[i3] = (Math.random() - 0.5) * 4
      positions[i3 + 1] = (Math.random() - 0.5) * 4
      positions[i3 + 2] = (Math.random() - 0.5) * 4

      // Velocidades aleatorias
      velocities[i3] = (Math.random() - 0.5) * 0.2
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.2
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2

      // Colores basados en el color proporcionado con variación
      colors[i3] = colorObj.r * (0.8 + Math.random() * 0.4) // R
      colors[i3 + 1] = colorObj.g * (0.8 + Math.random() * 0.4) // G
      colors[i3 + 2] = colorObj.b * (0.8 + Math.random() * 0.4) // B

      // Tamaños aleatorios
      sizes[i] = Math.random() * 0.5 + 0.1
    }

    return { positions, velocities, colors, sizes }
  }, [count, color])

  useFrame((_, delta) => {
    if (!mesh.current) return

    const geometry = mesh.current.geometry
    const positionAttribute = geometry.getAttribute("position")

    // Actualizar posiciones basadas en velocidades
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Actualizar posición
      positionAttribute.array[i3] += velocities[i3] * delta * 10
      positionAttribute.array[i3 + 1] += velocities[i3 + 1] * delta * 10
      positionAttribute.array[i3 + 2] += velocities[i3 + 2] * delta * 10

      // Reducir velocidad gradualmente
      velocities[i3] *= 0.99
      velocities[i3 + 1] *= 0.99
      velocities[i3 + 2] *= 0.99

      // Reiniciar partículas que se alejan demasiado
      const distance = Math.sqrt(
        Math.pow(positionAttribute.array[i3] as number, 2) +
          Math.pow(positionAttribute.array[i3 + 1] as number, 2) +
          Math.pow(positionAttribute.array[i3 + 2] as number, 2),
      )

      if (distance > 5) {
        positionAttribute.array[i3] = (Math.random() - 0.5) * 4
        positionAttribute.array[i3 + 1] = (Math.random() - 0.5) * 4
        positionAttribute.array[i3 + 2] = (Math.random() - 0.5) * 4
      }
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors transparent blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}
