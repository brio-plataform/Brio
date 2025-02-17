"use client"

import { ProjectViewerHeaderTop } from './HeaderTopViewer/project-viewer-header-top'
import { ProjectViewerHeaderCore } from './HeaderCoreViewer/project-viewer-header-core'
import { ProjectViewerHeaderBottom } from './HeaderBottomViewer/project-viewer-header-bottom'
import { useGetProject } from '@/hooks/useGetProjectByID'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect } from 'react'
import type { ProjectViewerHeaderProps, ProjectViewerData } from './types'
import { DEFAULT_PROJECT_STATS } from './types'

export function ProjectViewerHeader({ projectId }: ProjectViewerHeaderProps) {
  const { 
    name,
    description,
    model,
    author,
    stats,
    versions,
    updatedAt,
    project
  } = useGetProject(projectId)

  const { setCurrentProject } = useProjectStore()

  useEffect(() => {
    if (project) {
      setCurrentProject(project)
    }
  }, [project, setCurrentProject])

  const handleNavigate = (section: string) => {
    // Implementar lógica de navegação
  }
  
  const projectData: ProjectViewerData = {
    title: name || "Untitled Project",
    description: description || "No description available",
    type: model || "article",
    currentVersion: versions?.[0]?.version || "1.0.0",
    author: author || {
      name: "Unknown Author",
      avatar: "/default-avatar.jpg",
      institution: "No Institution"
    },
    stats: { ...DEFAULT_PROJECT_STATS, ...stats },
    lastUpdate: updatedAt ? new Date(updatedAt) : new Date()
  }

  return (
    <div className="flex flex-col border-b bg-background w-full sticky top-0 z-40">
      <ProjectViewerHeaderTop 
        stats={projectData.stats}
        lastUpdate={projectData.lastUpdate}
      />
      
      <ProjectViewerHeaderCore 
        project={projectData}
      />
      
      <ProjectViewerHeaderBottom 
        onNavigate={handleNavigate}
      />
    </div>
  )
} 