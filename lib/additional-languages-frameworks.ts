// Este archivo exporta una lista combinada de lenguajes y frameworks adicionales
// para filtrar y mostrar ideas de proyectos basados en elecciones tecnológicas.

export interface TechnologyItem {
  name: string
  color: string
  emoji: string
}

export const additionalLanguagesFrameworks: TechnologyItem[] = [
  // Lenguajes de Programación
  { name: "JavaScript", color: "text-yellow-400", emoji: "💛" },
  { name: "Python", color: "text-blue-400", emoji: "🐍" },
  { name: "Java", color: "text-orange-400", emoji: "☕" },
  { name: "C#", color: "text-orange-400", emoji: "♯" },
  { name: "PHP", color: "text-blue-400", emoji: "🐘" },
  { name: "Ruby", color: "text-blue-400", emoji: "💎" },
  { name: "Go", color: "text-orange-400", emoji: "🐹" },
  { name: "Rust", color: "text-red-400", emoji: "🦀" },
  { name: "TypeScript", color: "text-orange-400", emoji: "🔷" },
  { name: "Swift", color: "text-orange-400", emoji: "🐦" },
  { name: "Kotlin", color: "text-orange-400", emoji: "🧩" },
  { name: "C++", color: "text-red-400", emoji: "➕" },
  { name: "Brainfuck", color: "text-purple-500", emoji: "🧠" },
  { name: "COBOL", color: "text-red-400", emoji: "👴" },
  { name: "Scala", color: "text-orange-400", emoji: "📊" },
  { name: "Haskell", color: "text-red-400", emoji: "λ" },
  { name: "Perl", color: "text-orange-400", emoji: "🐪" },
  { name: "Lua", color: "text-blue-400", emoji: "🌙" },
  { name: "Objective-C", color: "text-orange-400", emoji: "🍎" },
  { name: "Assembly", color: "text-red-400", emoji: "⚙️" },
  { name: "MATLAB", color: "text-orange-400", emoji: "🧮" },
  { name: "VBA", color: "text-blue-400", emoji: "📊" },
  { name: "Shell/Bash", color: "text-blue-400", emoji: "🐚" },
  { name: "PowerShell", color: "text-blue-400", emoji: "💠" },
  { name: "SQL", color: "text-blue-400", emoji: "🗃️" },
  { name: "R", color: "text-blue-400", emoji: "📈" },
  { name: "Julia", color: "text-orange-400", emoji: "🔴" },
  { name: "Groovy", color: "text-blue-400", emoji: "🎵" },
  { name: "Elixir", color: "text-orange-400", emoji: "💧" },
  { name: "Clojure", color: "text-red-400", emoji: "🔄" },
  { name: "F#", color: "text-orange-400", emoji: "🎯" },
  { name: "Dart", color: "text-blue-400", emoji: "🎯" },
  { name: "C", color: "text-red-400", emoji: "©️" },
  { name: "HTML", color: "text-green-400", emoji: "🌐" },
  { name: "CSS", color: "text-green-400", emoji: "🎨" },

  // Frameworks y Bibliotecas Web
  { name: "React", color: "text-blue-400", emoji: "⚛️" },
  { name: "Angular", color: "text-orange-400", emoji: "🅰️" },
  { name: "Vue", color: "text-blue-400", emoji: "🟢" },
  { name: "Next.js", color: "text-blue-400", emoji: "▲" },
  { name: "Express", color: "text-blue-400", emoji: "🚂" },
  { name: "Django", color: "text-blue-400", emoji: "🦄" },
  { name: "Spring", color: "text-orange-400", emoji: "🍃" },
  { name: "Laravel", color: "text-blue-400", emoji: "🔺" },
  { name: "Flask", color: "text-green-400", emoji: "🧪" },
  { name: "Ruby on Rails", color: "text-blue-400", emoji: "🛤️" },
  { name: "ASP.NET", color: "text-orange-400", emoji: "🔷" },
  { name: "Svelte", color: "text-blue-400", emoji: "🔥" },
  { name: "SvelteKit", color: "text-blue-400", emoji: "🧰" },
  { name: "Astro", color: "text-blue-400", emoji: "🚀" },
  { name: "Deno", color: "text-blue-400", emoji: "🦕" },
  { name: "Bun", color: "text-green-400", emoji: "🥟" },
  { name: "Elm", color: "text-orange-400", emoji: "🌳" },
  { name: "ReScript", color: "text-orange-400", emoji: "📝" },
  { name: "SolidJS", color: "text-blue-400", emoji: "🧱" },
  { name: "Qwik", color: "text-blue-400", emoji: "⚡" },
  { name: "Remix", color: "text-orange-400", emoji: "💿" },
  { name: "HTMX", color: "text-green-400", emoji: "🔄" },
  { name: "Socket.io", color: "text-blue-400", emoji: "🔌" },
  { name: "Nuxt.js", color: "text-blue-400", emoji: "🔰" },
  { name: "Gatsby", color: "text-blue-400", emoji: "💜" },
  { name: "Vite", color: "text-green-400", emoji: "⚡️" },
  { name: "Tailwind CSS", color: "text-green-400", emoji: "🌊" },
  { name: "shadcn/ui", color: "text-green-400", emoji: "🎭" },

  // Frameworks Móviles
  { name: "React Native", color: "text-orange-400", emoji: "📱" },
  { name: "Flutter", color: "text-blue-400", emoji: "🦋" },
  { name: "Xamarin", color: "text-orange-400", emoji: "🔄" },
  { name: "Ionic", color: "text-blue-400", emoji: "⚡" },
  { name: "SwiftUI", color: "text-orange-400", emoji: "🍏" },
  { name: "UIKit", color: "text-orange-400", emoji: "📲" },
  { name: "Jetpack Compose", color: "text-orange-400", emoji: "🤖" },
  { name: "Android SDK", color: "text-orange-400", emoji: "📱" },

  // Desarrollo de Juegos
  { name: "Unity", color: "text-orange-400", emoji: "🎮" },
  { name: "Unreal Engine", color: "text-red-400", emoji: "🎯" },
  { name: "Godot Engine", color: "text-blue-400", emoji: "🤖" },
  { name: "Phaser", color: "text-blue-400", emoji: "👾" },
  { name: "Bevy", color: "text-orange-400", emoji: "🦊" },
  { name: "RPG Maker MZ", color: "text-green-400", emoji: "🎲" },
  { name: "RPG Maker MV", color: "text-green-400", emoji: "🎭" },
  { name: "LÖVE", color: "text-blue-400", emoji: "❤️" },
  { name: "Pygame", color: "text-blue-400", emoji: "🐍" },
  { name: "Blueprints", color: "text-blue-400", emoji: "📝" },

  // Gráficos y 3D
  { name: "Three.js", color: "text-orange-400", emoji: "🌐" },
  { name: "Cannon.js", color: "text-orange-400", emoji: "💣" },
  { name: "OpenGL", color: "text-red-400", emoji: "🖼️" },
  { name: "SDL", color: "text-orange-400", emoji: "🎨" },
  { name: "SDL2", color: "text-orange-400", emoji: "🎮" },
  { name: "Bullet Physics", color: "text-red-400", emoji: "🔫" },
  { name: "PhysX", color: "text-red-400", emoji: "🧲" },
  { name: "ARCore", color: "text-orange-400", emoji: "👓" },
  { name: "ARKit", color: "text-orange-400", emoji: "📱" },
  { name: "Tone.js", color: "text-blue-400", emoji: "🎵" },
  { name: "Babylon.js", color: "text-orange-400", emoji: "🎲" },
  { name: "D3.js", color: "text-orange-400", emoji: "📊" },

  // Ciencia de Datos e IA
  { name: "TensorFlow", color: "text-red-400", emoji: "🧠" },
  { name: "PyTorch", color: "text-red-400", emoji: "🔥" },
  { name: "scikit-learn", color: "text-orange-400", emoji: "🔬" },
  { name: "Pandas", color: "text-blue-400", emoji: "🐼" },
  { name: "NumPy", color: "text-blue-400", emoji: "🔢" },
  { name: "Keras", color: "text-red-400", emoji: "🧩" },
  { name: "Tidyverse", color: "text-blue-400", emoji: "📊" },
  { name: "Shiny", color: "text-blue-400", emoji: "✨" },
  { name: "Tidytext", color: "text-blue-400", emoji: "📝" },
  { name: "Forecast", color: "text-blue-400", emoji: "📈" },
  { name: "Quantmod", color: "text-orange-400", emoji: "💹" },
  { name: "Igraph", color: "text-blue-400", emoji: "🕸️" },
  { name: "Leaflet", color: "text-blue-400", emoji: "🗺️" },

  // Bases de Datos
  { name: "MySQL", color: "text-green-400", emoji: "🐬" },
  { name: "PostgreSQL", color: "text-blue-400", emoji: "🐘" },
  { name: "MongoDB", color: "text-green-400", emoji: "🍃" },
  { name: "SQLite", color: "text-green-400", emoji: "🗄️" },
  { name: "Firebase", color: "text-green-400", emoji: "🔥" },
  { name: "Redis", color: "text-blue-400", emoji: "🔴" },
  { name: "Oracle", color: "text-orange-400", emoji: "☁️" },
  { name: "SQL Server", color: "text-blue-400", emoji: "🖥️" },
  { name: "VSAM", color: "text-red-400", emoji: "📂" },
  { name: "DB2", color: "text-orange-400", emoji: "💾" },
  { name: "Cassandra", color: "text-orange-400", emoji: "📊" },
  { name: "InfluxDB", color: "text-blue-400", emoji: "⏱️" },

  // Otros Frameworks y Herramientas
  { name: "Akka", color: "text-orange-400", emoji: "🔄" },
  { name: "Spark", color: "text-orange-400", emoji: "⚡" },
  { name: "Play", color: "text-blue-400", emoji: "▶️" },
  { name: "Akka HTTP", color: "text-orange-400", emoji: "🌐" },
  { name: "HDFS", color: "text-orange-400", emoji: "💾" },
  { name: "Servant", color: "text-orange-400", emoji: "🧑‍💼" },
  { name: "Reagent", color: "text-orange-400", emoji: "⚗️" },
  { name: "Incanter", color: "text-blue-400", emoji: "📊" },
  { name: "Compojure", color: "text-orange-400", emoji: "🧩" },
  { name: "Giraffe", color: "text-orange-400", emoji: "🦒" },
  { name: "Oak", color: "text-blue-400", emoji: "🌳" },
  { name: "Elysia", color: "text-blue-400", emoji: "🧚" },
  { name: "Hiccup", color: "text-blue-400", emoji: "🤧" },
  { name: "Ring", color: "text-blue-400", emoji: "💍" },
  { name: "Node.js", color: "text-blue-400", emoji: "🟩" },
  { name: "GraphQL", color: "text-blue-400", emoji: "🔍" },
  { name: "WebSockets", color: "text-blue-400", emoji: "🔌" },
  { name: "Electron", color: "text-orange-400", emoji: "⚛️" },
  { name: "Tauri", color: "text-orange-400", emoji: "🦊" },
]

// Función auxiliar para obtener solo los nombres (para mantener compatibilidad con código existente)
export const getLanguageFrameworkNames = (): string[] => {
  return additionalLanguagesFrameworks.map((item) => item.name)
}

// Función para obtener el color de una tecnología
export const getTechnologyColor = (name: string): string => {
  const tech = additionalLanguagesFrameworks.find((item) => item.name === name)
  return tech?.color || "text-white"
}

// Función para obtener el emoji de una tecnología
export const getTechnologyEmoji = (name: string): string => {
  const tech = additionalLanguagesFrameworks.find((item) => item.name === name)
  return tech?.emoji || "🔧"
}
