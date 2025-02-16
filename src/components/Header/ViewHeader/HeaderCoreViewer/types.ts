import { ReactNode } from "react"

// Tipos base
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
}

// Dados do projeto para exibição
export interface ProjectViewerData {
  title: string
  description: string
  type: ProjectModel
  author: ProjectAuthor
  currentVersion: string
  stats: ProjectStats
}

// Props do componente
export interface ProjectViewerHeaderCoreProps {
  project: ProjectViewerData
}

// Mapeamento de tipos para labels
export const PROJECT_TYPE_LABELS: Record<ProjectModel, string> = {
  article: 'Artigo',
  thesis: 'TCC/Tese',
  book: 'Livro',
  research: 'Pesquisa'
} as const 