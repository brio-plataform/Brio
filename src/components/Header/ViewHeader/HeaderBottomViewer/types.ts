import { ReactNode } from "react"

// Tipos de navegação
export type NavigationSection = 
  | 'chapters'
  | 'sections'
  | 'attachments'
  | 'pending-comments'
  | 'resolved-comments'
  | 'citations'
  | 'word-count'
  | 'revision-history'
  | 'activity-log'
  | 'active-contributors'
  | 'pending-invites'
  | 'permissions'

// Props do componente
export interface ProjectViewerHeaderBottomProps {
  onNavigate: (section: NavigationSection) => void
}

// Item do menu dropdown
export interface DropdownItem {
  label: string
  value: NavigationSection
  icon?: ReactNode
}

// Configuração dos menus
export interface NavigationMenu {
  label: string
  icon: ReactNode
  items?: DropdownItem[]
  action?: NavigationSection
} 