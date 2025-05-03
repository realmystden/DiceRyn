"use client"

import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

interface BadgeCertificateProps {
  badge: any
  onClose: () => void
}

export function BadgeCertificate({ badge, onClose }: BadgeCertificateProps) {
  const [userName, setUserName] = useState<string>("Desarrollador")
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intentar obtener el nombre del usuario del localStorage
    const savedName = localStorage.getItem("userName") || "Desarrollador"
    setUserName(savedName)
  }, [])

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: null,
        scale: 2, // Mejor calidad
      })

      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `insignia-${badge.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error al generar el certificado:", error)
    }
  }

  const handleShare = async () => {
    if (!certificateRef.current || !navigator.share) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: null,
        scale: 2,
      })

      const dataUrl = canvas.toDataURL("image/png")

      // Convertir dataURL a Blob
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `insignia-${badge.id}.png`, { type: "image/png" })

      await navigator.share({
        title: `¡He desbloqueado la insignia ${badge.name}!`,
        text: `¡He desbloqueado la insignia ${badge.name} en DiceRyn!`,
        files: [file],
      })
    } catch (error) {
      console.error("Error al compartir:", error)
    }
  }

  const getLevelColors = (level: string) => {
    switch (level) {
      case "Student":
        return "from-green-600 to-green-900 border-green-500"
      case "Trainee":
        return "from-blue-600 to-blue-900 border-blue-500"
      case "Junior":
        return "from-yellow-600 to-yellow-900 border-yellow-500"
      case "Senior":
        return "from-orange-600 to-orange-900 border-orange-500"
      case "Master":
        return "from-red-600 to-red-900 border-red-500"
      default:
        return "from-purple-600 to-purple-900 border-purple-500"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={certificateRef}
        className={`fantasy-card bg-gradient-to-br ${getLevelColors(badge.level)} p-8 border-4 border-double border-white/30 shadow-2xl max-w-2xl mx-auto`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">{badge.icon}</div>
          <h2 className="text-3xl font-cinzel font-bold text-white mb-2">Certificado de Insignia Especial</h2>
          <div className="h-1 w-32 bg-white/50 mx-auto mb-4"></div>

          <p className="text-lg text-white/80 font-fondamento mb-6">Este certificado reconoce que</p>

          <p className="text-2xl font-cinzel font-bold text-white mb-6">{userName}</p>

          <p className="text-lg text-white/80 font-fondamento mb-4">ha desbloqueado la insignia</p>

          <h3 className="text-3xl font-cinzel font-bold text-white mb-2">{badge.name}</h3>

          <p className="text-md text-white/80 font-fondamento mb-6">{badge.description}</p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px bg-white/50 flex-1"></div>
            <span className="text-white/80 font-fondamento px-2">Nivel {badge.level}</span>
            <div className="h-px bg-white/50 flex-1"></div>
          </div>

          <p className="text-sm text-white/70 font-fondamento">DiceRyn - Generador de Ideas de Proyectos</p>
          <p className="text-xs text-white/50 font-fondamento mt-2">Fecha: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={handleDownload} className="fantasy-button bg-indigo-900/80 hover:bg-indigo-800 text-white">
          <Download className="mr-2 h-4 w-4" />
          <span className="font-fondamento">Descargar</span>
        </Button>

        {navigator.share && (
          <Button onClick={handleShare} className="fantasy-button bg-purple-900/80 hover:bg-purple-800 text-white">
            <Share2 className="mr-2 h-4 w-4" />
            <span className="font-fondamento">Compartir</span>
          </Button>
        )}
      </div>
    </div>
  )
}
