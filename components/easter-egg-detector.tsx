"use client"

import { useEffect, useState, useRef } from "react"
import { useProjectIdeasStore } from "@/lib/store"

export function EasterEggDetector() {
  const [keys, setKeys] = useState<string[]>([])
  // Usar useRef para evitar actualizaciones durante el renderizado
  const setEasterEggActivatedRef = useRef<((activated: boolean) => void) | null>(null)

  // Obtener la función setEasterEggActivated del store
  const setEasterEggActivated = useProjectIdeasStore((state) => state.setEasterEggActivated)

  // Actualizar la referencia cuando cambie la función
  useEffect(() => {
    setEasterEggActivatedRef.current = setEasterEggActivated
  }, [setEasterEggActivated])

  useEffect(() => {
    // Usar setTimeout para asegurar que la actualización ocurra después del renderizado
    const timer = setTimeout(() => {
      // Verificar si el easter egg ya está activado en localStorage
      const easterEggActivated = localStorage.getItem("diceryn_easter_egg") === "true"
      if (easterEggActivated && setEasterEggActivatedRef.current) {
        setEasterEggActivatedRef.current(true)
      }
    }, 0)

    // Función para detectar combinaciones de teclas
    const handleKeyDown = (e: KeyboardEvent) => {
      // Añadir la tecla presionada al array
      setKeys((prev) => {
        const newKeys = [...prev, e.key].slice(-2)

        // Verificar si se ha ingresado el código "bf"
        if (newKeys.join("") === "bf" && setEasterEggActivatedRef.current) {
          // Activar el easter egg
          localStorage.setItem("diceryn_easter_egg", "true")

          // Usar setTimeout para retrasar la actualización del estado
          setTimeout(() => {
            if (setEasterEggActivatedRef.current) {
              setEasterEggActivatedRef.current(true)
            }
          }, 0)

          // Mostrar algún efecto visual o mensaje
          const easterEggMessage = document.createElement("div")
          easterEggMessage.textContent = "¡Easter egg activado! 🧠"
          easterEggMessage.style.position = "fixed"
          easterEggMessage.style.top = "20px"
          easterEggMessage.style.left = "50%"
          easterEggMessage.style.transform = "translateX(-50%)"
          easterEggMessage.style.background = "purple"
          easterEggMessage.style.color = "white"
          easterEggMessage.style.padding = "10px 20px"
          easterEggMessage.style.borderRadius = "5px"
          easterEggMessage.style.zIndex = "9999"
          easterEggMessage.style.opacity = "0"
          easterEggMessage.style.transition = "opacity 0.3s"

          document.body.appendChild(easterEggMessage)

          // Mostrar y luego ocultar el mensaje
          setTimeout(() => {
            easterEggMessage.style.opacity = "1"
          }, 100)
          setTimeout(() => {
            easterEggMessage.style.opacity = "0"
            setTimeout(() => {
              document.body.removeChild(easterEggMessage)
            }, 300)
          }, 3000)
        }

        return newKeys
      })
    }

    // Añadir el event listener a nivel de documento
    document.addEventListener("keydown", handleKeyDown)

    // Limpiar el event listener y el timer
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      clearTimeout(timer)
    }
  }, []) // Sin dependencias para evitar re-ejecuciones innecesarias

  // Este componente no renderiza nada visible
  return null
}
