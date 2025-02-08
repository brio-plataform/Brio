export type InstitutionType = 'university' | 'research' | 'company' | 'ngo'

export interface InstitutionStats {
  professors: number
  publications: number
  students: number
  ranking?: string
}

export interface Institution {
  id: string
  name: string
  username: string
  avatar?: string
  type: InstitutionType
  verified?: boolean
  description?: string
  location?: string
  stats: InstitutionStats
  researchAreas?: string[]
  achievements?: string[]
}

export interface InstitutionProfileProps {
  institution: Institution
  onFollow: () => void
  onJoin: () => void
  className?: string
} 