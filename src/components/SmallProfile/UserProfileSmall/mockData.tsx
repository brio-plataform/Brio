import { User } from './types'

export const MOCK_USER: User = {
  id: "1",
  name: "Dr. César Lattes",
  username: "lattes",
  avatar: "/avatars/lattes.jpg",
  verified: true,
  role: "Professor de Física Teórica",
  institution: {
    name: "Universidade Estadual de Campinas",
    location: "Campinas, SP"
  },
  bio: "Físico teórico, pioneiro na física de partículas no Brasil. Pesquisador em raios cósmicos e méson pi. Fundador do Centro Brasileiro de Pesquisas Físicas (CBPF).",
  badges: [
    {
      type: "top-contributor",
      label: "Contribuidor Elite",
      tooltip: "Entre os maiores contribuidores da plataforma"
    },
    {
      type: "expert",
      label: "Especialista",
      tooltip: "Especialista verificado em Física de Partículas"
    },
    {
      type: "mentor",
      label: "Mentor",
      tooltip: "Mentor ativo na comunidade científica brasileira"
    }
  ],
  stats: {
    publications: 156,
    citations: 1420,
    followers: 25000
  },
  isFollowing: false
} 