"use client"

import { ProjectViewerHeaderTop } from './project-viewer-header-top'
import { ProjectViewerHeaderCore } from './project-viewer-header-core'
import { ProjectViewerHeaderBottom } from './project-viewer-header-bottom'

interface ProjectViewerHeaderProps {
  project: {
    title: string
    description: string
    type: 'article' | 'thesis' | 'book' | 'research'
    author: {
      name: string
      avatar: string
      institution?: string
    }
    stats: {
      views: number
      stars: number
      forks: number
      comments: number
    }
    lastUpdate: Date
  }
}

export function ProjectViewerHeader({ project }: ProjectViewerHeaderProps) {
  const handleStar = () => {
    // Implementar lógica de favoritar
  }

  const handleFork = () => {
    // Implementar lógica de fork
  }

  const handleShare = () => {
    // Implementar lógica de compartilhamento
  }

  const handleRead = () => {
    // Implementar lógica de leitura
  }

  const handleNavigate = (section: string) => {
    // Implementar lógica de navegação
  }

  return (
    <div className="flex flex-col border-b bg-background w-full sticky top-0 z-40">
      <ProjectViewerHeaderTop 
        stats={project.stats}
        lastUpdate={project.lastUpdate}
      />
      
      <ProjectViewerHeaderCore 
        project={project}
        onStar={handleStar}
        onFork={handleFork}
        onShare={handleShare}
        onRead={handleRead}
      />
      
      <ProjectViewerHeaderBottom 
        onNavigate={handleNavigate}
      />
    </div>
  )
} 