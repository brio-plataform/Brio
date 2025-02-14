"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  Book,
  ChevronLeft,
  FileText,
  Shield,
  Star,
  Eye,
  GitFork,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  Trophy,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
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
import { 
  RightSidebarProps, 
  RightSidebarState,
  RightSidebarSection
} from './types'
import { 
  MOCK_METRICS, 
  MOCK_REVIEWS, 
  MOCK_SECTIONS 
} from './mockData'

export function RightSidebar({
  defaultCollapsed = false,
  description = "Este projeto faz parte da plataforma Brio, promovendo conhecimento colaborativo e inovação através de debates construtivos e revisão por pares.",
  metrics = MOCK_METRICS,
  reviews = MOCK_REVIEWS,
  sections = MOCK_SECTIONS,
  onSectionToggle,
  onCollapse
}: RightSidebarProps) {
  const [state, setState] = useState<RightSidebarState>({
    isCollapsed: defaultCollapsed,
    openSections: ['Documentação'],
    description,
    metrics,
    reviews,
    sections
  })

  const toggleSidebar = () => {
    const newIsCollapsed = !state.isCollapsed
    setState(prev => ({ 
      ...prev, 
      isCollapsed: newIsCollapsed,
      openSections: newIsCollapsed ? [] : prev.openSections 
    }))
    onCollapse?.(newIsCollapsed)
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
    onSectionToggle?.(section)
  }

  const renderButton = (section: RightSidebarSection) => (
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
        <section.icon className="h-4 w-4" />
        {!state.isCollapsed && <span className="ml-2">{section.title}</span>}
      </div>
      {!state.isCollapsed && (
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            state.openSections.includes(section.title) && "transform rotate-180"
          )}
        />
      )}
    </Button>
  )

  return (
    <div className={cn(
      "border-l bg-muted transition-all duration-300 ease-in-out h-full",
      state.isCollapsed ? "w-16" : "w-[285px]",
    )}>
      <div className={cn(
        "px-3 py-2 bg-muted fixed top-0 z-10",
        state.isCollapsed ? "w-16" : "w-fit max-w-[285px]",
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
              <TooltipContent side="right">
                <p>{state.isCollapsed ? "Abrir" : "Fechar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {!state.isCollapsed && <h2 className="text-lg font-semibold ml-2">Sobre o Projeto</h2>}
        </div>
      </div>

      <ScrollArea className="h-full pt-12">
        <div className="space-y-2 py-4 px-3">
          {!state.isCollapsed && (
            <p className="text-sm text-muted-foreground mb-6">
              {state.description}
            </p>
          )}

          {sections.map((section) => (
            <TooltipProvider key={section.title} delayDuration={300}>
              <Tooltip>
                <Collapsible
                  open={state.openSections.includes(section.title)}
                  onOpenChange={() => toggleSection(section.title)}
                >
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      {renderButton(section)}
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  {state.isCollapsed && (
                    <TooltipContent side="right">
                      <p>{section.title}</p>
                    </TooltipContent>
                  )}
                  {!state.isCollapsed && (
                    <CollapsibleContent className="py-2">
                      {section.content}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </Tooltip>
            </TooltipProvider>
          ))}

          {!state.isCollapsed && (
            <div className="mt-8 px-4">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                Revisões em Andamento
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{reviews.length}</span>
              </h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{review.title}</span>
                      <span className="text-xs text-muted-foreground">{review.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Restam {review.timeLeft}</span>
                      <span>•</span>
                      <span>Revisor: {review.reviewer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={review.progress} className="flex-1 h-1" />
                      <span className="text-xs font-medium">{review.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}