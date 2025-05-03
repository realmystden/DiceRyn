"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"

export function AppTypeFilter() {
  const [open, setOpen] = useState(false)
  const { appTypeFilter, setAppTypeFilter } = useProjectIdeasStore()

  // App types with emojis
  const appTypes = [
    { value: "Aplicación Web", label: "Aplicación Web", emoji: "🌐" },
    { value: "Aplicación Móvil", label: "Aplicación Móvil", emoji: "📱" },
    { value: "Aplicación de Escritorio", label: "Aplicación de Escritorio", emoji: "💻" },
    { value: "Videojuego", label: "Videojuego", emoji: "🎮" },
    { value: "API", label: "API", emoji: "🔌" },
    { value: "Aplicación de Consola", label: "Aplicación de Consola", emoji: "⌨️" },
    { value: "Programación Esotérica", label: "Programación Esotérica", emoji: "🧠" },
    { value: "Backend", label: "Backend", emoji: "⚙️" },
    { value: "Frontend", label: "Frontend", emoji: "🖼️" },
    { value: "Fullstack", label: "Fullstack", emoji: "🧰" },
  ]

  const getAppTypeColor = (type: string | null) => {
    switch (type) {
      case "Aplicación Web":
        return "text-blue-400"
      case "Aplicación Móvil":
        return "text-green-400"
      case "Aplicación de Escritorio":
        return "text-purple-400"
      case "API":
        return "text-yellow-400"
      case "Videojuego":
        return "text-red-400"
      case "Aplicación de Consola":
        return "text-cyan-400"
      default:
        return "text-white"
    }
  }

  const selectedType = appTypes.find((type) => type.value === appTypeFilter)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button font-fondamento ${getAppTypeColor(appTypeFilter)}`}
        >
          {appTypeFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{selectedType?.emoji}</span> {appTypeFilter}
            </span>
          ) : (
            "Todos los tipos"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="bg-gray-900">
          <CommandInput placeholder="Buscar tipo..." className="font-fondamento text-white" />
          <CommandList className="bg-gray-900">
            <CommandEmpty className="text-white">No se encontraron tipos.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setAppTypeFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento text-white hover:bg-gray-800"
              >
                <Check className={`mr-2 h-4 w-4 ${!appTypeFilter ? "opacity-100" : "opacity-0"}`} />
                Todos los tipos
              </CommandItem>
              {appTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  onSelect={() => {
                    setAppTypeFilter(type.value)
                    setOpen(false)
                  }}
                  className={`cursor-pointer font-fondamento hover:bg-gray-800 ${getAppTypeColor(type.value)}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${appTypeFilter === type.value ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{type.emoji}</span> {type.label}
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
