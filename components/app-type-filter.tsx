"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"

export function AppTypeFilter() {
  const [open, setOpen] = useState(false)

  // Mapeo de tipos de aplicación a niveles de dificultad y colores
  const appTypeDifficulty: Record<string, { color: string }> = {
    Web: { color: "text-green-400" },
    Móvil: { color: "text-blue-400" },
    Desktop: { color: "text-orange-400" },
    API: { color: "text-yellow-400" },
    Juego: { color: "text-orange-400" },
    CLI: { color: "text-green-400" },
    "Inteligencia Artificial": { color: "text-red-400" },
    "Realidad Virtual": { color: "text-red-400" },
    "Realidad Aumentada": { color: "text-red-400" },
    "Internet de las Cosas": { color: "text-orange-400" },
    Blockchain: { color: "text-red-400" },
    "Programación Esotérica": { color: "text-purple-500" },
  }

  // Emojis para tipos de aplicación - cada tipo con un emoji único
  const appTypeEmojis: Record<string, string> = {
    Web: "🌐",
    Móvil: "📱",
    Desktop: "💻",
    API: "🔌",
    Juego: "🎮",
    CLI: "⌨️",
    "Inteligencia Artificial": "🧠",
    "Realidad Virtual": "🥽",
    "Realidad Aumentada": "👓",
    "Internet de las Cosas": "🏠",
    Blockchain: "⛓️",
    "Programación Esotérica": "🔮",
  }

  // Función para obtener el color según el tipo de aplicación
  const getAppTypeColor = (appType: string | null) => {
    if (!appType) return "text-white"
    return appTypeDifficulty[appType]?.color || "text-white"
  }

  const { appTypeFilter, setAppTypeFilter, easterEggActivated } = useProjectIdeasStore()
  const [appTypes, setAppTypes] = useState<string[]>([])

  // Extract unique app types
  useEffect(() => {
    let uniqueAppTypes = Array.from(new Set(projectIdeas.map((idea) => idea.tipo))).sort()

    // Filter out "Programación Esotérica" if Easter egg is not activated
    if (!easterEggActivated) {
      uniqueAppTypes = uniqueAppTypes.filter((type) => type !== "Programación Esotérica")
    }

    setAppTypes(uniqueAppTypes)
  }, [easterEggActivated])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button ${getAppTypeColor(appTypeFilter)}`}
        >
          {appTypeFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{appTypeEmojis[appTypeFilter] || "📊"}</span> {appTypeFilter}
            </span>
          ) : (
            "Todos los tipos"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command>
          <CommandInput placeholder="Buscar tipo..." className="font-fondamento" />
          <CommandList>
            <CommandEmpty>No se encontraron tipos.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setAppTypeFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!appTypeFilter ? "opacity-100" : "opacity-0"}`} />
                Todos los tipos
              </CommandItem>
              {appTypes.map((type) => (
                <CommandItem
                  key={type}
                  onSelect={() => {
                    setAppTypeFilter(type)
                    setOpen(false)
                  }}
                  className={`cursor-pointer font-fondamento ${getAppTypeColor(type)}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${appTypeFilter === type ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{appTypeEmojis[type] || "📊"}</span> {type}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
