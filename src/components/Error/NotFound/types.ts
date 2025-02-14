import { ReactNode } from "react"

export interface ErrorPageProps {
  /** Título do erro */
  title?: string
  /** Mensagem explicativa do erro */
  message?: string
  /** Erro técnico para exibir */
  error?: Error | string
  /** Se deve mostrar o botão de recarregar */
  showReload?: boolean
  /** Se deve mostrar o botão de voltar para home */
  showHome?: boolean
  /** Ações customizadas adicionais */
  customActions?: ReactNode
  /** Link para onde o botão home deve redirecionar */
  homeLink?: string
  /** Texto do botão de recarregar */
  reloadButtonText?: string
  /** Texto do botão de home */
  homeButtonText?: string
  /** Texto do footer */
  footerText?: string
  /** Classes CSS adicionais para o container */
  className?: string
  /** Se deve mostrar o ícone de erro */
  showIcon?: boolean
  /** Cor do ícone (default: text-red-400) */
  iconColor?: string
  /** Tamanho do ícone (default: w-16 h-16) */
  iconSize?: string
}

export interface ErrorPageState {
  /** Se está tentando recarregar */
  isReloading: boolean
  /** Número de tentativas de reload */
  retryCount: number
  /** Último erro ocorrido */
  lastError?: Error | string
}

export interface UnauthorizedPageProps extends ErrorPageProps {
  /** Texto do botão de login */
  loginButtonText?: string
  /** Link para página de login */
  loginLink?: string
  /** Mensagem de suporte */
  supportMessage?: string
}

export type ErrorAction = 
  | 'reload'  // Recarregar a página
  | 'home'    // Voltar para home
  | 'login'   // Ir para login
  | 'back'    // Voltar página
  | 'custom'  // Ação customizada

export interface ErrorActionButton {
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
  action: ErrorAction
} 