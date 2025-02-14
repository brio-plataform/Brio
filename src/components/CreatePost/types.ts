import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export type PostType = 'text' | 'study' | 'question' | 'event'
export type ReferenceType = 'profile' | 'document' | 'comment'

export interface BaseReference {
  id: string
  type: ReferenceType
  content: string
  link?: string
}

export interface ProfileReference extends BaseReference {
  type: 'profile'
  avatar?: string
  username: string
}

export interface DocumentReference extends BaseReference {
  type: 'document'
  fileName: string
  fileSize: string
}

export interface CommentReference extends BaseReference {
  type: 'comment'
  author: string
  preview: string
}

export type Reference = ProfileReference | DocumentReference | CommentReference

export interface StudyTab {
  overview: {
    summary: string
    keywords: string[]
    researchArea: string
  }
  methodology: string
  results: string
  discussion: string
}

export interface DebateConfig {
  topics: string[]
  activeModeration: boolean
  argumentTimeLimit: number
  duration: {
    start: Date
    end: Date
  }
}

export interface CreatePostUser {
  id: string
  name: string
  avatar: string | StaticImageData
  role?: string
  institution?: {
    name: string
    link: string
  }
}

export interface CreatePostProps {
  /** Usuário que está criando o post */
  user?: CreatePostUser
  /** Placeholder do editor */
  placeholder?: string
  /** Se deve mostrar o botão de mídia */
  showMediaButton?: boolean
  /** Se deve mostrar o botão de arquivo */
  showFileButton?: boolean
  /** Se deve mostrar o botão de link */
  showLinkButton?: boolean
  /** Ações customizadas */
  customActions?: ReactNode
  /** Classes CSS adicionais */
  className?: string
  /** Função chamada ao enviar o post */
  onSubmit?: (content: string) => Promise<void>
  /** Função chamada ao adicionar mídia */
  onMediaAdd?: (file: File) => Promise<void>
  /** Função chamada ao adicionar arquivo */
  onFileAdd?: (file: File) => Promise<void>
  /** Função chamada ao adicionar link */
  onLinkAdd?: (url: string) => Promise<void>
  img: StaticImageData | string
}

export interface DialogState {
  isOpen: boolean
  loading: boolean
  error?: string
}

export interface CreatePostState {
  /** Tipo do post */
  postType: PostType
  /** Título do post */
  title: string
  /** Conteúdo atual do editor */
  content: string
  /** Tags do post */
  tags: string[]
  /** Tag atual sendo digitada */
  currentTag: string
  /** Referências do post */
  references: Reference[]
  /** Referência atual sendo digitada */
  currentReference: string
  /** Tipo da referência atual */
  referenceType: ReferenceType
  /** Se está enviando o post */
  isSubmitting: boolean
  /** Se está fazendo upload de mídia */
  isUploadingMedia: boolean
  /** Se está fazendo upload de arquivo */
  isUploadingFile: boolean
  /** Se o modal de link está aberto */
  showLinkModal: boolean
  /** URL do link sendo adicionado */
  linkUrl: string
}

export interface CreatePostDialogState {
  isOpen: boolean
  isSubmitting: boolean
} 