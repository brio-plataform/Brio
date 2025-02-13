"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Edit3, Share2, Trash2, Users, GitFork, Star, 
  MessageSquare, Grid, List, Plus, MoreVertical,
  Book, FileText, ExternalLink, Flag
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

interface Collaborator {
  name: string;
  avatar: string;
}

interface Institution {
  name: string;
  logo: string;
}

interface ProjectStats {
  views: number;
  stars: number;
  forks: number;
  comments: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  type: string;
  category?: string;
  collaborators: Collaborator[] | number;
  status?: string;
  progress?: number;
  stats?: ProjectStats;
  lastUpdated?: string;
  tags?: string[];
  institution?: Institution;
  banner?: string;
  avatar?: string;
  color?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "The Impact of AI on Modern Education",
    description: "An in-depth study on how artificial intelligence is reshaping educational paradigms and methodologies.",
    type: "Research Paper",
    category: "Technology & Education",
    collaborators: [
      { name: "John Doe", avatar: "/avatars/john.jpg" },
      { name: "Jane Smith", avatar: "/avatars/jane.jpg" },
      { name: "Bob Wilson", avatar: "/avatars/bob.jpg" }
    ],
    status: "In Progress",
    progress: 65,
    stats: {
      views: 1240,
      stars: 89,
      forks: 12,
      comments: 45
    },
    lastUpdated: "2024-02-15",
    tags: ["AI", "Education", "Technology"],
    institution: {
      name: "MIT",
      logo: "/institutions/mit.png"
    }
  },
  {
    id: 2,
    title: "Sustainable Urban Planning",
    description: "Exploring innovative approaches to create environmentally friendly and socially inclusive cities.",
    type: "Book",
    collaborators: 5,
    banner: "/placeholder.svg?height=200&width=400",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "bg-gradient-to-r from-green-400 to-blue-500"
  },
  {
    id: 3,
    title: "Quantum Computing: A Beginner's Guide",
    description: "Demystifying quantum computing concepts for the general public.",
    type: "Article",
    collaborators: 2,
    banner: "/placeholder.svg?height=200&width=400",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500"
  }
]

const projectColors = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-purple-500 to-indigo-500",
]

export default function MenagerProjects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || project.type === filterType)
  )

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

      {/* Grid de Projetos - substituir motion.div por div */}
      <div className={`grid gap-6 transition-all duration-300 ${
        viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
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
  project: Project
  colorClass: string
  viewMode: "grid" | "list"
}) {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg`}>
        {viewMode === "list" ? (
          <div className="flex">
            {/* Barra Lateral Colorida */}
            <div className={`w-1 bg-gradient-to-b ${colorClass}`} />

            <div className="flex flex-1 items-center gap-6 p-4">
              {/* Seção de Informações Principais */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="bg-secondary/10">
                    {project.type}
                  </Badge>
                  <Badge variant={project.status === "In Progress" ? "default" : "secondary"}
                         className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold tracking-tight hover:text-primary 
                             transition-colors cursor-pointer truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {project.description}
                </p>
                
                {/* Tags em linha */}
                <div className="flex items-center gap-4 mt-2">
                  <ProjectTags tags={project.tags} />
                </div>
              </div>

              {/* Seção Central - Progress e Collaborators */}
              <div className="flex items-center gap-6">
                <ProjectProgress progress={project.progress} status={project.status} />
                <div className="h-8 w-[1px] bg-border" /> {/* Separador vertical */}
                <ProjectCollaborators collaborators={project.collaborators} />
              </div>

              {/* Seção de Estatísticas e Ações */}
              <div className="flex items-center gap-6">
                <ProjectStats stats={project.stats} />
                <div className="h-8 w-[1px] bg-border" /> {/* Separador vertical */}
                <ProjectMenu />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={`h-2 bg-gradient-to-r ${colorClass}`} />
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-secondary/10">
                  {project.type}
                </Badge>
                <ProjectMenu />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold tracking-tight hover:text-primary 
                             transition-colors cursor-pointer">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ProjectProgress progress={project.progress} status={project.status} />
              <ProjectTags tags={project.tags} />
              <div className="flex items-center justify-between pt-4 border-t">
                <ProjectCollaborators collaborators={project.collaborators} />
                <ProjectStats stats={project.stats} />
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}

// Adicionar os componentes auxiliares que faltam
function ProjectMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <FileText className="w-4 h-4 mr-2" />
          Abrir Estudo
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit3 className="w-4 h-4 mr-2" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Book className="w-4 h-4 mr-2" />
          Pré-visualizar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
  )
}

function ProjectProgress({ progress = 0, status = 'N/A' }: { progress?: number; status?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle cx="20" cy="20" r="18" strokeWidth="4" fill="none" className="stroke-muted" />
          <circle
            cx="20"
            cy="20"
            r="18"
            strokeWidth="4"
            fill="none"
            stroke="currentColor"
            className="stroke-primary transition-all duration-500"
            strokeDasharray={18 * 2 * Math.PI}
            strokeDashoffset={18 * 2 * Math.PI * (1 - progress / 100)}
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        text-xs font-medium">
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

function ProjectCollaborators({ collaborators }: { collaborators: Collaborator[] | number }) {
  return (
    <div className="flex -space-x-2">
      {typeof collaborators !== "number" ? (
        collaborators.slice(0, 3).map((collaborator, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-6 h-6 border-2 border-background 
                                 transition-transform hover:scale-110">
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{collaborator.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))
      ) : (
        <Badge variant="secondary" className="ml-2">
          <Users className="w-3 h-3 mr-1" />
          {collaborators}
        </Badge>
      )}
    </div>
  )
}

function ProjectStats({ stats }: { stats?: ProjectStats }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <Star className="w-4 h-4" />
              <span>{stats?.stars ?? 0}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Stars</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>{stats?.comments ?? 0}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Comments</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <GitFork className="w-4 h-4" />
              <span>{stats?.forks ?? 0}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Forks</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
