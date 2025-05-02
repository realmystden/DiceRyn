"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"

export function CategoryFilter() {
  const [open, setOpen] = useState(false)
  const { categoryFilter, setCategoryFilter, appTypeFilter } = useProjectIdeasStore()
  const [categories, setCategories] = useState<string[]>([])

  // Extraer categorías únicas de las ideas filtradas por tipo de aplicación
  useEffect(() => {
    const filteredIdeas = appTypeFilter ? projectIdeas.filter((idea) => idea.tipo === appTypeFilter) : projectIdeas

    const uniqueCategories = Array.from(new Set(filteredIdeas.map((idea) => idea.categoria)))
    setCategories(uniqueCategories.sort())
  }, [appTypeFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button"
        >
          {categoryFilter ? categoryFilter : "Todas las categorías"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command>
          <CommandInput placeholder="Buscar categoría..." className="font-fondamento" />
          <CommandList>
            <CommandEmpty>No se encontraron categorías.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setCategoryFilter(null)
                  setOpen(false)
                }}
                className="cursor-pointer font-fondamento"
              >
                <Check className={`mr-2 h-4 w-4 ${!categoryFilter ? "opacity-100" : "opacity-0"}`} />
                Todas las categorías
              </CommandItem>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    setCategoryFilter(category)
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${categoryFilter === category ? "opacity-100" : "opacity-0"}`} />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
