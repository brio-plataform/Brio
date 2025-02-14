import { Reference, StudyTab, DebateConfig } from './types'
import placeholder from "../../../public/images/placeholder.svg"

export const MOCK_REFERENCES: Reference[] = [
  {
    id: "1",
    type: "profile",
    content: "@richard.feynman",
    avatar: "/avatars/feynman.jpg",
    username: "Richard Feynman",
    link: "/profile/richard.feynman"
  },
  {
    id: "2",
    type: "document",
    content: "Quantum Mechanics Research Paper",
    fileName: "quantum-mechanics.pdf",
    fileSize: "2.4 MB",
    link: "/documents/quantum-mechanics.pdf"
  },
  {
    id: "3",
    type: "comment",
    content: "Interesting perspective on quantum entanglement",
    author: "Marie Curie",
    preview: "The implications of quantum entanglement on modern physics...",
    link: "/comments/quantum-discussion"
  }
]

export const MOCK_STUDY_TABS: StudyTab = {
  overview: {
    summary: "This research explores the implications of quantum computing on modern cryptography",
    keywords: ["Quantum Computing", "Cryptography", "Information Security"],
    researchArea: "Computer Science"
  },
  methodology: "We employed a mixed-methods approach combining theoretical analysis with practical experiments...",
  results: "Our findings indicate a significant correlation between quantum bit stability and encryption strength...",
  discussion: "The implications of these results suggest a need for new cryptographic protocols..."
}

export const MOCK_DEBATE_CONFIG: DebateConfig = {
  topics: ["Quantum Computing Superiority", "Classical Computing Relevance"],
  activeModeration: true,
  argumentTimeLimit: 300, // 5 minutes in seconds
  duration: {
    start: new Date(),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
  }
} 