import { ReactNode } from "react"

export type MessageType = 'user' | 'ai' | 'system'
export type MessageStatus = 'sending' | 'sent' | 'error'

export interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  status?: MessageStatus
  references?: {
    title: string
    link: string
  }[]
  suggestions?: string[]
}

export interface AIAssistantState {
  /** Se a sidebar está colapsada */
  isCollapsed: boolean
  /** Se o assistente está digitando */
  isTyping: boolean
  /** Lista de mensagens */
  messages: Message[]
  /** Mensagem atual sendo digitada */
  currentMessage: string
  /** Contexto atual (ex: nome do projeto) */
  context?: string
  /** Seções abertas no momento */
  openSections: string[]
}

export interface AIAssistantProps {
  /** Se a sidebar começa colapsada */
  defaultCollapsed?: boolean
  /** Contexto atual do projeto/página */
  context?: string
  /** Função chamada quando o usuário envia uma mensagem */
  onSendMessage?: (message: string) => Promise<void>
  /** Função chamada quando o usuário clica em uma sugestão */
  onSuggestionClick?: (suggestion: string) => void
  /** Classes CSS adicionais */
  className?: string
} 