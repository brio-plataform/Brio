// Estatísticas do projeto
export interface ProjectStats {
  views: number
  stars: number
  forks: number
  citations: number
  comments: number
}

// Props do componente
export interface ProjectViewerHeaderTopProps {
  stats: ProjectStats
  lastUpdate: Date
}

// Labels para métricas (opcional, mas útil para internacionalização)
export const METRIC_LABELS = {
  views: 'visualizações',
  stars: 'estrelas',
  forks: 'forks',
  citations: 'citações',
  comments: 'comentários'
} as const 