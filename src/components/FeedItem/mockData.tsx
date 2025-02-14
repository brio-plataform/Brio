import { FeedItemProps } from './types'
import placeholder from "../../../public/images/placeholder.svg"

export const MOCK_FEED_ITEMS: FeedItemProps[] = [
  {
    author: {
      id: "ana-silva",
      name: "Dra. Ana Silva",
      avatar: placeholder,
      institution: {
        name: "Universidade de São Paulo",
        link: "/institution/usp"
      },
    },
    title: "O Impacto da IA na Educação Brasileira",
    content: {
      summary: "Este estudo explora como a inteligência artificial está transformando os paradigmas e metodologias educacionais no Brasil do século XXI.\n\nDescobriu-se que sistemas de aprendizado adaptativo baseados em IA podem melhorar significativamente o desempenho dos alunos através da personalização da experiência de aprendizagem.",
    },
    tags: ["IA", "Educação", "Tecnologia", "Aprendizado de Máquina"],
    likes: 1250,
    comments: [
      {
        id: "1",
        author: {
          name: "Dr. João Santos",
          avatar: "/avatars/joao-santos.jpg",
          institution: "UFRGS"
        },
        content: "Pesquisa fascinante! Vocês consideraram as implicações para educação especial?",
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
        title: "Aprendizado de Máquina na Educação: Uma Revisão",
        author: "Dra. Sara Almeida",
        source: "Revista Brasileira de Tecnologia Educacional",
        url: "/articles/machine-learning-education",
        content: "Aprendizado de Máquina na Educação: Uma Revisão",
        link: "/articles/machine-learning-education"
      }
    ],
    links: [
      {
        url: "https://example.com/ia-educacao-artigo",
        title: "Artigo Completo: IA na Educação",
        description: "Leia o artigo completo sobre o impacto da IA na educação moderna.",
        image: placeholder
      }
    ],
    timestamp: new Date("2024-03-15T08:30:00")
  },
  {
    author: {
      id: "roberto-oliveira",
      name: "Prof. Roberto Oliveira",
      avatar: placeholder,
      institution: {
        name: "UNICAMP",
        link: "/institution/unicamp"
      }
    },
    title: "Avanços em Computação Quântica em 2024",
    content: {
      summary: "Avanços recentes em computação quântica abriram novas possibilidades para resolver problemas computacionais complexos.\n\nNossa equipe demonstrou com sucesso uma nova abordagem para correção de erros quânticos.",
    },
    tags: ["Computação Quântica", "Física", "Ciência da Computação"],
    likes: 2340,
    comments: [
      {
        id: "1",
        author: {
          name: "Dra. Maria Fernandes",
          avatar: "/avatars/maria-fernandes.jpg",
          institution: "Instituto Nacional de Pesquisas Espaciais"
        },
        content: "Isso pode revolucionar nossa abordagem à criptografia!",
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
        title: "Correção de Erros Quânticos: Estado da Arte",
        author: "Dra. Lucia Mendes",
        source: "Revista Brasileira de Computação Quântica",
        url: "/articles/correcao-erros-quanticos",
        content: "Correção de Erros Quânticos: Estado da Arte",
        link: "/articles/correcao-erros-quanticos"
      }
    ],
    links: [
      {
        url: "https://example.com/artigo-quantico",
        title: "Artigo Completo: Avanços em Computação Quântica",
        description: "Acesse a pesquisa completa sobre os avanços em computação quântica.",
        image: placeholder
      }
    ],
    timestamp: new Date("2024-03-14T09:45:00")
  }
] 