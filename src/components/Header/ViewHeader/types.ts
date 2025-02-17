// Tipo de projeto
export type ProjectModel = 'article' | 'thesis' | 'book' | 'research'

// Autor do projeto
export interface ProjectAuthor {
  name: string
  avatar: string
  institution?: string
}

// Estatísticas do projeto
export interface ProjectStats {
  views: number
  stars: number
  forks: number
  citations: number
  comments: number
  reviews?: number
}

// Versão do projeto
export interface ProjectVersion {
  version: string
  updatedAt: string
}

// Dados do projeto para exibição
export interface ProjectViewerData {
  title: string
  description: string
  type: ProjectModel
  currentVersion: string
  author: ProjectAuthor
  stats: ProjectStats
  lastUpdate: Date
}

// Props do componente principal
export interface ProjectViewerHeaderProps {
  projectId: string
}

// Valores padrão para estatísticas
export const DEFAULT_PROJECT_STATS: ProjectStats = {
  views: 0,
  stars: 0,
  forks: 0,
  citations: 0,
  reviews: 0,
  comments: 0
} as const 