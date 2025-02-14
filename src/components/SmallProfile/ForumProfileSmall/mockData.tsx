import { Forum } from './types'

export const MOCK_FORUM: Forum = {
  id: "1",
  name: "Física Quântica",
  slug: "fisica-quantica",
  type: "official",
  verified: true,
  category: "Ciência",
  description: "Comunidade dedicada ao estudo e discussão de física quântica, mecânica quântica e suas aplicações no mundo moderno.",
  stats: {
    members: 15420,
    posts: 3200,
    onlineNow: 142,
    dailyActivity: 78,
    weeklyGrowth: 12
  },
  badges: [
    {
      type: "verified",
      label: "Verificado",
      tooltip: "Fórum verificado pela equipe Brio"
    },
    {
      type: "trending",
      label: "Em Alta",
      tooltip: "Um dos fóruns mais ativos esta semana"
    }
  ],
  moderators: [
    {
      id: "mod1",
      name: "Dr. Richard Feynman",
      avatar: "/avatars/feynman.jpg"
    },
    {
      id: "mod2",
      name: "Dra. Marie Curie",
      avatar: "/avatars/curie.jpg"
    }
  ],
  nextEvents: [
    {
      title: "Introdução à Computação Quântica",
      date: "2024-04-15",
      participants: 230
    },
    {
      title: "Workshop: Emaranhamento Quântico",
      date: "2024-04-20",
      participants: 150
    }
  ],
  topContributors: [
    {
      id: "contrib1",
      name: "Albert Einstein",
      avatar: "/avatars/einstein.jpg",
      contributions: 156
    },
    {
      id: "contrib2",
      name: "Niels Bohr",
      avatar: "/avatars/bohr.jpg",
      contributions: 132
    }
  ],
  isJoined: false,
  isModerator: false
} 