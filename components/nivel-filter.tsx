"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"

export function NivelFilter() {
  const [open, setOpen] = useState(false)
  const { nivelFilter, setNivelFilter } = useProjectIdeasStore()

  // Niveles disponibles con emojis
  const niveles = [
    {
      value: "Student",
      label: "Student",
      emoji: "🧠",
      color: "text-green-400",
      description: "Proyectos para principiantes",
    },
    {
      value: "Trainee",
      label: "Trainee",
      emoji: "🌱",
      color: "text-blue-400",
      description: "Proyectos para aprendices",
    },
    { value: "Junior", label: "Junior", emoji: "🚀", color: "text-yellow-400", description: "Proyectos intermedios" },
    { value: "Senior", label: "Senior", emoji: "⭐", color: "text-orange-400", description: "Proyectos avanzados" },
    { value: "Master", label: "Master", emoji: "👑", color: "text-red-400", description: "Proyectos expertos" },
  ]

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case "Student":
        return "text-green-400"
      case "Trainee":
        return "text-blue-400"
      case "Junior":
        return "text-yellow-400"
      case "Senior":
        return "text-orange-400"
      case "Master":
        return "text-red-400"
      default:
        return "text-white"
    }
  }

  const selectedLevel = niveles.find((nivel) => nivel.value === nivelFilter)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button font-fondamento ${getLevelColor(nivelFilter)}`}
        >
          {nivelFilter ? (
            <span className="flex items-center truncate">
              <span className="mr-2">{selectedLevel?.emoji}</span> {nivelFilter}
            </span>
          ) : (
            "Todos los niveles"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="font-fondamento">
          <CommandInput placeholder="Buscar nivel..." className="font-fondamento" />
          <CommandList className="font-fondamento">
            <CommandEmpty className="font-fondamento">No se encontraron niveles.</CommandEmpty>
            <CommandGroup className="font-fondamento">
              <CommandItem
                onSelect={() => {
                  setNivelFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!nivelFilter ? "opacity-100" : "opacity-0"}`} />
                Todos los niveles
              </CommandItem>
              {niveles.map((nivel) => (
                <CommandItem
                  key={nivel.value}
                  onSelect={() => {
                    setNivelFilter(nivel.value as "Student" | "Trainee" | "Junior" | "Senior")
                    setOpen(false)
                  }}
                  className={`cursor-pointer font-fondamento ${nivel.color}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${nivelFilter === nivel.value ? "opacity-100" : "opacity-0"}`} />
                  <div className="flex items-center truncate">
                    <span className="mr-2">{nivel.emoji}</span> {nivel.label}
                    <span className="ml-2 text-xs text-gray-400 truncate">({nivel.description})</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
