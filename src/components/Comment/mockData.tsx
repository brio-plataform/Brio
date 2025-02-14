import { CommentProps } from './types'
import { Comment } from './comment'
import placeholder from "../../../public/images/placeholder.svg"

// Definindo os comentários sem children primeiro
const replyComment: Omit<CommentProps, 'children'> = {
  id: "1.1",
  author: {
    name: "Dr. César Lattes",
    avatar: "/avatars/lattes.jpg",
    institution: "UNICAMP"
  },
  content: "Excelente observação sobre criptografia. A resistência quântica dos métodos atuais de criptografia é definitivamente uma preocupação que devemos abordar.",
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
      name: "Dra. Johanna Döbereiner",
      avatar: "/avatars/johanna.jpg",
      institution: "EMBRAPA"
    },
    content: "Pesquisa fascinante! As implicações para computação quântica são notáveis. Vocês consideraram as potenciais aplicações em criptografia?",
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
      name: "Dr. Marcelo Gleiser",
      avatar: "/avatars/gleiser.jpg",
      institution: "UFRN"
    },
    content: "Isso me lembra alguns desenvolvimentos recentes em emaranhamento quântico. Adoraria colaborar na extensão desta pesquisa.",
    timestamp: new Date("2024-03-15T12:45:00"),
    likes: 35,
    replies: 0,
    level: 0,
    onReply: () => {}
  }
] 