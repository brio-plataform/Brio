import { ReactNode } from 'react'

export interface CommentAuthor {
  name: string
  avatar: string
  institution?: string
}

export interface CommentMetrics {
  likes: number
  replies: number
  isLiked: boolean
  isDesLiked: boolean
}

export interface CommentState {
  isReplying: boolean
  showReplies: boolean
  replyContent: string
}

export interface CommentProps {
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
  children?: ReactNode
} 