// Tipos relacionados ao User
interface User {
  id: string
  name: string
  email: string
  password: string
}

// Tipos relacionados ao Content (Editor)
interface ContentText {
  type: "text"
  text: string
  styles: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
    textColor?: string
  }
}

interface ContentProps {
  textColor: "default" | string
  backgroundColor: "default" | string
  textAlignment: "left" | "center" | "right"
  level?: number // para headings
  name?: string // para imagens
  url?: string // para imagens
  caption?: string // para imagens
  showPreview?: boolean // para imagens
  previewWidth?: number // para imagens
}

interface ContentBlock {
  id: string
  type: "heading" | "paragraph" | "image" | "bulletListItem"
  props: ContentProps
  content: ContentText[]
  children: ContentBlock[]
}

// Tipos relacionados ao Project
interface ProjectVersion {
  version: string
  updatedAt: string
}

interface ProjectStats {
  views: number
  stars: number
  forks: number
  citations: number
  comments: number
  reviews?: number
}

// Tipos específicos para Project
type ProjectModel = 'article' | 'thesis' | 'book' | 'research'
type ProjectVisibility = 'private' | 'public' | 'institutional'
type ProjectType = 'personal' | 'institutional' | 'collaborative'

interface Project {
  id: string
  userId: string
  name: string
  title: string
  description: string
  logo: string
  createdAt: string
  updatedAt: string
  banner: string
  wordCount: number
  citations: string[]
  model: ProjectModel
  visibility: ProjectVisibility
  progress: number
  type: ProjectType
  status?: string
  collaborators: Array<{ name: string; avatar: string }> | number
  tags?: string[]
  author: {
    name: string
    avatar: string
    institution: string
  }
  stats: ProjectStats
  version: ProjectVersion[]
  content: ContentBlock[]
}

// Tipos relacionados ao Author (expandido)
interface Author {
  id: string
  name: string
  avatar: string
  username?: string
  bio?: string
  email?: string
  institution?: Institution
  projects?: Project[]
  mutualFriends?: MutualFriend[]
}

interface MutualFriend {
  id: string
  name: string
  avatar: string
}

interface Institution {
  name: string
  link: string
  logo?: string
  type?: string
  researchersCount?: number
  publicationsCount?: number
  description?: string
  location?: string
  departments?: string[]
  projects?: Project[]
}

// Tipos relacionados aos Comments
interface CommentAuthor {
  name: string
  avatar: string
  institution?: string
}

interface CommentMetrics {
  likes: number
  replies: number
  isLiked: boolean
}

interface CommentState {
  isReplying: boolean
  showReplies: boolean
  replyContent: string
}

interface CommentType {
  id: string
  author: CommentAuthor
  content: string
  timestamp: Date
  likes: number
  replies?: CommentType[]
}

interface CommentProps {
  id: string
  author: CommentAuthor
  content: string
  timestamp: Date
  likes: number
  replies: number
  level: number
  onReply: (commentId: string, content: string) => void
  onShare?: () => void
  onReport?: () => void
  children?: React.ReactNode
}

// Tipos relacionados ao Feed
interface FeedItemProps {
  author: Author
  title: string
  content: {
    summary: string
    full: string
  }
  tags: string[]
  likes: number
  comments: CommentType[]
  forks: number
  citations: number
  references: Citation[]
  links?: LinkPreview[]
  timestamp: Date
  project?: Project
}

interface Citation {
  type: "person" | "article" | "post" | "media"
  content: string
  link: string
}

// Tipos relacionados ao Link Preview
interface LinkPreview {
  url: string
  title: string
  description: string
  image?: string
}

// Tipos relacionados ao Banner
interface Banner {
  id: number
  title: string
  description: string
  type: "event" | "promotion" | "award" | "course" | "study" | "forum" | "library" | "partnership"
  date?: string
  link: string
  bgColor: string
  textColor: string
  buttonText?: string
  institution?: string
}

// Tipos relacionados ao Column Feed
interface ColumnFeedItem {
  title: string
  subtitle: string
  type: "study" | "forum" | "event"
  metrics?: {
    citations?: number
    contributors?: number
    reviews?: number
    participants?: number
  }
  date?: string
  location?: string
}

interface ColumnFeedSection {
  title: string
  description: string
  items: ColumnFeedItem[]
}

// Tipos relacionados ao Project Store
interface ProjectState {
  currentProject: Project | null
  projects: Project[]
  loading: boolean
  error: string | null
  editorContent: string | null
  
  // Actions
  setCurrentProject: (project: Project) => void
  saveProject: (projectData: Partial<Project>) => Promise<void>
  updateProjectContent: (content: ContentBlock[]) => Promise<void>
  fetchProjects: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
  setEditorContent: (content: string) => void
  saveEditorContent: () => Promise<void>
  updateProjectField: (field: keyof Project, value: any) => void
}

// Tipos para os Hooks
interface ProjectHookReturn {
  project: Project | null
  isLoading: boolean
  error: Error | null
  name?: string
  description?: string
  type?: ProjectType
  content?: ContentBlock[]
  versions?: ProjectVersion[]
  lastVersion?: ProjectVersion
  updatedAt?: string
  createdAt?: string
  userId?: string
  logo?: string
  banner?: string
  wordCount?: number
  citations?: string[]
  progress?: number
  model?: ProjectModel
  visibility?: ProjectVisibility
  author?: Project['author']
  stats?: ProjectStats
}

interface UpdateProjectData {
  name?: string
  description?: string
  content?: ContentBlock[]
  version?: ProjectVersion[]
  logo?: string
  banner?: string
  wordCount?: number
  citations?: string[]
  model?: ProjectModel
  visibility?: ProjectVisibility
  progress?: number
  type?: ProjectType
}

interface UpdateProjectHookReturn {
  updateProject: (data: UpdateProjectData) => Promise<Project>
  updateName: (name: string) => Promise<Project>
  updateDescription: (description: string) => Promise<Project>
  updateContent: (content: ContentBlock[]) => Promise<Project>
  addVersion: (newVersion: ProjectVersion) => Promise<Project>
  updateLogo: (logo: string) => Promise<Project>
  updateBanner: (banner: string) => Promise<Project>
  updateWordCount: (wordCount: number) => Promise<Project>
  updateCitations: (citations: string[]) => Promise<Project>
  updateModel: (model: ProjectModel) => Promise<Project>
  updateVisibility: (visibility: ProjectVisibility) => Promise<Project>
  updateProgress: (progress: number) => Promise<Project>
  updateType: (type: ProjectType) => Promise<Project>
  isLoading: boolean
  error: Error | null
}

// Tipos relacionados ao Editor
interface EditorProps {
  initialContent?: string | null
  editable?: boolean
}

interface EditorThemeColors {
  editor: {
    text: string
    background: string
  }
  tooltip: {
    text: string
    background: string
  }
}

interface EditorTheme {
  colors: EditorThemeColors
  borderRadius: number
  fontFamily: string
}

interface EditorBlock {
  type: "paragraph" | "heading" | "bulletListItem" | "numberedListItem" | "image"
  content: Array<{
    type: "text" | "link" | "image"
    text?: string
    styles?: {
      bold?: boolean
      italic?: boolean
      underline?: boolean
      strike?: boolean
      code?: boolean
      textColor?: string
      backgroundColor?: string
    }
    href?: string
    url?: string
  }>
  props?: {
    textAlignment?: "left" | "center" | "right"
    level?: 1 | 2 | 3
  }
}

interface EditorContent {
  blocks: EditorBlock[]
  version: string
}

interface EditorState {
  content: EditorContent | null
  hasChanges: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setContent: (content: EditorContent) => void
  saveContent: () => Promise<void>
  updateBlock: (blockId: string, block: Partial<EditorBlock>) => void
  clearContent: () => void
}

// Tipos relacionados aos componentes de Error
interface ErrorPageProps {
  title?: string
  message?: string
  error?: Error | string
  showReload?: boolean
  showHome?: boolean
  customActions?: React.ReactNode
}

interface UnauthorizedPageProps {
  title?: string
  message?: string
  showLogin?: boolean
  showHome?: boolean
  customActions?: React.ReactNode
  supportMessage?: string
}

interface ErrorAction {
  icon: React.ElementType
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

// Tipos relacionados ao Header
interface HeaderCollaborator {
  id: string
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'away'
}

interface HeaderTopProps {
  lastEdited: Date
  wordCount: number
  citationCount: number
  aiAssistant: boolean
  progress: number
  handleProgressChange: (event: React.FormEvent<HTMLDivElement>) => void
}

interface HeaderCoreProps {
  projectName: string
  projectDescription: string
  documentType: ProjectModel
  visibility: ProjectVisibility
  handleButtonSelectChange: (value: string) => void
  handleVisibilityChange: (value: ProjectVisibility) => void
}

interface HeaderBottomProps {
  currentVersion: string
  collaborators: HeaderCollaborator[]
}

interface HeaderProps {
  projectId: string
}

// Tipos relacionados ao Project Viewer Header
interface ProjectViewerHeaderTopProps {
  stats: ProjectStats
  lastUpdate: Date
}

interface ProjectAuthor {
  name: string
  avatar: string
  institution?: string
}

interface ProjectViewerData {
  title: string
  description: string
  type: ProjectModel
  author: ProjectAuthor
  currentVersion: string
  stats: ProjectStats
  lastUpdate: Date
}

interface ProjectViewerHeaderCoreProps {
  project: ProjectViewerData
}

interface ProjectViewerHeaderBottomProps {
  onNavigate: (section: string) => void
}

interface ProjectViewerHeaderProps {
  projectId: string
}

// Tipos relacionados ao Left Sidebar
import { LucideIcon } from "lucide-react"
import { StaticImageData } from "next/image"

// Tipos base compartilhados
interface BaseSidebarState {
  isCollapsed: boolean
  openSections: string[]
}

interface BaseSidebarProps {
  defaultCollapsed?: boolean
  className?: string
}

// Tipos específicos para LeftSidebar
interface ReviewMetadata {
  progress: number
  timeLeft: string
  reviewer: string
  status: 'iniciado' | 'em andamento' | 'revisão final'
}

interface SidebarMenuItem {
  icon: LucideIcon
  label: string
  href?: string
  items?: (Omit<SidebarMenuItem, 'items'> & {
    metadata?: ReviewMetadata
  })[]
}

type SidebarState = BaseSidebarState
type SidebarProps = BaseSidebarProps

// Tipos específicos para RightSidebar
interface RightSidebarMenuItem {
  icon: LucideIcon
  title: string
  content: React.ReactNode
}

interface RightSidebarReview {
  id: string
  title: string
  reviewer: string
  progress: number
  timeLeft: string
  status: 'iniciado' | 'em andamento' | 'revisão final'
}

interface RightSidebarMetrics {
  stars: number
  views: number
  forks: number
  rewards: number
}

interface RightSidebarCollaborator {
  id: string
  name: string
  avatar: string
  status?: 'online' | 'offline' | 'away'
}

interface RightSidebarSection {
  title: string
  icon: LucideIcon
  content: React.ReactNode
}

interface RightSidebarState {
  isCollapsed: boolean
  openSections: string[]
  description?: string
  metrics?: RightSidebarMetrics
  collaborators?: RightSidebarCollaborator[]
  reviews: RightSidebarReview[]
  sections: RightSidebarSection[]
}

interface RightSidebarProps {
  defaultCollapsed?: boolean
  className?: string
  description?: string
  metrics?: RightSidebarMetrics
  collaborators?: RightSidebarCollaborator[]
  reviews: RightSidebarReview[]
  sections: RightSidebarSection[]
  onSectionToggle?: (section: string) => void
  onCollapse?: (collapsed: boolean) => void
}

// Tipos relacionados ao Project Component
interface ProjectProps {
  editable?: boolean
}

// Tipos relacionados ao ProjectBanner Component
interface ProjectBannerProps {
  editable?: boolean
}

interface ProjectBannerState {
  bannerImage: string
  bannerPosition: string
  isRepositioning: boolean
  imageError: boolean
  isUploading: boolean
  showImageDialog: boolean
  imageUrl: string
}

// Tipos relacionados ao ProjectInfo Component
interface ProjectInfoProps {
  editable?: boolean
}

interface ProjectInfoState {
  imageError: boolean
  isUploading: boolean
  showImageDialog: boolean
  imageUrl: string
}

interface ProjectInfoHandlers {
  handleImageError: () => void
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  handleUrlSubmit: (e: React.FormEvent) => Promise<void>
  handleNameChange: (value: string) => Promise<void>
  handleDescriptionChange: (value: string) => Promise<void>
}

// Tipos relacionados ao CreatePost
export type PostType = 'text' | 'study' | 'question' | 'event'
export type QuestionType = 'question' | 'poll' | 'debate'
export type ReferenceType = 'profile' | 'document' | 'comment'

export interface BaseReference {
  id: string
  type: ReferenceType
  content: string
  metadata?: {
    title?: string
    author?: string
    date?: string
    url?: string
    fileSize?: string
    fileType?: string
  }
}

export interface PollOption {
  id: string
  text: string
  votes?: number
}

export interface DebateSettings {
  moderationEnabled: boolean
  argumentTimeLimit?: number // em minutos
  startDate?: Date
  endDate?: Date
  topics: [string, string] // [Posição A, Posição B]
}

export interface EventSettings {
  location?: string
  startDate: Date
  endDate?: Date
  maxParticipants?: number
  requiresRegistration: boolean
  isPrivate: boolean
}

export interface CreatePostState {
  postType: PostType
  title: string
  content: string
  tags: string[]
  currentTag: string
  references: BaseReference[]
  currentReference: string
  referenceType: ReferenceType
  
  // Para questões
  questionType?: QuestionType
  allowAnonymousResponses?: boolean
  notifyNewResponses?: boolean
  
  // Para enquetes
  pollOptions?: PollOption[]
  
  // Para debates
  debateSettings?: DebateSettings
  
  // Para eventos
  eventSettings?: EventSettings
}

export interface CreatePostActions {
  setTitle: (title: string) => void
  setContent: (content: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  addReference: (reference: BaseReference) => void
  removeReference: (referenceId: string) => void
  setPollOption: (id: string, text: string) => void
  removePollOption: (id: string) => void
  setDebateSettings: (settings: Partial<DebateSettings>) => void
  setEventSettings: (settings: Partial<EventSettings>) => void
  handleSubmit: () => Promise<void>
}

export interface CreatePostDialogState {
  isOpen: boolean
  isSubmitting: boolean
  error?: string
}

export interface CreatePostProps {
  user?: User;
  placeholder?: string;
  showMediaButton?: boolean;
  showFileButton?: boolean;
  showLinkButton?: boolean;
  customActions?: React.ReactNode;
  className?: string;
  onSubmit?: (content: string) => Promise<void>;
  onMediaAdd?: () => void;
  onFileAdd?: () => void;
  onLinkAdd?: () => void;
  img: StaticImageData | string;
}

// Constantes
export const MAX_TITLE_LENGTH = 100
export const MAX_TAGS = 5
export const MAX_POLL_OPTIONS = 10
export const MIN_POLL_OPTIONS = 2

// Tipos relacionados às menções e anexos do CreatePost
export interface Mention {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  institution: string
  mutualConnections?: {
    name: string
    avatar: string
  }[]
}

export interface Attachment {
  id: string
  name: string
  size: string
  type: string
  icon: string
}

export interface Template {
  id: string
  name: string
  description: string
}

// Lista única de exportações no final do arquivo
export type {
  User,
  Project,
  ProjectVersion,
  ProjectStats,
  ContentBlock,
  ContentText,
  ContentProps,
  Author,
  MutualFriend,
  Institution,
  FeedItemProps,
  Citation,
  LinkPreview,
  Banner,
  ColumnFeedItem,
  ColumnFeedSection,
  ProjectState,
  ProjectHookReturn,
  UpdateProjectData,
  UpdateProjectHookReturn,
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  EditorProps,
  EditorTheme,
  EditorBlock,
  EditorContent,
  EditorState,
  EditorThemeColors,
  ErrorPageProps,
  UnauthorizedPageProps,
  ErrorAction,
  HeaderCollaborator,
  HeaderTopProps,
  HeaderCoreProps,
  HeaderBottomProps,
  HeaderProps,
  ProjectViewerHeaderTopProps,
  ProjectViewerHeaderCoreProps,
  ProjectViewerHeaderBottomProps,
  ProjectViewerHeaderProps,
  ProjectViewerData,
  ProjectAuthor,
  SidebarMenuItem,
  SidebarState,
  SidebarProps,
  RightSidebarMenuItem,
  RightSidebarReview,
  RightSidebarState,
  RightSidebarProps,
  RightSidebarMetrics,
  RightSidebarCollaborator,
  RightSidebarSection,
  ReviewMetadata,
  ProjectProps,
  ProjectBannerProps,
  ProjectBannerState,
  ProjectInfoProps,
  ProjectInfoState,
  ProjectInfoHandlers,
  CommentProps,
  CommentType,
  CommentAuthor,
  CommentMetrics,
  CommentState
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  model: 'article' | 'thesis' | 'book' | 'research';
  visibility: 'private' | 'public' | 'institutional';
  progress: number;
  institutional: boolean;
  institution: {
    name: string;
    avatar: string;
  };
  stats: {
    views?: number;
    stars: number;
    forks?: number;
    comments: number;
    shares?: number;
  };
  status?: string;
  tags?: string[];
  collaborators?: Array<{
    name: string;
    avatar: string;
  }>;
}

export interface ProjectsStore {
  projects: MockProject[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addProject: (project: MockProject) => void;
} 