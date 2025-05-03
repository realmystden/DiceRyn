"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"

interface AchievementCertificateProps {
  title: string
  description: string
  level: string
  icon: string
  isSpecialBadge?: boolean
}

export function AchievementCertificate({
  title,
  description,
  level,
  icon,
  isSpecialBadge = false,
}: AchievementCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const downloadCertificate = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
      })
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `${isSpecialBadge ? "insignia" : "logro"}-${title.toLowerCase().replace(/\s+/g, "-")}.png`
      link.click()
    } catch (error) {
      console.error("Error al generar el certificado:", error)
    }
  }

  const shareCertificate = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
      })
      const image = canvas.toDataURL("image/png")

      if (navigator.share) {
        const blob = await (await fetch(image)).blob()
        const file = new File(
          [blob],
          `${isSpecialBadge ? "insignia" : "logro"}-${title.toLowerCase().replace(/\s+/g, "-")}.png`,
          {
            type: "image/png",
          },
        )

        await navigator.share({
          title: `${isSpecialBadge ? "Insignia" : "Logro"} en DiceRyn: ${title}`,
          text: `¡He conseguido ${isSpecialBadge ? "la insignia" : "el logro"} "${title}" en DiceRyn!`,
          files: [file],
        })
      } else {
        alert(
          "Tu navegador no soporta la función de compartir. Puedes descargar el certificado y compartirlo manualmente.",
        )
      }
    } catch (error) {
      console.error("Error al compartir el certificado:", error)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Student":
        return "from-green-600 to-green-900"
      case "Trainee":
        return "from-blue-600 to-blue-900"
      case "Junior":
        return "from-yellow-600 to-yellow-900"
      case "Senior":
        return "from-orange-600 to-orange-900"
      case "Master":
        return "from-red-600 to-red-900"
      default:
        return "from-purple-600 to-purple-900"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg border-4 border-double border-gold relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?key=gupw7')] bg-repeat opacity-20"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-gold text-3xl font-cinzel font-bold mb-2">
              Certificado de {isSpecialBadge ? "Insignia Especial" : "Logro"}
            </div>
            <div className="text-gray-400 font-fondamento">DiceRyn - Generador de Ideas de Proyectos</div>
          </div>

          {/* Seal and ribbon */}
          <div className="absolute -right-10 -top-10 transform rotate-45">
            <div className="w-40 h-40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-3xl shadow-lg">
                {icon}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="text-2xl font-cinzel font-bold text-white mb-4">{title}</div>
            <div className="text-gray-300 font-fondamento mb-4">{description}</div>
            <div
              className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold bg-gradient-to-r ${getLevelColor(
                level,
              )}`}
            >
              Nivel: {level}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-gray-700">
            <div className="text-gray-400 font-fondamento text-sm">
              Este certificado acredita que el usuario ha completado con éxito los requisitos para obtener{" "}
              {isSpecialBadge ? "la insignia" : "el logro"}.
            </div>
            <div className="text-gray-500 font-fondamento text-xs mt-2">Fecha: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={downloadCertificate}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded font-fondamento transition-colors"
        >
          Descargar Certificado
        </button>
        <button
          onClick={shareCertificate}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded font-fondamento transition-colors"
        >
          Compartir
        </button>
      </div>
    </div>
  )
}
