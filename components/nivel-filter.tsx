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

  // Niveles disponibles
  const niveles = ["Trainee", "Junior", "Senior"]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {nivelFilter ? nivelFilter : "Todos los niveles"}
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
                  key={nivel}
                  onSelect={() => {
                    setNivelFilter(nivel as "Trainee" | "Junior" | "Senior")
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${nivelFilter === nivel ? "opacity-100" : "opacity-0"}`} />
                  {nivel}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
