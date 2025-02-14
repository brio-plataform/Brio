import { Institution } from './types'

export const MOCK_INSTITUTION: Institution = {
  id: "1",
  name: "Universidade de São Paulo",
  username: "usp",
  avatar: "/institutions/usp.jpg",
  type: "university",
  verified: true,
  description: "A Universidade de São Paulo é a maior universidade pública do Brasil. Fundada em 1934, é a instituição brasileira mais bem ranqueada e líder em produção científica na América Latina.",
  location: "São Paulo, SP",
  stats: {
    professors: 6000,
    publications: 75000,
    students: 90000,
    ranking: "#1"
  },
  researchAreas: [
    "Ciência da Computação",
    "Medicina",
    "Direito",
    "Administração",
    "Engenharia",
    "Física",
    "Química"
  ],
  achievements: [
    "Melhor Universidade da América Latina",
    "Maior Produção Científica do Brasil",
    "Maior Impacto em Pesquisa na América do Sul",
    "Líder em Patentes Registradas"
  ]
} 