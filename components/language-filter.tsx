"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas } from "@/lib/project-ideas"
import { getTechnologyColor, getTechnologyEmoji } from "@/lib/additional-languages-frameworks"

export function LanguageFilter() {
  const [open, setOpen] = useState(false)
  const { languageFilter, setLanguageFilter, appTypeFilter, easterEggActivated } = useProjectIdeasStore()
  const [languages, setLanguages] = useState<string[]>([])

  // Extract unique languages from filtered ideas
  useEffect(() => {
    const filteredIdeas = appTypeFilter ? projectIdeas.filter((idea) => idea.tipo === appTypeFilter) : projectIdeas

    let uniqueLanguages = Array.from(new Set(filteredIdeas.flatMap((idea) => idea.tecnologias).filter(Boolean))).sort()

    // Filter out Brainfuck if Easter egg is not activated
    if (!easterEggActivated) {
      uniqueLanguages = uniqueLanguages.filter((lang) => lang !== "Brainfuck")
    }

    setLanguages(uniqueLanguages)
  }, [appTypeFilter, easterEggActivated])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button ${getTechnologyColor(languageFilter || "")}`}
        >
          {languageFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{getTechnologyEmoji(languageFilter)}</span> {languageFilter}
            </span>
          ) : (
            "Todos los lenguajes"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0 fantasy-card">
        <Command>
          <CommandInput placeholder="Buscar lenguaje..." className="font-fondamento" />
          <CommandList>
            <CommandEmpty>No se encontraron lenguajes.</CommandEmpty>
            <CommandGroup>
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
                  className={`cursor-pointer font-fondamento ${getTechnologyColor(language)}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${languageFilter === language ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{getTechnologyEmoji(language)}</span> {language}
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
