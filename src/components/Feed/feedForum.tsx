import { CreatePost } from "@/components/CreatePost/createPost"
import { FeedItem } from "../FeedItem/feedItem"
import placeholder from "../../../public/images/placeholder.svg"
import { ColumnFeed } from "../ColumnFeed/columnFeed"
import type { FeedItemProps } from "@/types/types"
import { ForumHeader } from "../Header/ForumHeader/forumHeader"

const sampleFeedData: FeedItemProps[] = [
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
      summary:
        "This study explores how artificial intelligence is reshaping educational paradigms and methodologies in the 21st century.\n\nWe found that AI-powered adaptive learning systems can significantly improve student outcomes by personalizing the learning experience.",
      full: "This comprehensive study explores how artificial intelligence is reshaping educational paradigms and methodologies in the 21st century.\n\nWe found that AI-powered adaptive learning systems can significantly improve student outcomes by personalizing the learning experience. Our research indicates that students using AI-enhanced platforms showed a 23% improvement in test scores compared to traditional methods.\n\nHowever, there are also challenges to consider, such as data privacy concerns and the need for extensive teacher training. We surveyed over 500 educators and found that while 78% were excited about AI's potential, 62% felt underprepared to implement it effectively.\n\nFurther research is needed to fully understand the long-term implications of AI in education, particularly in areas such as creativity development and social-emotional learning. We propose a framework for ongoing assessment and ethical implementation of AI in educational settings.\n\nIn conclusion, while AI presents tremendous opportunities for enhancing education, it must be implemented thoughtfully and responsibly to ensure it benefits all learners and supports, rather than replaces, human educators.",
    },
    tags: ["AI", "Education", "Technology"],
    likes: 342,
    comments: [
      {
        id: "1",
        author: {
          name: "Prof. Maria Garcia",
          avatar: placeholder,
          institution: "Stanford University",
        },
        content:
          "Excellent analysis! I particularly appreciate the focus on teacher training needs. Have you considered exploring the impact of AI on student creativity?",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        likes: 15,
        replies: [
          {
            id: "1.1",
            author: {
              name: "Dr. Jane Smith",
              avatar: "/placeholder.svg?height=32&width=32",
              institution: "Harvard University",
            },
            content:
              "Thank you, Prof. Garcia! Yes, we're actually starting a new study focused specifically on AI's impact on creative thinking and problem-solving skills.",
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            likes: 8,
            replies: [],
          },
        ],
      },
      {
        id: "2",
        author: {
          name: "Dr. John Lee",
          avatar: placeholder,
          institution: "MIT",
        },
        content:
          "Great insights on the privacy concerns. Would love to collaborate on developing privacy-preserving AI models for education.",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        likes: 12,
        replies: [],
      },
    ],
    forks: 23,
    citations: 12,
    references: [
      { type: "person" as const, content: "Prof. Alan Turing", link: "/user/alan-turing" },
      { type: "article" as const, content: "Machine Learning in Education", link: "/article/machine-learning-education" },
      { type: "post" as const, content: "AI Ethics in Classrooms", link: "/post/ai-ethics-classrooms" },
      { type: "media" as const, content: "AI in Education Infographic", link: "/media/ai-education-infographic" },
    ],
    links: [
      {
        url: "https://example.com/ai-education-study",
        title: "Complete Research Paper: AI in Modern Education",
        description: "Access the full research paper including methodology, data analysis, and detailed findings.",
        image: placeholder,
      },
    ],
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    author: {
      id: "john-doe",
      name: "Prof. John Doe",
      avatar: placeholder,
      institution: {
        name: "MIT",
        link: "/institution/mit"
      },
    },
    title: "Quantum Computing: A New Era of Information Processing",
    content: {
      summary:
        "This paper provides an in-depth look at the principles of quantum computing and its potential applications in various fields.\n\nWe discuss the fundamental concepts of superposition and entanglement, and how they enable quantum computers to solve certain problems exponentially faster than classical computers.",
      full: "This comprehensive paper provides an in-depth look at the principles of quantum computing and its potential applications in various fields, marking the dawn of a new era in information processing.\n\nWe begin by discussing the fundamental concepts of superposition and entanglement, the cornerstones of quantum mechanics that enable quantum computers to perform certain computations exponentially faster than classical computers. Our analysis shows how these principles allow quantum bits, or qubits, to exist in multiple states simultaneously, dramatically increasing computational power.\n\nThe paper then explores current advancements in quantum hardware, including superconducting circuits, trapped ions, and topological qubits. We provide a comparative analysis of these approaches, discussing their strengths and challenges in scaling up to practical quantum computers.\n\nPotential applications of quantum computing are extensively discussed, with a focus on three key areas:\n\n1. Cryptography: We examine how quantum computers could break current encryption methods and the development of quantum-resistant cryptography.\n\n2. Drug Discovery: Our research indicates that quantum simulations could revolutionize the process of drug design, potentially reducing development time from years to months.\n\n3. Financial Modeling: We explore how quantum algorithms could optimize portfolio management and risk assessment in ways impossible with classical computers.\n\nHowever, we also address the significant challenges in realizing the full potential of quantum computing, including error correction, maintaining qubit coherence, and developing quantum-specific algorithms.\n\nIn conclusion, while quantum computing is still in its early stages, our research suggests it has the potential to transform multiple industries and solve problems previously thought intractable. We propose a roadmap for future research and development, emphasizing the need for collaboration between physicists, computer scientists, and industry partners to fully harness the power of quantum computing.",
    },
    tags: ["Quantum Computing", "Physics", "Computer Science"],
    likes: 528,
    comments: [
      {
        id: "3",
        author: {
          name: "Dr. Sarah Chen",
          avatar: placeholder,
          institution: "Caltech",
        },
        content:
          "Fascinating research! The implications for cryptography are particularly interesting. Have you considered the timeline for achieving quantum supremacy in practical applications?",
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        likes: 45,
        replies: [
          {
            id: "3.1",
            author: {
              name: "Prof. John Doe",
              avatar: placeholder,
              institution: "MIT",
            },
            content:
              "Great question! Based on current progress, we estimate 5-7 years for practical quantum advantage in specific domains like molecular simulation.",
            timestamp: new Date(Date.now() - 39600000), // 11 hours ago
            likes: 28,
            replies: [],
          },
        ],
      },
    ],
    forks: 41,
    citations: 37,
    references: [
      { type: "person" as const, content: "Dr. Richard Feynman", link: "/user/richard-feynman" },
      { type: "article" as const, content: "Quantum Supremacy Achieved", link: "/article/quantum-supremacy" },
      { type: "post" as const, content: "Quantum vs Classical Computing", link: "/post/quantum-vs-classical" },
      { type: "media" as const, content: "Quantum Computing Explained Video", link: "/media/quantum-computing-video" },
    ],
    links: [
      {
        url: "https://example.com/quantum-computing-paper",
        title: "Full Research Paper: Quantum Computing Advances",
        description: "Read the complete research paper on quantum computing and its applications.",
        image: placeholder,
      },
    ],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  },
]

export function FeedForum() {
  return (
    <div className="flex w-full justify-center items-start px-8 py-4 gap-8">
        <div className="flex flex-col w-full justify-center items-center gap-8">
            <ForumHeader name={"Programming Hub"} description={"Programming Hub is a community for programmers to share their knowledge and learn from each other."} image={"/images/placeholder.svg"} memberCount={1000} postCount={100} />
            <CreatePost />
            {sampleFeedData.map((item, index) => (
                    <FeedItem key={index} {...item} />
            ))}
        </div>
        <ColumnFeed />
    </div>
  )
}

