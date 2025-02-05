"use client"

import { Star, Share2, GitFork, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProjectViewerHeaderCoreProps {
  project: {
    title: string
    description: string
    type: 'article' | 'thesis' | 'book' | 'research'
    author: {
      name: string
      avatar: string
      institution?: string
    }
  }
  onStar: () => void
  onFork: () => void
  onShare: () => void
  onRead: () => void
}

export function ProjectViewerHeaderCore({
  project,
  onStar,
  onFork,
  onShare,
  onRead
}: ProjectViewerHeaderCoreProps) {
  const getTypeLabel = (type: 'article' | 'thesis' | 'book' | 'research') => {
    const types = {
      article: 'Artigo',
      thesis: 'TCC/Tese',
      book: 'Livro',
      research: 'Pesquisa'
    } as const;
    return types[type];
  }

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <Badge variant="secondary" className="text-xs">
            {getTypeLabel(project.type)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {project.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={project.author.avatar} />
            <AvatarFallback>{project.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{project.author.name}</span>
          {project.author.institution && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {project.author.institution}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={onStar}>
          <Star className="h-4 w-4" />
          Favoritar
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={onFork}>
          <GitFork className="h-4 w-4" />
          Fork
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={onShare}>
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
        <Button variant="default" size="sm" className="gap-2" onClick={onRead}>
          <BookOpen className="h-4 w-4" />
          Ler Projeto
        </Button>
      </div>
    </div>
  )
} 