import { FeedItemProps } from './types'
import placeholder from "../../../public/images/placeholder.svg"

export const MOCK_FEED_ITEMS: FeedItemProps[] = [
  {
    author: {
      id: "jane-smith",
      name: "Dr. Jane Smith",
      avatar: placeholder,
      institution: {
        name: "Harvard University",
        link: "/institution/harvard-university"
      },
    },
    title: "The Impact of AI on Modern Education",
    content: {
      summary: "This study explores how artificial intelligence is reshaping educational paradigms and methodologies in the 21st century.\n\nWe found that AI-powered adaptive learning systems can significantly improve student outcomes by personalizing the learning experience.",
    },
    tags: ["AI", "Education", "Technology", "Machine Learning"],
    likes: 1250,
    comments: [
      {
        id: "1",
        author: {
          name: "Dr. John Doe",
          avatar: "/avatars/john-doe.jpg",
          institution: "MIT"
        },
        content: "Fascinating research! Have you considered the implications for special education?",
        timestamp: new Date("2024-03-10T10:00:00"),
        likes: 45,
        replies: []
      }
    ],
    forks: 89,
    citations: 156,
    references: [
      {
        type: "article",
        title: "Machine Learning in Education: A Review",
        author: "Dr. Sarah Johnson",
        source: "Education Technology Journal",
        url: "/articles/machine-learning-education",
        content: "Machine Learning in Education: A Review",
        link: "/articles/machine-learning-education"
      }
    ],
    links: [
      {
        url: "https://example.com/ai-education-paper",
        title: "Full Research Paper: AI in Education",
        description: "Read the complete research paper on AI's impact on modern education.",
        image: placeholder
      }
    ],
    timestamp: new Date("2024-03-15T08:30:00")
  },
  {
    author: {
      id: "robert-chen",
      name: "Prof. Robert Chen",
      avatar: placeholder,
      institution: {
        name: "Stanford University",
        link: "/institution/stanford"
      }
    },
    title: "Quantum Computing Breakthroughs in 2024",
    content: {
      summary: "Recent advances in quantum computing have opened new possibilities for solving complex computational problems.\n\nOur team has successfully demonstrated a novel approach to quantum error correction.",
    },
    tags: ["Quantum Computing", "Physics", "Computer Science"],
    likes: 2340,
    comments: [
      {
        id: "1",
        author: {
          name: "Dr. Maria Garcia",
          avatar: "/avatars/maria-garcia.jpg",
          institution: "IBM Research"
        },
        content: "This could revolutionize our approach to cryptography!",
        timestamp: new Date("2024-03-14T15:20:00"),
        likes: 89,
        replies: []
      }
    ],
    forks: 167,
    citations: 234,
    references: [
      {
        type: "article",
        title: "Quantum Error Correction: State of the Art",
        author: "Dr. Lisa Wong",
        source: "Quantum Computing Review",
        url: "/articles/quantum-error-correction",
        content: "Quantum Error Correction: State of the Art",
        link: "/articles/quantum-error-correction"
      }
    ],
    links: [
      {
        url: "https://example.com/quantum-paper",
        title: "Full Research Paper: Quantum Computing Advances",
        description: "Access the complete research on quantum computing breakthroughs.",
        image: placeholder
      }
    ],
    timestamp: new Date("2024-03-14T09:45:00")
  }
] 