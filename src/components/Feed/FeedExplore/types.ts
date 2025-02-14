import { ReactNode } from 'react'

export interface KnowledgeCategory {
    id: string
    name: string
    icon: string
}

export interface SortOption {
    id: string
    name: string
    icon: ReactNode
}

export interface FeedExploreState {
    selectedCategory: string
    sortBy: string
    searchQuery: string
}
