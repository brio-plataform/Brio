"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Edit3, Share2, Trash2, Users, GitFork, Star, 
  MessageSquare, Grid, List, Plus, MoreVertical,
  Book, FileText, ExternalLink, Flag, X, Eye
} from 'lucide-react'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Modal } from "@/components/Modal/modal"
import { Project } from "@/components/Project/Project"
import { useGetProjectsAll } from '@/hooks/useGetProjectsAll'
import type { Project as ProjectType } from '@/types/types'

interface Collaborator {
  name: string;
  avatar: string;
}

interface Institution {
  name: string;
  logo: string;
}

interface ProjectStats {
  views?: number;
  stars: number;
  forks?: number;
  comments: number;
  shares?: number;
}

interface MockProject {
  id: string;
  title: string;
  description: string;
  type?: string;
  progress: number;
  institutional: boolean;
  institution: {
    name: string;
    avatar: string;
  };
  stats: ProjectStats;
  status?: string;
  tags?: string[];
  collaborators?: Array<{
    name: string;
    avatar: string;
  }>;
}

const projectColors = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-purple-500 to-indigo-500",
]

// Mock de projetos adicionais
const MOCK_PROJECTS: MockProject[] = [
  {
    id: "mock-1",
    title: "Análise de Dados em Saúde Pública",
    description: "Estudo sobre padrões epidemiológicos usando machine learning",
    type: "Pesquisa",
    progress: 75,
    institutional: true,
    institution: {
      name: "FIOCRUZ",
      avatar: "/institutions/fiocruz.jpg"
    },
    stats: {
      stars: 45,
      comments: 23,
      shares: 12,
      views: 150,
      forks: 8
    },
    status: "Em Andamento",
    tags: ["Saúde", "Machine Learning", "Dados"],
    collaborators: [
      { name: "Ana Silva", avatar: "/avatars/ana.jpg" },
      { name: "João Santos", avatar: "/avatars/joao.jpg" }
    ]
  },
  {
    id: "mock-2",
    title: "Impacto da IA na Educação Básica",
    description: "Pesquisa sobre o uso de inteligência artificial em escolas públicas",
    progress: 60,
    institutional: true,
    institution: {
      name: "USP",
      avatar: "/institutions/usp.jpg"
    },
    stats: {
      stars: 89,
      comments: 34,
      shares: 27
    }
  },
  {
    id: "mock-3",
    title: "Desenvolvimento Sustentável em Comunidades Ribeirinhas",
    description: "Projeto de pesquisa-ação sobre sustentabilidade na Amazônia",
    progress: 40,
    institutional: true,
    institution: {
      name: "UFAM",
      avatar: "/institutions/ufam.jpg"
    },
    stats: {
      stars: 67,
      comments: 45,
      shares: 31
    }
  }
]

export default function MenagerProjects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [allProjects, setAllProjects] = useState<MockProject[]>([...MOCK_PROJECTS])
  
  const { projects, isLoading, error, refetch } = useGetProjectsAll()

  // Função para converter projeto da API para formato mock
  const convertApiProjectToMock = (apiProject: any): MockProject => {
    return {
      id: apiProject.id.toString(),
      title: apiProject.name,
      description: apiProject.description || "",
      type: apiProject.type || "Projeto",
      progress: apiProject.progress || 0,
      institutional: true,
      institution: {
        name: apiProject.institution?.name || "",
        avatar: apiProject.institution?.logo || "/placeholder.svg"
      },
      stats: {
        stars: apiProject.stats?.stars || 0,
        comments: apiProject.stats?.comments || 0,
        shares: apiProject.stats?.shares || 0,
        views: apiProject.stats?.views || 0,
        forks: apiProject.stats?.forks || 0
      },
      status: apiProject.status,
      tags: apiProject.tags,
      collaborators: apiProject.collaborators?.map((c: any) => ({
        name: c.name,
        avatar: c.avatar
      })) || []
    }
  }

  // Atualiza allProjects quando projects mudar
  useEffect(() => {
    if (projects && projects.length > 0) {
      setAllProjects(prev => {
        const mockIds = MOCK_PROJECTS.map(p => p.id)
        const convertedApiProjects = projects
          .filter(p => !mockIds.includes(p.id.toString()))
          .map(convertApiProjectToMock)
        return [...MOCK_PROJECTS, ...convertedApiProjects]
      })
    }
  }, [projects])

  // Filtrar projetos
  const filteredProjects = allProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || project.type === filterType)
  )

  if (isLoading) {
    return <div>Carregando projetos...</div>
  }

  if (error) {
    return <div>Erro ao carregar projetos: {error.message}</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header - substituir motion.div por div com animação CSS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
                      animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seus Projetos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e colabore em seus projetos acadêmicos
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Pesquisar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Research Paper">Artigo de Pesquisa</SelectItem>
              <SelectItem value="Book">Livro</SelectItem>
              <SelectItem value="Article">Artigo</SelectItem>
              <SelectItem value="Research Project">Projeto de Pesquisa</SelectItem>
              <SelectItem value="Case Study">Estudo de Caso</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid Flexível que alterna entre lista e grid */}
      <div className={`grid gap-4 transition-all duration-300 ${
        viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1"
      }`}>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            colorClass={projectColors[index % projectColors.length]}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}

// Componente ProjectCard sem Framer Motion
function ProjectCard({ 
  project, 
  colorClass, 
  viewMode 
}: { 
  project: MockProject
  colorClass: string
  viewMode: "grid" | "list"
}) {
  const router = useRouter()

  return (
    <div className="animate-in fade-in-0 duration-500">
      <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg
        ${viewMode === "grid" ? "h-[280px]" : "h-auto"}`}
      >
        {viewMode === "list" ? (
          <div className="flex h-full">
            {/* Barra Lateral Colorida */}
            <div className={`w-1 bg-gradient-to-b ${colorClass}`} />

            <div className="flex flex-1 p-6">
              {/* Seção Principal - Informações do Projeto */}
              <div className="flex flex-[0.7] items-center gap-6">
                {/* Avatar da Instituição */}
                <div className="flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={project.institution.avatar} alt={project.institution.name} />
                    <AvatarFallback>{project.institution.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Informações Principais */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {project.type && (
                      <Badge variant="secondary" className="bg-secondary/10">
                        {project.type}
                      </Badge>
                    )}
                    {project.status && (
                      <Badge variant={project.status === "Em Andamento" ? "default" : "secondary"}
                             className="text-xs">
                        {project.status}
                      </Badge>
                    )}
                  </div>

                  <h3 
                    onClick={() => router.push(`/user/projects/${project.id}`)}
                    className="text-lg font-semibold tracking-tight hover:text-primary 
                             transition-colors cursor-pointer mb-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <ProjectTags tags={project.tags} />
                    <ProjectCollaborators collaborators={project.collaborators} />
                  </div>
                </div>
              </div>

              {/* Seção de Status e Ações */}
              <div className="flex flex-[0.3] items-center justify-end gap-8 pl-6 ml-6 border-l">
                {/* Progresso */}
                <div className="flex items-center gap-3">
                  <ProjectProgress progress={project.progress} status={project.status} />
                  <div className="h-8 w-[1px] bg-border" /> {/* Separador vertical */}
                  <ProjectStats stats={project.stats} />
                </div>

                {/* Menu de Ações */}
                <ProjectMenu project={project} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className={`h-1.5 bg-gradient-to-r ${colorClass}`} />
            
            {/* Header mais compacto - 25% altura */}
            <CardHeader className="flex-[0.25] space-y-1 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap">
                  {project.type && (
                    <Badge variant="secondary" className="bg-secondary/10 text-xs px-2 py-0">
                      {project.type}
                    </Badge>
                  )}
                  {project.status && (
                    <Badge variant={project.status === "Em Andamento" ? "default" : "secondary"}
                           className="text-xs px-2 py-0">
                      {project.status}
                    </Badge>
                  )}
                </div>
                <ProjectMenu project={project} />
              </div>

              <h3 
                onClick={() => router.push(`/user/projects/${project.id}`)}
                className="font-semibold tracking-tight hover:text-primary 
                         transition-colors cursor-pointer line-clamp-1"
              >
                {project.title}
              </h3>
            </CardHeader>

            {/* Content mais compacto - 75% altura */}
            <CardContent className="flex-[0.75] flex flex-col justify-between p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <ProjectTags tags={project.tags} />
              </div>

              <div className="space-y-3 mt-auto">
                <div className="flex items-center justify-between">
                  <ProjectProgress progress={project.progress} status={project.status} />
                  <ProjectCollaborators collaborators={project.collaborators} />
                </div>
                <div className="pt-2 border-t">
                  <ProjectStats stats={project.stats} />
                </div>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  )
}

// Adicionar os componentes auxiliares que faltam
function ProjectMenu({ project }: { project: MockProject }) {
  const router = useRouter()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" 
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => router.push(`/user/projects/${project.id}`)}>
            <FileText className="w-4 h-4 mr-2" />
            Abrir Estudo
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit3 className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsPreviewOpen(true)}>
            <Book className="w-4 h-4 mr-2" />
            Pré-visualizar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GitFork className="w-4 h-4 mr-2" />
            Fazer Fork
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExternalLink className="w-4 h-4 mr-2" />
            Abrir em Nova Aba
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de Pré-visualização */}
      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
      >
        <div className="relative">
          {/* Botão de Fechar */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50"
            onClick={() => setIsPreviewOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Componente Project em modo somente leitura */}
          <Project editable={false}  projectId="1"/>
        </div>
      </Modal>
    </>
  )
}

function ProjectProgress({ progress = 0, status = 'N/A' }: { progress?: number; status?: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 transform -rotate-90">
          <circle cx="16" cy="16" r="14" strokeWidth="3" fill="none" className="stroke-muted" />
          <circle
            cx="16"
            cy="16"
            r="14"
            strokeWidth="3"
            fill="none"
            stroke="currentColor"
            className="stroke-primary transition-all duration-500"
            strokeDasharray={14 * 2 * Math.PI}
            strokeDashoffset={14 * 2 * Math.PI * (1 - progress / 100)}
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        text-[10px] font-medium">
          {progress}%
        </span>
      </div>
    </div>
  )
}

function ProjectTags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" 
               className="bg-secondary/10 px-2 py-0 text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

function ProjectCollaborators({ collaborators }: { collaborators?: Array<{ name: string; avatar: string }> }) {
  if (!collaborators?.length) return null;

  return (
    <div className="flex -space-x-2">
      {collaborators.map((collaborator, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="w-8 h-8 border-2 border-background">
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback>{collaborator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{collaborator.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

function ProjectStats({ stats, compact = false }: { stats?: ProjectStats; compact?: boolean }) {
  if (!stats) return null;
  
  const iconClass = compact ? "w-3.5 h-3.5" : "w-4 h-4";
  const textClass = compact ? "text-xs" : "text-sm";
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star className={`${iconClass} text-muted-foreground`} />
          <span className={`${textClass} text-muted-foreground font-medium`}>{stats.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className={`${iconClass} text-muted-foreground`} />
          <span className={`${textClass} text-muted-foreground font-medium`}>{stats.comments}</span>
        </div>
        {stats.shares !== undefined && (
          <div className="flex items-center gap-1">
            <Share2 className={`${iconClass} text-muted-foreground`} />
            <span className={`${textClass} text-muted-foreground font-medium`}>{stats.shares}</span>
          </div>
        )}
      </div>
    </div>
  )
}
