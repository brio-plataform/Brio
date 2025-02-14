import { Message } from "./types"

export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    type: "system",
    content: "Olá! Sou o assistente do Brio. Como posso ajudar com seu projeto hoje?",
    timestamp: new Date(),
    suggestions: [
      "Como estruturar minha metodologia?",
      "Sugerir referências bibliográficas",
      "Revisar meu texto"
    ]
  },
  {
    id: "2",
    type: "user",
    content: "Pode me ajudar a encontrar referências sobre metodologia científica?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: "3",
    type: "ai",
    content: "Claro! Aqui estão algumas referências relevantes sobre metodologia científica:",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    references: [
      {
        title: "Metodologia do Trabalho Científico - Eva Maria Lakatos",
        link: "/library/metodologia-lakatos"
      },
      {
        title: "Como Elaborar Projetos de Pesquisa - Gil",
        link: "/library/projetos-gil"
      }
    ],
    suggestions: [
      "Ver mais referências",
      "Comparar metodologias",
      "Estruturar minha metodologia"
    ]
  }
]

export const MOCK_SUGGESTED_PROMPTS = [
  "Como posso melhorar minha introdução?",
  "Sugerir estrutura para discussão",
  "Revisar gramática e coesão",
  "Encontrar pesquisas similares",
  "Gerar citações no formato ABNT"
] 