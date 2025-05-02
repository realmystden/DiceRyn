import type { AchievementLevel } from "@/lib/store"

interface ProgressBarProps {
  level: AchievementLevel
  progress: number
}

export function ProgressBar({ level, progress }: ProgressBarProps) {
  // Colores para cada nivel
  const levelColors: Record<AchievementLevel, string> = {
    Student: "from-green-500 to-green-700",
    Trainee: "from-blue-500 to-blue-700",
    Junior: "from-indigo-500 to-indigo-700",
    Senior: "from-purple-500 to-purple-700",
    Master: "from-yellow-500 to-amber-700",
  }

  // Hitos para cada nivel
  const milestones = [
    { label: "Student", position: 0 },
    { label: "Trainee", position: 25 },
    { label: "Junior", position: 50 },
    { label: "Senior", position: 75 },
    { label: "Master", position: 100 },
  ]

  // Calcular la posición actual en la barra completa (0-100%)
  const calculateOverallProgress = () => {
    switch (level) {
      case "Student":
        return progress * 25
      case "Trainee":
        return 25 + progress * 25
      case "Junior":
        return 50 + progress * 25
      case "Senior":
        return 75 + progress * 25
      case "Master":
        return 100
      default:
        return 0
    }
  }

  const overallProgress = calculateOverallProgress()

  return (
    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
      {/* Barra de progreso con gradiente según el nivel */}
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${levelColors[level]}`}
        style={{ width: `${overallProgress}%` }}
      />

      {/* Hitos */}
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="absolute top-0 h-full flex items-center justify-center"
          style={{ left: `${milestone.position}%` }}
        >
          <div className={`h-full w-1 ${milestone.position <= overallProgress ? "bg-white" : "bg-gray-600"}`} />
          <span
            className={`absolute -bottom-6 text-xs transform -translate-x-1/2 ${
              milestone.position <= overallProgress ? "text-white" : "text-gray-500"
            }`}
          >
            {milestone.label}
          </span>
        </div>
      ))}

      {/* Porcentaje de progreso */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{Math.round(overallProgress)}%</span>
      </div>
    </div>
  )
}
