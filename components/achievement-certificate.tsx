"use client"

import { useState, useEffect } from "react"
import type { Achievement } from "@/lib/store"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import html2canvas from "html2canvas"

interface AchievementCertificateProps {
  achievement: Achievement
  open: boolean
  onClose: () => void
}

export function AchievementCertificate({ achievement, open, onClose }: AchievementCertificateProps) {
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    setMounted(true)
    // Intentar obtener el nombre del usuario del localStorage
    const savedName = localStorage.getItem("userName") || "Desarrollador"
    setUserName(savedName)
  }, [])

  if (!mounted) return null

  const handleDownload = async () => {
    const certificateElement = document.getElementById("achievement-certificate")
    if (!certificateElement) return

    try {
      const canvas = await html2canvas(certificateElement, {
        backgroundColor: null,
        scale: 2, // Mejor calidad
      })

      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `certificado-${achievement.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error al generar el certificado:", error)
    }
  }

  const handleShare = async () => {
    const certificateElement = document.getElementById("achievement-certificate")
    if (!certificateElement || !navigator.share) return

    try {
      const canvas = await html2canvas(certificateElement, {
        backgroundColor: null,
        scale: 2,
      })

      const dataUrl = canvas.toDataURL("image/png")

      // Convertir dataURL a Blob
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `certificado-${achievement.id}.png`, { type: "image/png" })

      await navigator.share({
        title: `¡He desbloqueado el logro ${achievement.title}!`,
        text: `¡He desbloqueado el logro ${achievement.title} en DiceRyn!`,
        files: [file],
      })
    } catch (error) {
      console.error("Error al compartir:", error)
    }
  }

  const levelColors = {
    Student: "from-green-600 to-green-900",
    Trainee: "from-blue-600 to-blue-900",
    Junior: "from-indigo-600 to-indigo-900",
    Senior: "from-purple-600 to-purple-900",
    Master: "from-amber-600 to-amber-900",
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-transparent border-0 p-0">
        <div
          id="achievement-certificate"
          className={`fantasy-card bg-gradient-to-br ${levelColors[achievement.level]} p-8 border-4 border-double border-white/30 shadow-2xl`}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{achievement.icon}</div>
            <h2 className="text-3xl font-cinzel font-bold text-white mb-2">Certificado de Logro</h2>
            <div className="h-1 w-32 bg-white/50 mx-auto mb-4"></div>

            <p className="text-lg text-white/80 font-fondamento mb-6">Este certificado reconoce que</p>

            <p className="text-2xl font-cinzel font-bold text-white mb-6">{userName}</p>

            <p className="text-lg text-white/80 font-fondamento mb-4">ha desbloqueado el logro</p>

            <h3 className="text-3xl font-cinzel font-bold text-white mb-2">{achievement.title}</h3>

            <p className="text-md text-white/80 font-fondamento mb-6">{achievement.description}</p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-white/50 flex-1"></div>
              <span className="text-white/80 font-fondamento px-2">Nivel {achievement.level}</span>
              <div className="h-px bg-white/50 flex-1"></div>
            </div>

            <p className="text-sm text-white/70 font-fondamento">DiceRyn - Generador de Ideas de Proyectos</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
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
      </DialogContent>
    </Dialog>
  )
}
