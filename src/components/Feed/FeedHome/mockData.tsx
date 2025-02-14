import placeholder from "../../../../public/images/placeholder.svg"
import { FeedItemProps } from "./types"

export const MOCK_FEED_ITEMS: FeedItemProps[] = [
  {
    author: {
      id: "ana-silva",
      name: "Dra. Ana Silva",
      avatar: placeholder.src,
      institution: {
        name: "Universidade de São Paulo",
        link: "/institution/usp"
      },
    },
    title: "O Impacto da IA na Educação Moderna Brasileira",
    content: {
      summary: "Este estudo explora como a inteligência artificial está remodelando os paradigmas e metodologias educacionais no Brasil do século XXI.\n\nDescobrimos que sistemas de aprendizado adaptativo baseados em IA podem melhorar significativamente o desempenho dos alunos através da personalização da experiência de aprendizagem.",
      full: "Este estudo abrangente explora como a inteligência artificial está remodelando os paradigmas e metodologias educacionais no Brasil do século XXI.\n\nDescobrimos que sistemas de aprendizado adaptativo baseados em IA podem melhorar significativamente o desempenho dos alunos através da personalização da experiência de aprendizagem. Nossa pesquisa indica que estudantes usando plataformas aprimoradas por IA mostraram uma melhoria de 23% nas notas em comparação com métodos tradicionais.\n\nNo entanto, existem desafios a considerar, como preocupações com privacidade de dados e a necessidade de capacitação extensiva de professores. Entrevistamos mais de 500 educadores e descobrimos que, embora 78% estivessem entusiasmados com o potencial da IA, 62% se sentiam despreparados para implementá-la efetivamente.\n\nMais pesquisas são necessárias para compreender completamente as implicações de longo prazo da IA na educação, particularmente em áreas como desenvolvimento da criatividade e aprendizagem socioemocional. Propomos um framework para avaliação contínua e implementação ética da IA em ambientes educacionais brasileiros.",
    },
    tags: ["IA", "Educação", "Tecnologia"],
    likes: 342,
    comments: [
      {
        id: "1",
        author: {
          name: "Profa. Maria Santos",
          avatar: placeholder.src,
          institution: "UFRGS",
        },
        content: "Excelente análise! Particularmente apreciei o foco nas necessidades de capacitação dos professores. Vocês consideraram explorar o impacto da IA na criatividade dos alunos?",
        timestamp: new Date(Date.now() - 3600000),
        likes: 15,
        replies: [
          {
            id: "1.1",
            author: {
              name: "Dra. Ana Silva",
              avatar: placeholder.src,
              institution: "USP",
            },
            content: "Obrigada, Profa. Santos! Sim, estamos iniciando um novo estudo focado especificamente no impacto da IA no pensamento criativo e habilidades de resolução de problemas.",
            timestamp: new Date(Date.now() - 1800000),
            likes: 8,
            replies: [],
          },
        ],
      },
    ],
    forks: 23,
    citations: 12,
    references: [
      { type: "person", content: "Prof. Paulo Freire", link: "/user/paulo-freire" },
      { type: "article", content: "Aprendizado de Máquina na Educação", link: "/article/machine-learning-education" },
      { type: "post", content: "Ética da IA nas Salas de Aula", link: "/post/ia-etica-sala-aula" },
      { type: "media", content: "Infográfico: IA na Educação", link: "/media/ia-educacao-infografico" },
    ],
    links: [
      {
        url: "https://example.com/ia-educacao-estudo",
        title: "Artigo Completo: IA na Educação Moderna",
        description: "Acesse o artigo completo incluindo metodologia, análise de dados e resultados detalhados.",
        image: placeholder.src,
      },
    ],
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    author: {
      id: "roberto-santos",
      name: "Dr. Roberto Santos",
      avatar: placeholder.src,
      institution: {
        name: "UNICAMP",
        link: "/institution/unicamp"
      },
    },
    title: "Computação Quântica: Avanços na Física Computacional",
    content: {
      summary: "Um estudo inovador sobre as aplicações da computação quântica na resolução de problemas complexos de física. Demonstramos como algoritmos quânticos podem simular interações de partículas com precisão sem precedentes.",
      full: "Nossa equipe de pesquisa alcançou um avanço significativo nas aplicações de computação quântica para simulações físicas. Usando uma nova abordagem para correção de erros quânticos, simulamos com sucesso interações complexas de partículas com uma precisão que supera os métodos de computação clássica.\n\nAs implicações deste avanço são amplas, potencialmente revolucionando campos desde a descoberta de medicamentos até a modelagem climática. Nossa estrutura de simulação quântica demonstra particular promessa na modelagem de sistemas quânticos que historicamente eram computacionalmente intratáveis.",
    },
    tags: ["Computação Quântica", "Física", "Ciência da Computação", "Pesquisa"],
    likes: 567,
    comments: [
      {
        id: "2",
        author: {
          name: "Dra. Lucia Mendes",
          avatar: placeholder.src,
          institution: "PUC-RS",
        },
        content: "Resultados fascinantes! As implicações para descoberta de medicamentos são particularmente empolgantes. Adoraria colaborar na aplicação disso em simulações de dobramento de proteínas.",
        timestamp: new Date(Date.now() - 7200000),
        likes: 45,
        replies: [
          {
            id: "2.1",
            author: {
              name: "Dr. Roberto Santos",
              avatar: placeholder.src,
              institution: "UNICAMP",
            },
            content: "Com certeza! Vou te enviar uma mensagem para discutirmos possibilidades de colaboração. Sua expertise em estruturas proteicas seria inestimável.",
            timestamp: new Date(Date.now() - 5400000),
            likes: 12,
            replies: [],
          }
        ],
      },
      {
        id: "3",
        author: {
          name: "Prof. Daniel Oliveira",
          avatar: placeholder.src,
          institution: "UFRJ",
        },
        content: "Trabalho excepcional! A técnica de correção de erros que vocês desenvolveram pode ser revolucionária. Já consideraram suas aplicações em criptografia quântica?",
        timestamp: new Date(Date.now() - 10800000),
        likes: 38,
        replies: [],
      }
    ],
    forks: 89,
    citations: 156,
    references: [
      { type: "person", content: "Dra. Yvonne Mascarenhas", link: "/user/yvonne-mascarenhas" },
      { type: "article", content: "Correção de Erros Quânticos: Estado da Arte", link: "/article/correcao-erros-quanticos" },
      { type: "post", content: "Avanços em Computação Quântica 2024", link: "/post/computacao-quantica-2024" },
      { type: "media", content: "Visualização de Simulação Quântica", link: "/media/simulacao-quantica-viz" },
    ],
    links: [
      {
        url: "https://example.com/artigo-fisica-quantica",
        title: "Artigo Completo: Computação Quântica na Física",
        description: "Metodologia detalhada e resultados do nosso avanço em simulações quânticas na física.",
        image: placeholder.src,
      },
      {
        url: "https://example.com/demo-quantica",
        title: "Demo Interativa: Simulação Quântica",
        description: "Experimente nossa demonstração interativa de simulação de partículas quânticas.",
        image: placeholder.src,
      }
    ],
    timestamp: new Date(Date.now() - 172800000),
  }
] 