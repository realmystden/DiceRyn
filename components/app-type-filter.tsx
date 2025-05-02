"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"

export function AppTypeFilter() {
  const [open, setOpen] = useState(false)
  const { appTypeFilter, setAppTypeFilter } = useProjectIdeasStore()
  const [appTypes, setAppTypes] = useState<string[]>([])

  // Actualizar el filtro de tipo de aplicación para mostrar solo los tipos válidos
  useEffect(() => {
    // Usar solo los tipos específicos que queremos mostrar
    const appTypes = ["Aplicación Web", "Aplicación Móvil", "Aplicación de Escritorio", "Videojuego"]
    setAppTypes(appTypes)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button"
        >
          {appTypeFilter ? appTypeFilter : "Todos los tipos"}
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
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${appTypeFilter === type ? "opacity-100" : "opacity-0"}`} />
                  {type}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
