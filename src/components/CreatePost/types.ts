import { ReactNode } from 'react'

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

export interface CreatePostProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

export interface DialogState {
  isOpen: boolean
  loading: boolean
  error?: string
}

export interface CreatePostState {
  postType: PostType
  title: string
  content: string
  tags: string[]
  currentTag: string
  references: Reference[]
  currentReference: string
  referenceType: ReferenceType
}

export interface CreatePostDialogState {
  isOpen: boolean
  isSubmitting: boolean
} 