"use client"

import { Eye, Star, GitFork, MessageSquare, Clock } from "lucide-react"
import type { ProjectViewerHeaderTopProps } from './types'
import { METRIC_LABELS } from './types'

// Configuração das métricas para melhor manutenção
const METRICS_CONFIG = [
  { key: 'views', icon: Eye, label: METRIC_LABELS.views },
  { key: 'stars', icon: Star, label: METRIC_LABELS.stars },
  { key: 'forks', icon: GitFork, label: METRIC_LABELS.forks },
  { key: 'citations', icon: GitFork, label: METRIC_LABELS.citations },
  { key: 'comments', icon: MessageSquare, label: METRIC_LABELS.comments }
] as const

export function ProjectViewerHeaderTop({ stats, lastUpdate }: ProjectViewerHeaderTopProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {METRICS_CONFIG.map(({ key, icon: Icon, label }) => (
          <span key={key} className="flex items-center gap-1 justify-center">
            <Icon className="h-3 w-3" />
            {stats[key as keyof typeof stats]} {label}
          </span>
        ))}
      </div>

      <span className="text-sm text-muted-foreground flex justify-center items-center">
        <Clock className="h-3 w-3 inline mr-1" />
        Última atualização: {lastUpdate.toLocaleDateString()}
      </span>
    </div>
  )
} 