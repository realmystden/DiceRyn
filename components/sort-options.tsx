"use client"

import { useState } from "react"
import { Check, ChevronDown, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"

type SortOptionType = {
  value: "default" | "category" | "language" | "framework" | "database" | "nivel"
  label: string
}

const sortOptions: SortOptionType[] = [
  { value: "default", label: "Por defecto" },
  { value: "category", label: "Por categoría" },
  { value: "language", label: "Por lenguaje" },
  { value: "framework", label: "Por framework" },
  { value: "database", label: "Por base de datos" },
  { value: "nivel", label: "Por nivel" },
]

export function SortOptions() {
  const [open, setOpen] = useState(false)
  const { sortOption, setSortOption } = useProjectIdeasStore()

  const selectedOption = sortOptions.find((option) => option.value === sortOption) || sortOptions[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button"
        >
          <SortAsc className="mr-2 h-4 w-4" />
          {selectedOption.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command>
          <CommandList>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setSortOption(option.value)
                    setOpen(false)
                  }}
                  className="cursor-pointer font-fondamento"
                >
                  <Check className={`mr-2 h-4 w-4 ${sortOption === option.value ? "opacity-100" : "opacity-0"}`} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
