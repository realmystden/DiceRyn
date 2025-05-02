"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Particles({ count = 50 }) {
  const mesh = useRef<THREE.Points>(null)
  const positions = useRef<Float32Array>(new Float32Array(count * 3))
  const velocities = useRef<Float32Array>(new Float32Array(count * 3))
  const colors = useRef<Float32Array>(new Float32Array(count * 3))
  const sizes = useRef<Float32Array>(new Float32Array(count))

  // Inicializar partículas
  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Posiciones iniciales (alrededor del dado)
    positions.current[i3] = (Math.random() - 0.5) * 4
    positions.current[i3 + 1] = (Math.random() - 0.5) * 4
    positions.current[i3 + 2] = (Math.random() - 0.5) * 4

    // Velocidades aleatorias
    velocities.current[i3] = (Math.random() - 0.5) * 0.2
    velocities.current[i3 + 1] = (Math.random() - 0.5) * 0.2
    velocities.current[i3 + 2] = (Math.random() - 0.5) * 0.2

    // Colores aleatorios (brillantes)
    colors.current[i3] = Math.random() * 0.5 + 0.5 // R
    colors.current[i3 + 1] = Math.random() * 0.5 + 0.5 // G
    colors.current[i3 + 2] = Math.random() * 0.5 + 0.5 // B

    // Tamaños aleatorios
    sizes.current[i] = Math.random() * 0.5 + 0.1
  }

  useFrame((_, delta) => {
    if (!mesh.current) return

    const geometry = mesh.current.geometry
    const positionAttribute = geometry.getAttribute("position")

    // Actualizar posiciones basadas en velocidades
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      positionAttribute.array[i3] += velocities.current[i3] * delta * 10
      positionAttribute.array[i3 + 1] += velocities.current[i3 + 1] * delta * 10
      positionAttribute.array[i3 + 2] += velocities.current[i3 + 2] * delta * 10

      // Reducir velocidad gradualmente
      velocities.current[i3] *= 0.99
      velocities.current[i3 + 1] *= 0.99
      velocities.current[i3 + 2] *= 0.99
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors.current} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes.current} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors transparent blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}
