export type BadgeType = 'top-contributor' | 'expert' | 'mentor'

export interface UserBadge {
  type: BadgeType
  label: string
  tooltip: string
}

export interface UserInstitution {
  name: string
  location?: string
}

export interface UserStats {
  publications: number
  citations: number
  followers: number
}

export interface User {
  id: string
  name: string
  username: string
  avatar?: string
  verified?: boolean
  role?: string
  institution?: UserInstitution
  bio?: string
  badges?: UserBadge[]
  stats: UserStats
  isFollowing: boolean
}

export interface UserProfileProps {
  user: User
  onFollow: () => void
  onMessage: () => void
  className?: string
} 