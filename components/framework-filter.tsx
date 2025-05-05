"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { getTechnologyColor, getTechnologyEmoji } from "@/lib/additional-languages-frameworks"

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
      filteredIdeas = filteredIdeas.filter((idea) => {
        return Array.isArray(idea.tecnologias) && idea.tecnologias.includes(languageFilter)
      })
    }

    // Extraer todos los frameworks de todas las ideas filtradas
    const allFrameworks = filteredIdeas.flatMap((idea) => {
      // Asegurarse de que idea.frameworks existe y es un array
      return Array.isArray(idea.frameworks) ? idea.frameworks : []
    })

    // Eliminar duplicados y ordenar
    const uniqueFrameworks = Array.from(new Set(allFrameworks))

    // Add modern frameworks if they don't exist in the list
    const modernFrameworks = [
      "Next.js",
      "Nuxt.js",
      "SvelteKit",
      "Remix",
      "Astro",
      "Gatsby",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
    ]
    const combinedFrameworks = [...uniqueFrameworks]

    modernFrameworks.forEach((framework) => {
      if (!combinedFrameworks.includes(framework)) {
        combinedFrameworks.push(framework)
      }
    })

    setFrameworks(combinedFrameworks.sort())
  }, [appTypeFilter, languageFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button font-fondamento ${getTechnologyColor(frameworkFilter || "")}`}
        >
          {frameworkFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{getTechnologyEmoji(frameworkFilter)}</span> {frameworkFilter}
            </span>
          ) : (
            "Todos los frameworks"
          )}
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
                  className={`cursor-pointer font-fondamento ${getTechnologyColor(framework)}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${frameworkFilter === framework ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{getTechnologyEmoji(framework)}</span> {framework}
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
