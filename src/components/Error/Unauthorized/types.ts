import { ReactNode } from "react"

export interface UnauthorizedPageProps {
  /** Título da página de não autorizado */
  title?: string
  /** Mensagem explicativa */
  message?: string
  /** Se deve mostrar o botão de login */
  showLogin?: boolean
  /** Se deve mostrar o botão de home */
  showHome?: boolean
  /** Ações customizadas adicionais */
  customActions?: ReactNode
  /** Mensagem de suporte */
  supportMessage?: string
  /** Link para página de login */
  loginLink?: string
  /** Link para página inicial */
  homeLink?: string
  /** Texto do botão de login */
  loginButtonText?: string
  /** Texto do botão de home */
  homeButtonText?: string
  /** Classes CSS adicionais para o container */
  className?: string
  /** Se deve mostrar o ícone */
  showIcon?: boolean
  /** Cor do ícone (default: text-gray-400) */
  iconColor?: string
  /** Tamanho do ícone (default: w-16 h-16) */
  iconSize?: string
}

export interface UnauthorizedPageState {
  /** Se está redirecionando para login */
  isRedirecting: boolean
  /** Página anterior para retorno após login */
  previousPage?: string
}

export type UnauthorizedAction = 
  | 'login'    // Ir para login
  | 'home'     // Voltar para home
  | 'back'     // Voltar página
  | 'custom'   // Ação customizada

export interface UnauthorizedActionButton {
  /** Ícone do botão */
  icon: React.ElementType
  /** Texto do botão */
  label: string
  /** Link para navegação (opcional) */
  href?: string
  /** Função de clique (opcional) */
  onClick?: () => void
  /** Variante do botão */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  /** Tipo da ação */
  action: UnauthorizedAction
} 