import { CommentProps } from './types'
import { Comment } from './comment'
import placeholder from "../../../public/images/placeholder.svg"

// Definindo os comentários sem children primeiro
const replyComment: Omit<CommentProps, 'children'> = {
  id: "1.1",
  author: {
    name: "Dr. Richard Feynman",
    avatar: "/avatars/feynman.jpg",
    institution: "Caltech"
  },
  content: "Excellent point about cryptography. The quantum resistance of current encryption methods is definitely a concern we should address.",
  timestamp: new Date("2024-03-15T11:15:00"),
  likes: 28,
  replies: 1,
  level: 1,
  onReply: () => {}
}

export const MOCK_COMMENTS: CommentProps[] = [
  {
    id: "1",
    author: {
      name: "Dr. Marie Curie",
      avatar: "/avatars/marie-curie.jpg",
      institution: "University of Paris"
    },
    content: "Fascinating research! The implications for quantum computing are remarkable. Have you considered the potential applications in cryptography?",
    timestamp: new Date("2024-03-15T10:30:00"),
    likes: 42,
    replies: 3,
    level: 0,
    onReply: () => {},
    children: <Comment {...replyComment} />
  },
  {
    id: "2",
    author: {
      name: "Dr. Neil deGrasse Tyson",
      avatar: "/avatars/tyson.jpg",
      institution: "Hayden Planetarium"
    },
    content: "This reminds me of some recent developments in quantum entanglement. Would love to collaborate on extending this research.",
    timestamp: new Date("2024-03-15T12:45:00"),
    likes: 35,
    replies: 0,
    level: 0,
    onReply: () => {}
  }
] 