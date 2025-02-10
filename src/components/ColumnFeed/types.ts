export interface FeaturedStudy {
  title: string
  institution?: string
  citations?: number
  contributors?: number
  reviews?: number
}

export interface ActiveForum {
  title: string
  participants?: number
  recentContributions?: number
}

export interface AcademicEvent {
  title: string
  startDate?: string
  registrations?: number
  format?: 'online' | 'presential' | 'hybrid'
}

export interface WelcomeCard {
  title: string
  description: string
  buttonText: string
  link: string
}

export interface FeaturedStudiesCard {
  title: string
  description: string
  studies: FeaturedStudy[]
}

export interface ActiveForumsCard {
  title: string
  description: string
  forums: ActiveForum[]
}

export interface AcademicEventsCard {
  title: string
  description: string
  events: AcademicEvent[]
}

export interface ColumnFeedData {
  welcome: WelcomeCard
  featuredStudies: FeaturedStudiesCard
  activeForums: ActiveForumsCard
  academicEvents: AcademicEventsCard
} 