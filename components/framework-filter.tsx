"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"

export function FrameworkFilter() {
  const [open, setOpen] = useState(false)
  const { frameworkFilter, setFrameworkFilter, appTypeFilter, languageFilter } = useProjectIdeasStore()
  const [frameworks, setFrameworks] = useState<string[]>([])

  // Extraer frameworks únicos de las ideas filtradas por tipo de aplicación y lenguaje
  useEffect(() => {
    let filteredIdeas = [...projectIdeas]

    // Aplicar filtro de tipo de aplicación si existe
    if (appTypeFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => idea.tipo === appTypeFilter)
    }

    // Aplicar filtro de lenguaje si existe
    if (languageFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => idea.tecnologias.includes(languageFilter))
    }

    // Extraer todos los frameworks de todas las ideas filtradas
    const allFrameworks = filteredIdeas.flatMap((idea) => idea.frameworks)

    // Eliminar duplicados y ordenar
    const uniqueFrameworks = Array.from(new Set(allFrameworks))
    setFrameworks(uniqueFrameworks.sort())
  }, [appTypeFilter, languageFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {frameworkFilter ? frameworkFilter : "Todos los frameworks"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="font-fondamento">
          <CommandInput placeholder="Buscar framework..." className="font-fondamento" />
          <CommandList className="font-fondamento max-h-[300px]">
            <CommandEmpty className="font-fondamento">No se encontraron frameworks.</CommandEmpty>
            <CommandGroup className="font-fondamento">
              <CommandItem
                onSelect={() => {
                  setFrameworkFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!frameworkFilter ? "opacity-100" : "opacity-0"}`} />
                Todos los frameworks
              </CommandItem>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework}
                  onSelect={() => {
                    setFrameworkFilter(framework)
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${frameworkFilter === framework ? "opacity-100" : "opacity-0"}`} />
                  {framework}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
