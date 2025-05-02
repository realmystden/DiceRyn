"use client"

import type { ReactNode } from "react"
import { AnimatedSection } from "./animated-section"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#121214] text-white">
      <AnimatedSection className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl font-fondamento opacity-80 max-w-3xl mx-auto">{description}</p>
        </div>

        {children}
      </AnimatedSection>
    </div>
  )
}
