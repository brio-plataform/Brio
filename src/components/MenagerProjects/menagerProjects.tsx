"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Edit3, Share2, Trash2, GitFork, Star, 
  MessageSquare, Grid, List, Plus, MoreVertical,
  Book, FileText, ExternalLink, X,
  Lock, Globe, Building2,
  Users
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
import { useGetAllProjects } from '@/store/useGetAllProjects'
import axios from 'axios'
import { MockProject } from '@/types/types'

interface ProjectStats {
  views?: number;
  stars: number;
  forks?: number;
  comments: number;
  shares?: number;
}

const projectColors = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-purple-500 to-indigo-500",
]

// Primeiro, vamos definir os tipos possíveis como uma constante
const PROJECT_MODELS = {
  ARTICLE: "article",
  THESIS: "thesis",
  BOOK: "book",
  RESEARCH: "research"
} as const

// Adicionar constante para visibilidade
const PROJECT_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
  INSTITUTIONAL: "institutional"
} as const

// Adicionar constantes para as cores dos badges
const MODEL_BADGE_STYLES = {
  article: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  thesis: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  book: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  research: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
}

const VISIBILITY_BADGE_STYLES = {
  private: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  public: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  institutional: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
}

// Definir tipo para status
type ProjectStatus = "Em Andamento" | "Concluído" | string;

// Atualizar a constante com tipo
const STATUS_BADGE_STYLES: Record<ProjectStatus, string> = {
  "Em Andamento": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Concluído": "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
  default: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
} as const;

// Adicionar constantes para as cores dos badges no topo do arquivo
const TAG_BADGE_STYLES = {
  "UI/UX": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Design": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Research": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Development": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  default: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
} as const;

export default function MenagerProjects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  
  // Usar o store ao invés do hook
  const { projects, isLoading, error, fetchProjects, deleteProject, addProject } = useGetAllProjects()
  const router = useRouter()

  // Carregar projetos ao montar o componente
  useEffect(() => {
    fetchProjects()
  }, [])

  // Filtrar projetos
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || project.model === filterType
    return matchesSearch && matchesType
  })

  // Atualizar função de criar projeto
  const handleCreateNewProject = async () => {
    try {
      const newProject = {
        userId: "1", // Idealmente, pegar do contexto de autenticação
        name: "Novo Projeto",
        description: "Descrição do novo projeto",
        logo: "/placeholder.svg",
        createdAt: new Date().toISOString(),
        banner: "/placeholder.svg",
        wordCount: 0,
        citations: [],
        model: PROJECT_MODELS.ARTICLE,
        visibility: "private",
        progress: 0,
        author: {
          name: "John Doe", // Idealmente, pegar do contexto de autenticação
          avatar: "/path/to/avatar.jpg",
          institution: "Institution Name"
        },
        stats: {
          views: 0,
          stars: 0,
          forks: 0,
          comments: 0
        },
        version: [
          {
            version: "1.0.0",
            updatedAt: new Date().toISOString()
          }
        ],
        content: [
          {
            id: crypto.randomUUID(),
            type: "heading",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              level: 1
            },
            content: [
              {
                type: "text",
                text: "Novo Projeto",
                styles: {}
              }
            ],
            children: []
          }
        ],
        updatedAt: new Date().toISOString()
      }

      const response = await axios.post('http://localhost:3001/projects', newProject)
      
      // Adicionar ao store antes de redirecionar
      addProject({
        id: response.data.id,
        title: response.data.name,
        description: response.data.description || "",
        model: response.data.model || PROJECT_MODELS.ARTICLE,
        visibility: response.data.visibility || PROJECT_VISIBILITY.PRIVATE,
        progress: response.data.progress || 0,
        institutional: true,
        institution: {
          name: response.data.author?.institution || "",
          avatar: response.data.logo || "/placeholder.svg"
        },
        stats: {
          views: response.data.stats?.views || 0,
          stars: response.data.stats?.stars || 0,
          forks: response.data.stats?.forks || 0,
          comments: response.data.stats?.comments || 0,
          shares: response.data.stats?.shares || 0
        },
        status: response.data.status,
        tags: response.data.tags,
        collaborators: response.data.collaborators?.map((c: any) => ({
          name: c.name,
          avatar: c.avatar
        })) || []
      })

      router.push(`/user/projects/${response.data.id}`)
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
    }
  }

  if (isLoading) {
    return <div>Carregando projetos...</div>
  }

  if (error) {
    return <div>Erro ao carregar projetos: {error}</div>
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
        <Button 
          className="gap-2"
          onClick={handleCreateNewProject}
        >
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
              <SelectItem value="article">Artigo</SelectItem>
              <SelectItem value="thesis">Tese</SelectItem>
              <SelectItem value="book">Livro</SelectItem>
              <SelectItem value="research">Pesquisa</SelectItem>
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
                    <Badge variant="secondary" 
                           className={`${MODEL_BADGE_STYLES[project.model]} border-0`}>
                      {project.model === PROJECT_MODELS.ARTICLE && 'Artigo'}
                      {project.model === PROJECT_MODELS.THESIS && 'Tese'}
                      {project.model === PROJECT_MODELS.BOOK && 'Livro'}
                      {project.model === PROJECT_MODELS.RESEARCH && 'Pesquisa'}
                    </Badge>
                    
                    <Badge variant="secondary" 
                           className={`text-xs flex items-center gap-1 border-0
                                      ${VISIBILITY_BADGE_STYLES[project.visibility]}`}>
                      {project.visibility === PROJECT_VISIBILITY.PRIVATE && (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>Privado</span>
                        </>
                      )}
                      {project.visibility === PROJECT_VISIBILITY.PUBLIC && (
                        <>
                          <Globe className="w-3 h-3" />
                          <span>Público</span>
                        </>
                      )}
                      {project.visibility === PROJECT_VISIBILITY.INSTITUTIONAL && (
                        <>
                          <Building2 className="w-3 h-3" />
                          <span>Institucional</span>
                        </>
                      )}
                    </Badge>
                    
                    {project.status && (
                      <Badge variant="secondary"
                             className={`text-xs px-2 py-0 border-0
                                          ${STATUS_BADGE_STYLES[project.status as ProjectStatus] || STATUS_BADGE_STYLES.default}`}>
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
            
            {/* Header - mantém o mesmo design */}
            <CardHeader className="flex-[0.25] space-y-1 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-3 flex-wrap">
                  <Badge variant="secondary" 
                         className={`${MODEL_BADGE_STYLES[project.model]} border-0`}>
                    {project.model === PROJECT_MODELS.ARTICLE && 'Artigo'}
                    {project.model === PROJECT_MODELS.THESIS && 'Tese'}
                    {project.model === PROJECT_MODELS.BOOK && 'Livro'}
                    {project.model === PROJECT_MODELS.RESEARCH && 'Pesquisa'}
                  </Badge>
                  
                  <Badge variant="secondary" 
                         className={`text-xs flex items-center gap-1 border-0
                                    ${VISIBILITY_BADGE_STYLES[project.visibility]}`}>
                    {project.visibility === PROJECT_VISIBILITY.PRIVATE && (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Privado</span>
                      </>
                    )}
                    {project.visibility === PROJECT_VISIBILITY.PUBLIC && (
                      <>
                        <Globe className="w-3 h-3" />
                        <span>Público</span>
                      </>
                    )}
                    {project.visibility === PROJECT_VISIBILITY.INSTITUTIONAL && (
                      <>
                        <Building2 className="w-3 h-3" />
                        <span>Institucional</span>
                      </>
                    )}
                  </Badge>
                  
                  {project.status && (
                    <Badge variant="secondary"
                           className={`text-xs px-2 py-0 border-0
                                        ${STATUS_BADGE_STYLES[project.status as ProjectStatus] || STATUS_BADGE_STYLES.default}`}>
                      {project.status}
                    </Badge>
                  )}
                </div>
                <ProjectMenu project={project} />
              </div>

              {/* Título e Instituição agrupados */}
              <div className="space-y-1">
                <h3 
                  onClick={() => router.push(`/user/projects/${project.id}`)}
                  className="font-semibold tracking-tight hover:text-primary 
                            transition-colors cursor-pointer line-clamp-1"
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={project.institution.avatar} alt={project.institution.name} />
                    <AvatarFallback>{project.institution.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {project.institution.name}
                  </span>
                </div>
              </div>
            </CardHeader>

            {/* Content - melhor organizado */}
            <CardContent className="flex-[0.75] flex flex-col justify-between px-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <ProjectTags tags={project.tags} />
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <div className="flex items-center justify-between">
                  <ProjectStats stats={project.stats} compact />
                  <div className="flex items-center gap-2">
                    <ProjectCollaborators collaborators={project.collaborators} />
                    <ProjectProgress progress={project.progress} status={project.status} />
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  )
}

// Primeiro, vamos criar um componente para o Modal de Confirmação
function DeleteProjectModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  projectTitle 
}: { 
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  projectTitle: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">
            Excluir Projeto
          </h3>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o projeto <span className="font-medium">"{projectTitle}"</span>? 
            Esta ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Excluir Projeto
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Atualizar o ProjectMenu para usar deleteProject do store
function ProjectMenu({ project }: { project: MockProject }) {
  const router = useRouter()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { deleteProject } = useGetAllProjects()

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id)
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
    }
  }

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
          <DropdownMenuItem 
            className="text-destructive"
            onClick={() => setIsDeleteModalOpen(true)}
          >
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

      {/* Modal de Confirmação de Exclusão */}
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteProject()
          setIsDeleteModalOpen(false)
        }}
        projectTitle={project.title}
      />
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
  if (!tags?.length) return null;
  
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge 
          key={tag} 
          variant="secondary" 
          className={`${TAG_BADGE_STYLES[tag as keyof typeof TAG_BADGE_STYLES] || TAG_BADGE_STYLES.default} 
                     border-0 px-2 py-0.5 text-xs hover:opacity-80 transition-opacity cursor-pointer`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

function ProjectCollaborators({ collaborators }: { collaborators?: Array<{ name: string; avatar: string }> }) {
  if (!collaborators?.length) return null;

  return (
    <Badge variant="secondary" 
           className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 
                    dark:text-violet-300 border-0 flex items-center gap-1">
      <Users className="w-3 h-3" />
      <span>{collaborators.length}</span>
    </Badge>
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
