import { ReactNode } from "react"

// Tipos de projeto
export type ProjectModel = 'article' | 'thesis' | 'book' | 'research'
export type ProjectVisibility = 'private' | 'public' | 'institutional'

// Props do HeaderCore
export interface HeaderCoreProps {
  projectName: string
  projectDescription: string
  documentType: ProjectModel
  visibility: ProjectVisibility
  handleButtonSelectChange: (value: string) => void
  handleVisibilityChange: (value: ProjectVisibility) => void
}

// Configurações de visibilidade
export interface VisibilityOption {
  value: ProjectVisibility
  label: string
  icon: ReactNode
}

// Configurações dos botões de ação
export interface ActionButton {
  icon: ReactNode
  label: string
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
  onClick?: () => void
} 