import { Star, Share2, GitFork, BookOpen, FileEdit, History, GitBranch, ChevronDown, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectViewerHeaderCoreProps {
  project: {
    title: string
    description: string
    type: 'article' | 'thesis' | 'book' | 'research'
    author: {
      name: string
      avatar: string
      institution?: string
    },
    currentVersion: string,
    stats?: {
      views?: number
      stars: number
      forks: number
      citations: number
      reviews: number
      comments?: number
    }
  }
}

export function ProjectViewerHeaderCore({
  project,
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
    <div className="flex flex-col gap-4 px-6 py-4">
      {/* Project Info Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <Badge variant="secondary">
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
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <GitBranch className="h-4 w-4" />
                v{project.currentVersion}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <History className="h-4 w-4 mr-2" /> Ver histórico
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitFork className="h-4 w-4 mr-2" /> Criar nova versão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="gap-2">
            <GitFork className="h-4 w-4" />
            Contribuir
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <FileEdit className="h-4 w-4" />
            Anotar
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 