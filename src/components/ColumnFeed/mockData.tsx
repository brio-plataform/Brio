import { ColumnFeedData } from "./types"

export const MOCK_COLUMN_FEED: ColumnFeedData = {
  welcome: {
    title: "Bem-vindo ao Brio",
    description: "A nova Ágora Digital para o Conhecimento Colaborativo",
    buttonText: "Comece a Explorar",
    link: "/explore"
  },
  featuredStudies: {
    title: "Estudos em Destaque",
    description: "Trabalhos mais relevantes da comunidade",
    studies: [
      {
        title: "Impacto da IA na Educação Superior",
        institution: "USP",
        citations: 328
      },
      {
        title: "Sustentabilidade em Centros Urbanos",
        institution: "Projeto Colaborativo",
        contributors: 156
      },
      {
        title: "Filosofia da Ciência Moderna",
        institution: "Estudo Coletivo",
        reviews: 89
      }
    ]
  },
  activeForums: {
    title: "Fóruns Ativos",
    description: "Debates em andamento",
    forums: [
      {
        title: "Física Quântica: Interpretação de Copenhagen",
        participants: 42
      },
      {
        title: "Literatura Brasileira Contemporânea",
        recentContributions: 18
      }
    ]
  },
  academicEvents: {
    title: "Eventos Acadêmicos",
    description: "Próximas atividades",
    events: [
      {
        title: "Hackathon: Soluções para Educação",
        startDate: "3 dias",
        registrations: 234
      },
      {
        title: "Workshop: Metodologia Científica",
        startDate: "Uma semana",
        registrations: 100,
        format: "online"
      }
    ]
  }
} 