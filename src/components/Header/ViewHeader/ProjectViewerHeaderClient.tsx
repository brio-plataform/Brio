"use client"

import { useGetProject } from '@/hooks/useGetProject'
import { ProjectViewerHeader } from './project-viewer-header'
import { useEffect } from 'react'
import { useProjectStore } from '@/store/useProjectStore'

export function ProjectViewerHeaderClient({ projectId }: { projectId: string }) {
  const { 
    name,
    description,
    type,
    author,
    stats,
    updatedAt,
    project
  } = useGetProject(projectId)

  console.log('Author from hook:', author)
  console.log('Stats from hook:', stats)

  const { setCurrentProject } = useProjectStore()

  useEffect(() => {
    if (project) {
      setCurrentProject(project)
    }
  }, [project, setCurrentProject])

  return (
    <ProjectViewerHeader
      project={{
        title: name || "Untitled Project",
        description: description || "No description available",
        type: type as "article" | "thesis" | "book" | "research",
        author: author || {
          name: "Unknown Author",
          avatar: "/default-avatar.jpg",
          institution: "No Institution"
        },
        stats: stats || {
          views: 0,
          stars: 0,
          forks: 0,
          comments: 0
        },
        lastUpdate: updatedAt ? new Date(updatedAt) : new Date()
      }}
    />
  )
} 