// Enums e constantes
export const PROJECT_MODELS = {
  ARTICLE: "article",
  THESIS: "thesis",
  BOOK: "book",
  RESEARCH: "research"
} as const

export type ProjectModel = typeof PROJECT_MODELS[keyof typeof PROJECT_MODELS]

export const PROJECT_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
  INSTITUTIONAL: "institutional"
} as const

export type ProjectVisibility = typeof PROJECT_VISIBILITY[keyof typeof PROJECT_VISIBILITY]

// Interfaces base
export interface Institution {
  name: string
  avatar: string
}

export interface Collaborator {
  name: string
  avatar: string
}

export interface ProjectStats {
  views?: number
  stars: number
  forks?: number
  comments: number
  shares?: number
}

// Interface principal do projeto
export interface MockProject {
  id: string
  title: string
  banner: string
  logo: string
  description: string
  model: ProjectModel
  visibility: ProjectVisibility
  progress: number
  institutional: boolean
  institution: Institution
  stats: ProjectStats
  status?: ProjectStatus
  tags?: string[]
  collaborators?: Collaborator[]
}

// Types auxiliares
export type ProjectStatus = "Em Andamento" | "Concluído" | string
export type ViewMode = 'grid' | 'list'

// Interfaces de componentes
export interface ProjectCardProps {
  project: MockProject
  colorClass: string
  viewMode: ViewMode
}

export interface ProjectMenuProps {
  project: MockProject
}

export interface ProjectStatsProps {
  stats: ProjectStats
  compact?: boolean
}

export interface ProjectProgressProps {
  progress?: number
  status?: string
}

export interface ProjectTagsProps {
  tags?: string[]
}

export interface ProjectCollaboratorsProps {
  collaborators?: Collaborator[]
}

export interface DeleteProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  projectTitle: string
}

// Estilos e cores
export const VISIBILITY_BADGE_STYLES: Record<ProjectVisibility, string> = {
  private: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  public: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  institutional: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
}

export const STATUS_BADGE_STYLES: Record<ProjectStatus, string> = {
  "Em Andamento": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Concluído": "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
  default: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
} as const

export const MODEL_BADGE_STYLES: Record<ProjectModel, string> = {
  article: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  thesis: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  book: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  research: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
} as const

export const PROJECT_COLORS = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-purple-500 to-indigo-500",
] as const

export const colorPairs = [
  { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
  { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
  { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" },
  { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300" },
  { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300" },
  { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-300" },
  { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-300" }
] 