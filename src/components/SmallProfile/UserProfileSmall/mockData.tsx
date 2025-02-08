import { User } from './types'

export const MOCK_USER: User = {
  id: "1",
  name: "Dr. Richard Feynman",
  username: "feynman",
  avatar: "/avatars/feynman.jpg",
  verified: true,
  role: "Professor de Física Teórica",
  institution: {
    name: "California Institute of Technology",
    location: "Pasadena, CA"
  },
  bio: "Físico teórico, ganhador do Prêmio Nobel e educador apaixonado. Pesquisador em mecânica quântica, computação quântica e nanotecnologia.",
  badges: [
    {
      type: "top-contributor",
      label: "Top Contributor",
      tooltip: "Entre os maiores contribuidores da plataforma"
    },
    {
      type: "expert",
      label: "Expert",
      tooltip: "Especialista verificado em Física Teórica"
    },
    {
      type: "mentor",
      label: "Mentor",
      tooltip: "Mentor ativo na comunidade"
    }
  ],
  stats: {
    publications: 156,
    citations: 1420,
    followers: 25000
  },
  isFollowing: false
} 