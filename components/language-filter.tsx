"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"

export function LanguageFilter() {
  const [open, setOpen] = useState(false)
  const { languageFilter, setLanguageFilter, appTypeFilter } = useProjectIdeasStore()
  const [languages, setLanguages] = useState<string[]>([])

  // Modificar la función useEffect para asegurar que se extraigan todos los lenguajes de programación
  useEffect(() => {
    let filteredIdeas = [...projectIdeas]

    // Aplicar filtro de tipo de aplicación si existe
    if (appTypeFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => idea.tipo === appTypeFilter)
    }

    // Extraer todos los lenguajes de todas las ideas
    const allLanguages = filteredIdeas.flatMap((idea) => idea.tecnologias)

    // Eliminar duplicados y ordenar
    const uniqueLanguages = Array.from(new Set(allLanguages))
    setLanguages(uniqueLanguages.sort())
  }, [appTypeFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {languageFilter ? languageFilter : "Todos los lenguajes"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="font-fondamento">
          <CommandInput placeholder="Buscar lenguaje..." className="font-fondamento" />
          <CommandList className="font-fondamento max-h-[300px]">
            <CommandEmpty className="font-fondamento">No se encontraron lenguajes.</CommandEmpty>
            <CommandGroup className="font-fondamento">
              <CommandItem
                onSelect={() => {
                  setLanguageFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!languageFilter ? "opacity-100" : "opacity-0"}`} />
                Todos los lenguajes
              </CommandItem>
              {languages.map((language) => (
                <CommandItem
                  key={language}
                  onSelect={() => {
                    setLanguageFilter(language)
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${languageFilter === language ? "opacity-100" : "opacity-0"}`} />
                  {language}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
