"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface RoadmapStep {
  level: string
  title: string
  description: string
  skills: string[]
  projects: string[]
}

interface RoadmapProps {
  title: string
  description: string
  steps: RoadmapStep[]
  accentColor: string
}

export function Roadmap({ title, description, steps, accentColor }: RoadmapProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const toggleStep = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null)
    } else {
      setExpandedStep(index)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel font-bold mb-3">{title}</h2>
        <p className="text-lg font-fondamento opacity-90">{description}</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50`}
          >
            <button
              onClick={() => toggleStep(index)}
              className={`w-full p-4 flex justify-between items-center text-left transition-colors ${
                expandedStep === index ? `bg-${accentColor}-900/30` : ""
              }`}
            >
              <div>
                <span className={`inline-block px-2 py-1 text-xs rounded-md bg-${accentColor}-700 text-white mb-2`}>
                  {step.level}
                </span>
                <h3 className="text-xl font-cinzel font-bold">{step.title}</h3>
              </div>
              {expandedStep === index ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedStep === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-t border-gray-800"
              >
                <p className="font-fondamento mb-4">{step.description}</p>

                <div className="mb-4">
                  <h4 className="font-cinzel font-bold mb-2 text-gray-300">Habilidades a desarrollar:</h4>
                  <ul className="list-disc list-inside space-y-1 font-fondamento">
                    {step.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-cinzel font-bold mb-2 text-gray-300">Proyectos recomendados:</h4>
                  <ul className="list-disc list-inside space-y-1 font-fondamento">
                    {step.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
