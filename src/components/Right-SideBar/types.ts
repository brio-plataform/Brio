import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

export type ReviewStatus = 'em andamento' | 'revisão final' | 'iniciado'

export interface RightSidebarMetrics {
  stars: number
  views: number
  forks: number
  rewards: number
}

export interface RightSidebarReview {
  id: string
  title: string
  reviewer: string
  progress: number
  timeLeft: string
  status: ReviewStatus
}

export interface RightSidebarSection {
  title: string
  icon: LucideIcon
  content: ReactNode
}

export interface RightSidebarState {
  isCollapsed: boolean
  openSections: string[]
  description: string
  metrics: RightSidebarMetrics
  reviews: RightSidebarReview[]
  sections: RightSidebarSection[]
}

export interface RightSidebarProps {
  defaultCollapsed?: boolean
  description?: string
  metrics?: RightSidebarMetrics
  reviews?: RightSidebarReview[]
  sections?: RightSidebarSection[]
  onSectionToggle?: (section: string) => void
  onCollapse?: (isCollapsed: boolean) => void
} 