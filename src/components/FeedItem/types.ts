import { ReactNode } from 'react'

export interface Author {
  id: string
  name: string
  avatar: string
  institution?: {
    name: string
    link: string
  }
}

export interface LinkPreviewType {
  url: string
  title: string
  description?: string
  image?: string
}

export interface Citation {
  type: 'person' | 'article' | 'post' | 'media'
  content: string
  link: string
  title?: string
  author?: string
  source?: string
  url?: string
}

export interface CommentAuthor {
  name: string
  avatar: string
  institution?: string
}

export interface CommentType {
  id: string
  author: CommentAuthor
  content: string
  timestamp: Date
  likes: number
  replies?: CommentType[]
}

export interface FeedContent {
  summary: string
  fullText?: string
}

export interface FeedItemProps {
  author: Author
  title: string
  content: FeedContent
  tags: string[]
  likes: number
  comments: CommentType[]
  forks: number
  citations: number
  references: Citation[]
  links?: LinkPreviewType[]
  timestamp: Date
} 