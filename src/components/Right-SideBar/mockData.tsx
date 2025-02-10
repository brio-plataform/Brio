import { 
  Book, 
  FileText, 
  Shield, 
  Activity, 
  MessageSquare, 
  Calendar, 
  Users, 
  Star, 
  Eye, 
  GitFork, 
  Trophy 
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RightSidebarMetrics, RightSidebarReview, RightSidebarSection } from "./types"

export const MOCK_METRICS: RightSidebarMetrics = {
  stars: 11800,
  views: 102,
  forks: 3100,
  rewards: 5
}

export const MOCK_REVIEWS: RightSidebarReview[] = [
  {
    id: "1",
    title: "Análise de Dados",
    reviewer: "Maria Silva",
    progress: 65,
    timeLeft: "2 dias",
    status: "em andamento"
  },
  {
    id: "2",
    title: "Metodologia",
    reviewer: "João Santos",
    progress: 90,
    timeLeft: "1 dia",
    status: "revisão final"
  },
  {
    id: "3",
    title: "Resultados",
    reviewer: "Ana Costa",
    progress: 30,
    timeLeft: "5 dias",
    status: "iniciado"
  }
]

export const MOCK_SECTIONS: RightSidebarSection[] = [
  {
    title: "Documentação",
    icon: Book,
    content: (
      <>
        <Button variant="ghost" className="w-full justify-start pl-8">
          <FileText className="h-4 w-4 mr-2" />
          <span>Guia de Início Rápido</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start pl-8">
          <Shield className="h-4 w-4 mr-2" />
          <span>Política de Segurança</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start pl-8">
          <FileText className="h-4 w-4 mr-2" />
          <span>Licença MIT</span>
        </Button>
      </>
    )
  },
  {
    title: "Atividades",
    icon: Activity,
    content: (
      <>
        <Button variant="ghost" className="w-full justify-start pl-8">
          <MessageSquare className="h-4 w-4 mr-2" />
          <span>Discussões</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start pl-8">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Eventos</span>
        </Button>
      </>
    )
  },
  {
    title: "Colaboradores",
    icon: Users,
    content: (
      <div className="px-4">
        <div className="flex -space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Avatar key={i} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
              <AvatarFallback>BP</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">83 colaboradores</span>
      </div>
    )
  },
  {
    title: "Métricas",
    icon: Star,
    content: (
      <div className="px-4 space-y-2">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">11.8k</span>
          <span className="text-sm text-muted-foreground">estrelas</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">102</span>
          <span className="text-sm text-muted-foreground">visualizações</span>
        </div>
        <div className="flex items-center gap-2">
          <GitFork className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">3.1k</span>
          <span className="text-sm text-muted-foreground">forks</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium">5</span>
          <span className="text-sm text-muted-foreground">recompensas</span>
        </div>
      </div>
    )
  }
] 