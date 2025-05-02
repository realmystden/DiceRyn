"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon } from "lucide-react"

interface Project {
  id: string
  title: string
  level: string
  completed_at: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
}

export function ProjectsList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseClient()

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from("completed_projects")
          .select("*")
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })

        if (error) throw error
        setProjects(data || [])
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchProjects()
    }
  }, [userId, supabase])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No hay proyectos completados todavía.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="text-lg">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                {project.level}
              </Badge>

              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}

              {project.frameworks.map((framework) => (
                <Badge key={framework} variant="outline">
                  {framework}
                </Badge>
              ))}

              {project.databases.map((db) => (
                <Badge key={db} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {db}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Completado el {new Date(project.completed_at).toLocaleDateString()}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
