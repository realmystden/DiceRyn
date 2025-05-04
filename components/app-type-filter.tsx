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
  const { appTypeFilter, setAppTypeFilter, easterEggActivated } = useProjectIdeasStore()
  const [appTypes, setAppTypes] = useState<string[]>([])

  // App type emojis mapping
  const appTypeEmojis: Record<string, string> = {
    "Aplicación Web": "🌐",
    "Aplicación Móvil": "📱",
    "Aplicación de Escritorio": "💻",
    Videojuego: "🎮",
    "Aplicación de Consola": "⌨️",
    API: "🔌",
    "Programación Esotérica": "🧠",
    Backend: "⚙️",
    Frontend: "🖼️",
    Fullstack: "🏗️",
  }

  // Extraer todos los tipos de aplicación
  useEffect(() => {
    // Extraer todos los tipos de aplicación de todas las ideas
    const allAppTypes = projectIdeas.map((idea) => idea.tipo)

    // Eliminar duplicados y ordenar
    let uniqueAppTypes = Array.from(new Set(allAppTypes))

    // Filtrar "Programación Esotérica" a menos que el easter egg esté activado
    if (!easterEggActivated) {
      uniqueAppTypes = uniqueAppTypes.filter((type) => type !== "Programación Esotérica")
    }

    setAppTypes(uniqueAppTypes.sort())
  }, [easterEggActivated])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {appTypeFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{appTypeEmojis[appTypeFilter] || "💻"}</span> {appTypeFilter}
            </span>
          ) : (
            "Todos los tipos"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="font-fondamento">
          <CommandInput placeholder="Buscar tipo..." className="font-fondramento" />
          <CommandList className="font-fondamento max-h-[300px]">
            <CommandEmpty className="font-fondamento">No se encontraron tipos.</CommandEmpty>
            <CommandGroup className="font-fondamento">
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
                  className={`cursor-pointer font-fondamento ${
                    type === "Programación Esotérica" ? "text-purple-500 font-bold" : ""
                  }`}
                >
                  <Check className={`mr-2 h-4 w-4 ${appTypeFilter === type ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{appTypeEmojis[type] || "💻"}</span>
                    {type}
                    {type === "Programación Esotérica" ? " 🔮" : ""}
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
