import { ReactNode } from "react"

// Tipos base
export type ProjectModel = 'article' | 'thesis' | 'book' | 'research'
export type ProjectVisibility = 'private' | 'public' | 'institutional'

// Estado do Header
export interface HeaderState {
  documentType: ProjectModel
  visibility: ProjectVisibility
  progress: number
  wordCount: number
  citationCount: number
  lastEdited: Date
  aiAssistant: boolean
  currentVersion: string
}

// Props do Header
export interface HeaderProps {
  projectId: string
}

// Dados do projeto
export interface ProjectData {
  name: string
  description: string
  updatedAt: string
  versions: Array<{ version: string }>
  wordCount: number
  citations: string[]
  model: ProjectModel
  visibility: ProjectVisibility
  progress: number
  type: string
}

// Colaborador
export interface HeaderCollaborator {
  id: string
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'away'
}

// Handlers
export interface HeaderHandlers {
  handleModelChange: (value: ProjectModel) => Promise<void>
  handleProgressChange: (event: React.FormEvent<HTMLDivElement>) => Promise<void>
  handleButtonSelectChange: (value: string) => void
  handleVisibilityChange: (value: ProjectVisibility) => Promise<void>
}

// Ações de atualização
export interface UpdateActions {
  updateName: (name: string) => Promise<void>
  updateDescription: (description: string) => Promise<void>
  updateContent: (content: string) => Promise<void>
  updateWordCount: (count: number) => Promise<void>
  updateModel: (model: ProjectModel) => Promise<void>
  updateVisibility: (visibility: ProjectVisibility) => Promise<void>
  updateProgress: (progress: number) => Promise<void>
  updateType: (type: string) => Promise<void>
} 