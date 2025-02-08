export interface ForumBadge {
  type: 'trending' | 'verified' | 'academic'
  label: string
  tooltip: string
}

export interface ForumModerator {
  id: string
  name: string
  avatar?: string
}

export interface ForumEvent {
  title: string
  date: string
  participants: number
}

export interface ForumContributor {
  id: string
  name: string
  avatar?: string
  contributions: number
}

export interface ForumStats {
  members: number
  posts: number
  onlineNow: number
  dailyActivity: number
  weeklyGrowth: number
}

export interface Forum {
  id: string
  name: string
  slug: string
  avatar?: string
  banner?: string
  type: 'official' | 'community'
  verified?: boolean
  category: string
  description?: string
  moderators?: ForumModerator[]
  badges?: ForumBadge[]
  stats: ForumStats
  nextEvents?: ForumEvent[]
  topContributors?: ForumContributor[]
  isJoined: boolean
  isModerator?: boolean
}

export interface ForumProfileProps {
  forum: Forum
  onJoin: () => void
  onModerate?: () => void
  className?: string
} 