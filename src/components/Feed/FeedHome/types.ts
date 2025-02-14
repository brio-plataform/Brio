import { StaticImageData } from "next/image"

export interface FeedAuthorInstitution {
  name: string
  link: string
}

export interface FeedAuthor {
  id: string
  name: string
  avatar: string
  institution?: FeedAuthorInstitution
}

export interface FeedContent {
  summary: string
  full?: string
}

export type ReferenceType = 'person' | 'article' | 'post' | 'media'

export interface Reference {
  type: ReferenceType
  content: string
  link: string
}

export interface LinkPreview {
  url: string
  title: string
  description?: string
  image: string
}

export interface FeedComment {
  id: string
  author: {
    name: string
    avatar: string
    institution?: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: FeedComment[]
}

export interface FeedItemProps {
  author: FeedAuthor
  title: string
  content: FeedContent
  tags: string[]
  likes: number
  comments: FeedComment[]
  forks: number
  citations: number
  references: Reference[]
  links?: LinkPreview[]
  timestamp: Date
} 