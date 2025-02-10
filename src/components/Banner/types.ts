import { LucideIcon } from "lucide-react"

export type BannerType = 
  | "event" 
  | "promotion" 
  | "award" 
  | "course" 
  | "study" 
  | "forum" 
  | "library" 
  | "partnership"

export interface Banner {
  id: number
  title: string
  description: string
  type: BannerType
  link: string
  bgColor: string
  textColor: string
  buttonText: string
  date?: string
  institution?: string
  icon?: LucideIcon
}

export interface BannerCarouselState {
  currentBanner: number
  isAutoPlaying: boolean
}

export interface BannerCarouselProps {
  autoPlayInterval?: number
  defaultAutoPlay?: boolean
} 