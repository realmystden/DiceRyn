"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"

export function DatabaseFilter() {
  const [open, setOpen] = useState(false)
  const { databaseFilter, setDatabaseFilter, appTypeFilter, languageFilter, frameworkFilter } = useProjectIdeasStore()
  const [databases, setDatabases] = useState<string[]>([])

  // Extraer bases de datos únicas de las ideas filtradas
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

    // Aplicar filtro de framework si existe
    if (frameworkFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => idea.frameworks.includes(frameworkFilter))
    }

    // Extraer todas las bases de datos de todas las ideas filtradas
    const allDatabases = filteredIdeas.flatMap((idea) => idea.basesdedatos)

    // Eliminar duplicados y ordenar
    const uniqueDatabases = Array.from(new Set(allDatabases))
    setDatabases(uniqueDatabases.sort())
  }, [appTypeFilter, languageFilter, frameworkFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {databaseFilter ? databaseFilter : "Todas las bases de datos"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command className="font-fondamento">
          <CommandInput placeholder="Buscar base de datos..." className="font-fondamento" />
          <CommandList className="font-fondamento max-h-[300px]">
            <CommandEmpty className="font-fondamento">No se encontraron bases de datos.</CommandEmpty>
            <CommandGroup className="font-fondamento">
              <CommandItem
                onSelect={() => {
                  setDatabaseFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!databaseFilter ? "opacity-100" : "opacity-0"}`} />
                Todas las bases de datos
              </CommandItem>
              {databases.map((database) => (
                <CommandItem
                  key={database}
                  onSelect={() => {
                    setDatabaseFilter(database)
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${databaseFilter === database ? "opacity-100" : "opacity-0"}`} />
                  {database}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
