"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoResultsMessageProps {
  onReset: () => void
}

export function NoResultsMessage({ onReset }: NoResultsMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl fantasy-card p-6 shadow-xl bg-[#121214] border border-gray-700 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
        </div>

        <h3 className="text-xl font-cinzel font-bold text-white">No se encontraron ideas</h3>

        <p className="text-gray-300 font-fondamento mb-4">
          No hay ideas que coincidan con todos los filtros seleccionados. Prueba con una combinación diferente o
          reinicia los filtros.
        </p>

        <Button
          onClick={onReset}
          variant="outline"
          className="fantasy-button border-amber-600 hover:bg-amber-900/30 text-white"
        >
          <span className="font-fondamento">Reiniciar filtros</span>
        </Button>
      </div>
    </motion.div>
  )
}
