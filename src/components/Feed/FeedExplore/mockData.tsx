import { TrendingUp, Clock, Star, BookOpen } from "lucide-react"
import React from "react"
import { KnowledgeCategory, SortOption } from "./types"

const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
    { id: 'science', name: 'Ciência', icon: '🔬' },
    { id: 'philosophy', name: 'Filosofia', icon: '🤔' },
    { id: 'technology', name: 'Tecnologia', icon: '💻' },
    { id: 'history', name: 'História', icon: '📚' },
    { id: 'arts', name: 'Artes', icon: '🎨' },
    { id: 'mathematics', name: 'Matemática', icon: '🔢' },
    { id: 'literature', name: 'Literatura', icon: '📖' },
    { id: 'engineering', name: 'Engenharia', icon: '⚙️' }
]

const SORT_OPTIONS: SortOption[] = [
    { id: 'trending', name: 'Em Alta', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'recent', name: 'Recentes', icon: <Clock className="h-4 w-4" /> },
    { id: 'top', name: 'Mais Relevantes', icon: <Star className="h-4 w-4" /> },
    { id: 'comprehensive', name: 'Mais Completos', icon: <BookOpen className="h-4 w-4" /> }
]

export { KNOWLEDGE_CATEGORIES, SORT_OPTIONS } 