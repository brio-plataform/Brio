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
  Loader2,
  FileCheck,
  Sparkles,
  Search,
  MoreVertical,
  Copy,
  Reply,
  Link,
  User
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
import { formatRelativeTime } from "@/lib/utils"

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
      "border-l bg-muted transition-all duration-300 ease-in-out h-full flex flex-col overflow-hidden",
      state.isCollapsed ? "w-16" : "w-[500px]",
      className
    )}>
      <div className={cn(
        "px-3 py-2 bg-muted border-b min-w-0",
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
                <p>{state.isCollapsed ? "Expandir IA" : "Recolher IA"}</p>
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

      <ScrollArea className="flex-1 min-w-0">
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
                        <div className="flex flex-wrap gap-2 px-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-background/40 hover:bg-background/60 transition-colors"
                            onClick={() => onSuggestionClick?.("Revisar meu texto")}
                          >
                            <FileCheck className="h-3 w-3 mr-1.5" />
                            Revisar texto
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-background/40 hover:bg-background/60 transition-colors"
                            onClick={() => onSuggestionClick?.("Sugerir melhorias")}
                          >
                            <Sparkles className="h-3 w-3 mr-1.5" />
                            Sugerir melhorias
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-background/40 hover:bg-background/60 transition-colors"
                            onClick={() => onSuggestionClick?.("Encontrar referências")}
                          >
                            <Search className="h-3 w-3 mr-1.5" />
                            Buscar referências
                          </Button>
                        </div>

                        <div className="space-y-6 px-1">
                          {state.messages.map((message) => (
                            <div
                              key={message.id}
                              className={cn(
                                "group flex flex-col",
                                message.type === "user" ? "items-end" : "items-start"
                              )}
                            >
                              <div className={cn(
                                "flex items-center gap-2 mb-1",
                                message.type === "user" && "flex-row-reverse"
                              )}>
                                <div className={cn(
                                  "flex items-center justify-center w-6 h-6 rounded-full",
                                  message.type === "user" 
                                    ? "bg-primary/10" 
                                    : "bg-primary/5"
                                )}>
                                  {message.type === "ai" 
                                    ? <Bot className="h-3.5 w-3.5 text-primary" />
                                    : <User className="h-3.5 w-3.5 text-primary" />
                                  }
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(message.timestamp)}
                                </span>
                              </div>

                              <div className="flex flex-col max-w-[85%] group">
                                <div
                                  className={cn(
                                    "rounded-2xl px-4 py-2.5 shadow-sm",
                                    message.type === "user" 
                                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                                      : "bg-muted rounded-tl-none"
                                  )}
                                >
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.content}
                                  </p>

                                  {message.references && (
                                    <div className="mt-3 pt-3 border-t border-primary/10">
                                      <p className="text-xs font-medium mb-2 opacity-70">
                                        Referências:
                                      </p>
                                      <div className="space-y-1.5">
                                        {message.references.map((ref, i) => (
                                          <a
                                            key={i}
                                            href={ref.link}
                                            className={cn(
                                              "flex items-center gap-1.5 text-xs hover:underline transition-colors",
                                              message.type === "user" 
                                                ? "text-primary-foreground/90 hover:text-primary-foreground" 
                                                : "text-primary/90 hover:text-primary"
                                            )}
                                          >
                                            <Link className="h-3 w-3" />
                                            {ref.title}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {message.suggestions && (
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {message.suggestions.map((suggestion, i) => (
                                      <Button
                                        key={i}
                                        variant="outline"
                                        size="sm"
                                        className="h-7 bg-background/80 hover:bg-background border-primary/20 
                                                 hover:border-primary/40 text-xs shadow-sm transition-all"
                                        onClick={() => onSuggestionClick?.(suggestion)}
                                      >
                                        <Wand2 className="h-3 w-3 mr-1.5 text-primary/70" />
                                        {suggestion}
                                      </Button>
                                    ))}
                                  </div>
                                )}

                                <div className={cn(
                                  "absolute opacity-0 group-hover:opacity-100 transition-opacity",
                                  message.type === "user" ? "-left-8" : "-right-8",
                                  "top-8"
                                )}>
                                  <div className="flex flex-col gap-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 hover:bg-background"
                                          >
                                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side={message.type === "user" ? "left" : "right"}>
                                          Copiar mensagem
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 hover:bg-background"
                                          >
                                            <Reply className="h-3.5 w-3.5 text-muted-foreground" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side={message.type === "user" ? "left" : "right"}>
                                          Responder
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {state.isTyping && (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
                                <Bot className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-150" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-300" />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div ref={messagesEndRef} />
                        </div>
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
        <div className="border-t p-4 bg-muted min-w-0">
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