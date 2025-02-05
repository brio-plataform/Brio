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
  comments: number
}

// Tipos específicos para Project
type ProjectModel = 'article' | 'thesis' | 'book' | 'research'
type ProjectVisibility = 'private' | 'public' | 'institutional'
type ProjectType = 'personal' | 'institutional' | 'collaborative'

interface Project {
  id: string
  userId: string
  name: string
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
interface CommentType {
  id: string
  author: {
    name: string
    avatar: string
    institution?: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: CommentType[]
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
  CommentType,
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
  ErrorAction
} 