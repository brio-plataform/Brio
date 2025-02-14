export interface ForumHeaderProps {
  name: string
  description: string
  image: string
  banner?: string
  memberCount: number
  postCount: number
  isVerified?: boolean
  departments?: string[]
  researchCenters?: string[]
  resources?: string[]
} 