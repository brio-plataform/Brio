import { LucideIcon } from "lucide-react"

// Status possíveis para colaboradores
export type CollaboratorStatus = 'online' | 'offline' | 'away'

// Interface para colaboradores
export interface Collaborator {
  id: string
  name: string
  avatar: string
  role: string
  status: CollaboratorStatus
}

// Props do HeaderBottom
export interface HeaderBottomProps {
  currentVersion: string
  collaborators: Collaborator[]
}

// Interface para itens do menu
export interface HeaderMenuItem {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

// Interface para versões do documento
export interface DocumentVersion {
  version: string
  date: Date
  author: string
  changes?: string
}

// Interface para configurações de busca
export interface SearchConfig {
  placeholder?: string
  onSearch?: (query: string) => void
}

// Estado do HeaderBottom
export interface HeaderBottomState {
  isSearching: boolean
  searchQuery: string
  showVersionHistory: boolean
  showCollaborators: boolean
} 