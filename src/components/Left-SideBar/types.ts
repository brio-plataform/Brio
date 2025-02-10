import { LucideIcon } from "lucide-react"

export type ReviewStatus = 'em andamento' | 'revisão final' | 'iniciado'

export interface ReviewMetadata {
  progress: number
  timeLeft: string
  reviewer: string
  status: ReviewStatus
}

export interface SubMenuItem {
  icon: LucideIcon
  label: string
  href?: string
  metadata?: ReviewMetadata
}

export interface MenuItem {
  icon: LucideIcon
  label: string
  href?: string
  items?: SubMenuItem[]
}

export interface SidebarState {
  isCollapsed: boolean
  openSections: string[]
}

export interface SidebarProps {
  defaultCollapsed?: boolean
  className?: string
} 