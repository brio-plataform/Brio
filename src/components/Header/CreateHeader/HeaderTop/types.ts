import { ReactNode } from "react"

// Props do HeaderTop
export interface HeaderTopProps {
  lastEdited: Date
  wordCount: number
  citationCount: number
  aiAssistant: boolean
  progress: number
  handleProgressChange: (event: React.FormEvent<HTMLDivElement>) => void
}

// Métricas do documento
export interface DocumentMetrics {
  lastEdited: Date
  wordCount: number
  citationCount: number
}

// Estado do AI Assistant
export interface AIAssistantState {
  isActive: boolean
  isProcessing?: boolean
  lastSuggestion?: Date
}

// Configurações de progresso
export interface ProgressConfig {
  value: number
  min?: number
  max?: number
  className?: string
  showLabel?: boolean
}

// Item de status
export interface StatusItem {
  icon: ReactNode
  label: string
  value: string | number
  tooltip?: string
} 