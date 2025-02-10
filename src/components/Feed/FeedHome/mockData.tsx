import placeholder from "../../../../public/images/placeholder.svg"
import { FeedItemProps } from "./types"

export const MOCK_FEED_ITEMS: FeedItemProps[] = [
  {
    author: {
      id: "jane-smith",
      name: "Dr. Jane Smith",
      avatar: placeholder.src,
      institution: {
        name: "Harvard University",
        link: "/institution/harvard-university"
      },
    },
    title: "The Impact of AI on Modern Education",
    content: {
      summary: "This study explores how artificial intelligence is reshaping educational paradigms and methodologies in the 21st century.\n\nWe found that AI-powered adaptive learning systems can significantly improve student outcomes by personalizing the learning experience.",
      full: "This comprehensive study explores how artificial intelligence is reshaping educational paradigms and methodologies in the 21st century.\n\nWe found that AI-powered adaptive learning systems can significantly improve student outcomes by personalizing the learning experience. Our research indicates that students using AI-enhanced platforms showed a 23% improvement in test scores compared to traditional methods.\n\nHowever, there are also challenges to consider, such as data privacy concerns and the need for extensive teacher training. We surveyed over 500 educators and found that while 78% were excited about AI's potential, 62% felt underprepared to implement it effectively.\n\nFurther research is needed to fully understand the long-term implications of AI in education, particularly in areas such as creativity development and social-emotional learning. We propose a framework for ongoing assessment and ethical implementation of AI in educational settings.\n\nIn conclusion, while AI presents tremendous opportunities for enhancing education, it must be implemented thoughtfully and responsibly to ensure it benefits all learners and supports, rather than replaces, human educators.",
    },
    tags: ["AI", "Education", "Technology"],
    likes: 342,
    comments: [
      {
        id: "1",
        author: {
          name: "Prof. Maria Garcia",
          avatar: placeholder.src,
          institution: "Stanford University",
        },
        content: "Excellent analysis! I particularly appreciate the focus on teacher training needs. Have you considered exploring the impact of AI on student creativity?",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        likes: 15,
        replies: [
          {
            id: "1.1",
            author: {
              name: "Dr. Jane Smith",
              avatar: placeholder.src,
              institution: "Harvard University",
            },
            content: "Thank you, Prof. Garcia! Yes, we're actually starting a new study focused specifically on AI's impact on creative thinking and problem-solving skills.",
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            likes: 8,
            replies: [],
          },
        ],
      },
      // ... outros comentários
    ],
    forks: 23,
    citations: 12,
    references: [
      { type: "person", content: "Prof. Alan Turing", link: "/user/alan-turing" },
      { type: "article", content: "Machine Learning in Education", link: "/article/machine-learning-education" },
      { type: "post", content: "AI Ethics in Classrooms", link: "/post/ai-ethics-classrooms" },
      { type: "media", content: "AI in Education Infographic", link: "/media/ai-education-infographic" },
    ],
    links: [
      {
        url: "https://example.com/ai-education-study",
        title: "Complete Research Paper: AI in Modern Education",
        description: "Access the full research paper including methodology, data analysis, and detailed findings.",
        image: placeholder.src,
      },
    ],
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    author: {
      id: "richard-feynman",
      name: "Dr. Richard Feynman",
      avatar: placeholder.src,
      institution: {
        name: "Caltech",
        link: "/institution/caltech"
      },
    },
    title: "Quantum Computing: Breaking New Ground in Computational Physics",
    content: {
      summary: "A groundbreaking study on the applications of quantum computing in solving complex physics problems. We demonstrate how quantum algorithms can simulate particle interactions with unprecedented accuracy.",
      full: "Our research team has achieved a significant breakthrough in quantum computing applications for physics simulations. Using a novel approach to quantum error correction, we've successfully simulated complex particle interactions with an accuracy that surpasses classical computing methods by several orders of magnitude.\n\nThe implications of this advancement are far-reaching, potentially revolutionizing fields from drug discovery to climate modeling. Our quantum simulation framework demonstrates particular promise in modeling quantum mechanical systems that have historically been computationally intractable.\n\nKey findings include:\n- 100x improvement in simulation accuracy\n- 50x reduction in computational resources required\n- New quantum error correction techniques\n- Scalable architecture for future quantum computers",
    },
    tags: ["Quantum Computing", "Physics", "Computer Science", "Research"],
    likes: 567,
    comments: [
      {
        id: "2",
        author: {
          name: "Dr. Lisa Chen",
          avatar: placeholder.src,
          institution: "MIT",
        },
        content: "Fascinating results! The implications for drug discovery are particularly exciting. Would love to collaborate on applying this to protein folding simulations.",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        likes: 45,
        replies: [
          {
            id: "2.1",
            author: {
              name: "Dr. Richard Feynman",
              avatar: placeholder.src,
              institution: "Caltech",
            },
            content: "Absolutely! I'll send you a DM to discuss potential collaboration opportunities. Your expertise in protein structures would be invaluable.",
            timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
            likes: 12,
            replies: [],
          }
        ],
      },
      {
        id: "3",
        author: {
          name: "Prof. David Wilson",
          avatar: placeholder.src,
          institution: "Oxford University",
        },
        content: "Outstanding work! The error correction technique you've developed could be revolutionary. Have you considered its applications in quantum cryptography?",
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        likes: 38,
        replies: [],
      }
    ],
    forks: 89,
    citations: 156,
    references: [
      { type: "person", content: "Dr. Peter Shor", link: "/user/peter-shor" },
      { type: "article", content: "Quantum Error Correction: State of the Art", link: "/article/quantum-error-correction" },
      { type: "post", content: "Quantum Computing Breakthroughs 2024", link: "/post/quantum-computing-2024" },
      { type: "media", content: "Quantum Simulation Visualization", link: "/media/quantum-sim-viz" },
    ],
    links: [
      {
        url: "https://example.com/quantum-physics-paper",
        title: "Full Research Paper: Quantum Computing in Physics",
        description: "Detailed methodology and results of our quantum computing breakthrough in physics simulations.",
        image: placeholder.src,
      },
      {
        url: "https://example.com/quantum-demo",
        title: "Interactive Demo: Quantum Simulation",
        description: "Try our interactive demonstration of quantum particle simulation.",
        image: placeholder.src,
      }
    ],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  }
] 