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
  const { languageFilter, setLanguageFilter, appTypeFilter, easterEggActivated } = useProjectIdeasStore()
  const [languages, setLanguages] = useState<string[]>([])

  // Language emojis mapping
  const languageEmojis: Record<string, string> = {
    JavaScript: "📜",
    Python: "🐍",
    Java: "☕",
    "C#": "🔷",
    PHP: "🐘",
    Ruby: "💎",
    Go: "🐹",
    Rust: "🦀",
    TypeScript: "📘",
    Swift: "🍎",
    Kotlin: "🤖",
    "C++": "⚙️",
    Brainfuck: "🧠",
    HTML: "📄",
    CSS: "🎨",
    SQL: "🗃️",
    R: "📊",
    Dart: "🎯",
    Lua: "🌙",
    Perl: "🐪",
    Scala: "📈",
    Haskell: "λ",
    Elixir: "💧",
    Clojure: "🔄",
    "F#": "🎵",
    COBOL: "🏛️",
    Assembly: "⚙️",
    MATLAB: "🧮",
    Julia: "🔬",
    Groovy: "🎵",
  }

  // Extraer todos los lenguajes de programación
  useEffect(() => {
    let filteredIdeas = [...projectIdeas]

    // Aplicar filtro de tipo de aplicación si existe
    if (appTypeFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => idea.tipo === appTypeFilter)
    }

    // Filtrar ideas de Brainfuck si el easter egg no está activado
    if (!easterEggActivated) {
      filteredIdeas = filteredIdeas.filter(
        (idea) => !idea.tecnologias.includes("Brainfuck") && idea.tipo !== "Programación Esotérica",
      )
    }

    // Extraer todos los lenguajes de todas las ideas
    const allLanguages = filteredIdeas.flatMap((idea) => {
      // Asegurarse de que idea.tecnologias existe y es un array
      return Array.isArray(idea.tecnologias) ? idea.tecnologias : []
    })

    // Eliminar duplicados y ordenar
    let uniqueLanguages = Array.from(new Set(allLanguages))

    // Filtrar Brainfuck a menos que el easter egg esté activado
    if (!easterEggActivated) {
      uniqueLanguages = uniqueLanguages.filter((lang) => lang !== "Brainfuck")
    } else if (!uniqueLanguages.includes("Brainfuck")) {
      // Si el easter egg está activado y Brainfuck no está en la lista, añadirlo
      uniqueLanguages.push("Brainfuck")
    }

    // Add modern languages if they don't exist in the list
    const modernLanguages = ["Astro", "Svelte", "Deno", "Bun", "Elm", "ReScript", "SolidJS", "Qwik", "Remix", "HTMX"]
    modernLanguages.forEach((lang) => {
      if (!uniqueLanguages.includes(lang)) {
        uniqueLanguages.push(lang)
      }
    })

    setLanguages(uniqueLanguages.sort())
  }, [appTypeFilter, easterEggActivated])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between fantasy-button font-fondamento"
        >
          {languageFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{languageEmojis[languageFilter] || "💻"}</span> {languageFilter}
            </span>
          ) : (
            "Todos los lenguajes"
          )}
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
                  className={`cursor-pointer font-fondamento ${
                    language === "Brainfuck" ? "text-purple-500 font-bold" : ""
                  } ${
                    ["Astro", "Svelte", "Deno", "Bun", "Elm", "ReScript", "SolidJS", "Qwik", "Remix", "HTMX"].includes(
                      language,
                    )
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  <Check className={`mr-2 h-4 w-4 ${languageFilter === language ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{languageEmojis[language] || "💻"}</span>
                    {language}
                    {["Astro", "Svelte", "Deno", "Bun", "Elm", "ReScript", "SolidJS", "Qwik", "Remix", "HTMX"].includes(
                      language,
                    )
                      ? " ✨"
                      : ""}
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
