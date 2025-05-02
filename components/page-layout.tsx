import type { ReactNode } from "react"
import { Navigation } from "@/components/navigation"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
  bgColor?: string
}

export function PageLayout({ children, title, description, bgColor = "bg-[#121214]" }: PageLayoutProps) {
  return (
    <>
      <Navigation />
      <main className={`min-h-screen ${bgColor} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">{title}</h1>
            {description && <p className="text-xl font-fondamento opacity-90 max-w-3xl mx-auto">{description}</p>}
          </div>
          {children}
        </div>
      </main>
    </>
  )
}
