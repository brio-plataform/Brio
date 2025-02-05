import { Eye, Star, GitFork, MessageSquare, Clock } from "lucide-react"

interface ProjectViewerHeaderTopProps {
  stats: {
    views: number
    stars: number
    forks: number
    comments: number
  }
  lastUpdate: Date
}

export function ProjectViewerHeaderTop({ stats, lastUpdate }: ProjectViewerHeaderTopProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 justify-center">
          <Eye className="h-3 w-3" />
          {stats.views} visualizações
        </span>
        <span className="flex items-center gap-1 justify-center">
          <Star className="h-3 w-3" />
          {stats.stars} estrelas
        </span>
        <span className="flex items-center gap-1 justify-center">
          <GitFork className="h-3 w-3" />
          {stats.forks} forks
        </span>
        <span className="flex items-center gap-1 justify-center">
          <MessageSquare className="h-3 w-3" />
          {stats.comments} comentários
        </span>
      </div>
      <span className="text-sm text-muted-foreground flex justify-center items-center">
        <Clock className="h-3 w-3 inline mr-1" />
        Última atualização: {lastUpdate.toLocaleDateString()}
      </span>
    </div>
  )
} 