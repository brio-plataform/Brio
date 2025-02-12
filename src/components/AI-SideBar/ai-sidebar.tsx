"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Book,
  Wand2,
  Send,
  ChevronDown,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AIAssistantProps, AIAssistantState } from './types'
import { MOCK_MESSAGES } from './mockData'

export function AISideBar({
  defaultCollapsed = false,
  context,
  onSendMessage,
  onSuggestionClick,
  className
}: AIAssistantProps) {
  const [state, setState] = useState<AIAssistantState>({
    isCollapsed: defaultCollapsed,
    isTyping: false,
    messages: MOCK_MESSAGES,
    currentMessage: "",
    openSections: ['chat'],
    context
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.messages])

  const toggleSidebar = () => {
    setState(prev => ({ 
      ...prev, 
      isCollapsed: !prev.isCollapsed,
      openSections: prev.isCollapsed ? [] : prev.openSections 
    }))
  }

  const toggleSection = (section: string) => {
    if (state.isCollapsed) {
      setState(prev => ({ 
        ...prev, 
        isCollapsed: false, 
        openSections: [section] 
      }))
    } else {
      setState(prev => ({
        ...prev,
        openSections: prev.openSections.includes(section)
          ? prev.openSections.filter(item => item !== section)
          : [...prev.openSections, section]
      }))
    }
  }

  const handleSendMessage = async () => {
    if (!state.currentMessage.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: state.currentMessage,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      currentMessage: "",
      isTyping: true
    }))

    try {
      await onSendMessage?.(state.currentMessage)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    } finally {
      setState(prev => ({ ...prev, isTyping: false }))
    }
  }

  const renderButton = (Icon: React.ElementType, label: string, section: string) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-between",
        state.isCollapsed && "w-10 h-10 p-0",
      )}
    >
      <div className={cn(
        "flex items-center",
        state.isCollapsed && "w-full justify-center"
      )}>
        <Icon className="h-4 w-4" />
        {!state.isCollapsed && <span className="ml-2">{label}</span>}
      </div>
      {!state.isCollapsed && (
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            state.openSections.includes(section) && "transform rotate-180"
          )}
        />
      )}
    </Button>
  )

  return (
    <div className={cn(
      "border-l bg-muted transition-all duration-300 ease-in-out h-full flex flex-col",
      state.isCollapsed ? "w-16" : "w-[285px]",
      className
    )}>
      <div className={cn(
        "px-3 py-2 bg-muted border-b",
        state.isCollapsed ? "w-16" : "w-full",
      )}>
        <div className="flex items-center justify-start gap-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={cn(state.isCollapsed ? "mx-auto" : "")}
                >
                  {state.isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{state.isCollapsed ? "Expandir" : "Recolher"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {!state.isCollapsed && (
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Assistente Brio</h2>
            </div>
          )}
          
        </div>
        {!state.isCollapsed && (
            <p className="text-sm text-muted-foreground my-6">
              Assistente IA para ajudar em seu projeto. Faça perguntas, peça sugestões ou solicite revisões.
            </p>
          )}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 px-3 pt-3">
          

          <TooltipProvider delayDuration={300}>
            <div className="space-y-1">
              <Tooltip>
                <Collapsible
                  open={state.openSections.includes('chat')}
                  onOpenChange={() => toggleSection('chat')}
                >
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      {renderButton(MessageSquare, "Chat", 'chat')}
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  {state.isCollapsed && (
                    <TooltipContent side="right" className="select-none">
                      <p>Chat</p>
                    </TooltipContent>
                  )}
                  {!state.isCollapsed && (
                    <CollapsibleContent className="py-2">
                      <div className="space-y-4">
                        {state.messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex flex-col space-y-2",
                              message.type === "user" && "items-end"
                            )}
                          >
                            <div
                              className={cn(
                                "rounded-lg px-4 py-2 max-w-[85%]",
                                message.type === "user" 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted/50"
                              )}
                            >
                              <p>{message.content}</p>
                              {message.references && (
                                <div className="mt-2 space-y-1">
                                  {message.references.map((ref, i) => (
                                    <a
                                      key={i}
                                      href={ref.link}
                                      className="block text-sm text-primary hover:underline"
                                    >
                                      {ref.title}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                            {message.suggestions && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {message.suggestions.map((suggestion, i) => (
                                  <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onSuggestionClick?.(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {state.isTyping && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Digitando...</span>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </ScrollArea>

      {!state.isCollapsed && (
        <div className="border-t p-4 bg-muted">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={state.currentMessage}
              onChange={(e) => setState(prev => ({ ...prev, currentMessage: e.target.value }))}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-background"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}