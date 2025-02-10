import {
  Home,
  Search,
  Folder,
  Building2,
  Users,
  Star,
  Clock,
  Settings,
  HelpCircle,
  User,
  BookOpen,
  Trophy,
  Target,
  MessageSquare,
  GraduationCap,
  Book,
  Globe,
  Calendar,
  List,
  Bookmark,
  Lightbulb,
  Clipboard,
  FileText
} from "lucide-react"
import { MenuItem } from "./types"

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    icon: Home,
    label: "Início",
    href: "/feed"
  },
  {
    icon: Search,
    label: "Explorar",
    href: "/explore"
  },
  {
    icon: Folder,
    label: "Meu Espaço",
    items: [
      { icon: User, label: "Meu Perfil", href: "/user" },
      { icon: Folder, label: "Meus Projetos", href: "/user/projects/new-project" },
      { icon: BookOpen, label: "Meus Estudos", href: "/user/studies" },
      { icon: Trophy, label: "Conquistas", href: "/user/achievements" },
      { icon: Target, label: "Metas", href: "/user/goals" },
    ]
  },
  {
    icon: Building2,
    label: "Acadêmico",
    items: [
      { icon: Building2, label: "Instituições", href: "/institutions" },
      { icon: MessageSquare, label: "Forums", href: "/forum" },
      { icon: GraduationCap, label: "Cursos", href: "/courses" },
      { icon: Book, label: "Biblioteca", href: "/library" },
    ]
  },
  {
    icon: Users,
    label: "Colaboração",
    items: [
      { icon: MessageSquare, label: "Discussões", href: "/discussions" },
      { icon: Users, label: "Colaboradores", href: "/collaborators" },
      { icon: Globe, label: "Eventos", href: "/events" },
    ]
  },
  {
    icon: Star,
    label: "Organização",
    items: [
      { icon: Calendar, label: "Calendário", href: "/calendar" },
      { icon: List, label: "Tarefas", href: "/tasks" },
      { icon: Star, label: "Favoritos", href: "/favorites" },
      { icon: Bookmark, label: "Salvos", href: "/saved" },
      { icon: Lightbulb, label: "Ideias", href: "/ideas" },
      { icon: Clipboard, label: "Relatórios", href: "/reports" },
    ]
  },
  {
    icon: Clock,
    label: "Revisões",
    items: [
      {
        icon: FileText,
        label: "Análise de Dados (65%)",
        href: "/reviews/1",
        metadata: {
          progress: 65,
          timeLeft: "2 dias",
          reviewer: "Maria Silva",
          status: "em andamento"
        }
      },
      {
        icon: FileText,
        label: "Metodologia (90%)",
        href: "/reviews/2",
        metadata: {
          progress: 90,
          timeLeft: "1 dia",
          reviewer: "João Santos",
          status: "revisão final"
        }
      },
      {
        icon: FileText,
        label: "Resultados (30%)",
        href: "/reviews/3",
        metadata: {
          progress: 30,
          timeLeft: "5 dias",
          reviewer: "Ana Costa",
          status: "iniciado"
        }
      }
    ]
  }
]

export const MOCK_BOTTOM_ITEMS: MenuItem[] = [
  { icon: Settings, label: "Configurações", href: "/settings" },
  { icon: HelpCircle, label: "Ajuda", href: "/help" },
] 