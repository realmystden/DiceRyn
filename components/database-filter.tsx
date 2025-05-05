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

  // Database emojis mapping - cada base de datos con un emoji único
  const databaseEmojis: Record<string, string> = {
    MySQL: "🐬",
    PostgreSQL: "🐘",
    MongoDB: "🍃",
    SQLite: "🔋",
    Firebase: "🔥",
    Redis: "🔴",
    Oracle: "☁️",
    "SQL Server": "🔷",
    DynamoDB: "📊",
    Cassandra: "🌐",
    Neo4j: "🕸️",
    Supabase: "⚡",
    CouchDB: "🛋️",
    MariaDB: "🔵",
    InfluxDB: "📈",
    "Amazon RDS": "☁️",
    "Google Cloud SQL": "☁️",
    "Azure SQL": "☁️",
    "Cosmos DB": "🌌",
    Firestore: "🔥",
    "Realm DB": "📱",
    PouchDB: "📱",
    IndexedDB: "🌐",
    LocalStorage: "💾",
    SessionStorage: "💾",
    AsyncStorage: "📱",
    CoreData: "🍎",
    Room: "🤖",
    PlanetScale: "🪐",
    Neon: "✨",
    Turso: "🐢",
    Upstash: "⬆️",
    Fauna: "🦁",
    Xata: "🦋",
    Convex: "🔄",
  }

  // Database difficulty mapping
  const databaseDifficulty: Record<string, { color: string }> = {
    MySQL: { color: "text-green-400" },
    PostgreSQL: { color: "text-blue-400" },
    MongoDB: { color: "text-green-400" },
    SQLite: { color: "text-green-400" },
    Firebase: { color: "text-green-400" },
    Redis: { color: "text-blue-400" },
    Oracle: { color: "text-orange-400" },
    "SQL Server": { color: "text-blue-400" },
    DynamoDB: { color: "text-blue-400" },
    Cassandra: { color: "text-orange-400" },
    Neo4j: { color: "text-orange-400" },
    Supabase: { color: "text-green-400" },
    PlanetScale: { color: "text-blue-400" },
    Neon: { color: "text-blue-400" },
    Turso: { color: "text-green-400" },
    Upstash: { color: "text-green-400" },
    Fauna: { color: "text-blue-400" },
    Xata: { color: "text-green-400" },
    Convex: { color: "text-blue-400" },
    CouchDB: { color: "text-blue-400" },
    MariaDB: { color: "text-green-400" },
    InfluxDB: { color: "text-orange-400" },
    "Amazon RDS": { color: "text-blue-400" },
    "Google Cloud SQL": { color: "text-blue-400" },
    "Azure SQL": { color: "text-blue-400" },
    "Cosmos DB": { color: "text-orange-400" },
    Firestore: { color: "text-green-400" },
    "Realm DB": { color: "text-blue-400" },
    PouchDB: { color: "text-green-400" },
    IndexedDB: { color: "text-blue-400" },
    LocalStorage: { color: "text-green-400" },
    SessionStorage: { color: "text-green-400" },
  }

  // Función para obtener el color según la base de datos
  const getDatabaseColor = (database: string | null) => {
    if (!database) return "text-white"
    return databaseDifficulty[database]?.color || "text-white"
  }

  // Extraer bases de datos únicas de las ideas filtradas
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

    // Aplicar filtro de framework si existe
    if (frameworkFilter) {
      filteredIdeas = filteredIdeas.filter((idea) => {
        return Array.isArray(idea.frameworks) && idea.frameworks.includes(frameworkFilter)
      })
    }

    // Extraer todas las bases de datos de todas las ideas filtradas
    const allDatabases = filteredIdeas.flatMap((idea) => {
      // Asegurarse de que idea.basesdedatos existe y es un array
      if (Array.isArray(idea.basesdedatos)) {
        return idea.basesdedatos
      }
      // Intentar usar baseDatos si basesdedatos no existe
      if (Array.isArray(idea.baseDatos)) {
        return idea.baseDatos
      }
      return []
    })

    // Eliminar duplicados y ordenar
    const uniqueDatabases = Array.from(new Set(allDatabases))

    // Add modern databases if they don't exist in the list
    const modernDatabases = ["Supabase", "PlanetScale", "Neon", "Turso", "Upstash", "Fauna", "Xata", "Convex"]
    const combinedDatabases = [...uniqueDatabases]

    modernDatabases.forEach((db) => {
      if (!combinedDatabases.includes(db)) {
        combinedDatabases.push(db)
      }
    })

    setDatabases(combinedDatabases.sort())
  }, [appTypeFilter, languageFilter, frameworkFilter])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] justify-between fantasy-button font-fondamento ${getDatabaseColor(databaseFilter)}`}
        >
          {databaseFilter ? (
            <span className="flex items-center">
              <span className="mr-2">{databaseEmojis[databaseFilter] || "💾"}</span> {databaseFilter}
            </span>
          ) : (
            "Todas las bases de datos"
          )}
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
                  className={`cursor-pointer font-fondamento ${getDatabaseColor(database)}`}
                >
                  <Check className={`mr-2 h-4 w-4 ${databaseFilter === database ? "opacity-100" : "opacity-0"}`} />
                  <span className="flex items-center">
                    <span className="mr-2">{databaseEmojis[database] || "💾"}</span> {database}
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
