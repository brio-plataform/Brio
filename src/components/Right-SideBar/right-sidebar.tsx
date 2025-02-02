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
  LucideIcon,
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


interface MenuItem {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
}

export function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(['Documentação'])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setOpenSections([])
    }
  }
  
  const toggleSection = (section: string) => {
    if (isCollapsed) {
      setIsCollapsed(false)
      setOpenSections([section])
    } else {
      setOpenSections(current => 
        current.includes(section)
          ? current.filter(item => item !== section)
          : [...current, section]
      )
    }
  }

  const reviews = [
    {
      title: "Análise de Dados",
      reviewer: "Maria Silva",
      progress: 65,
      timeLeft: "2 dias",
      status: "em andamento"
    },
    {
      title: "Metodologia",
      reviewer: "João Santos",
      progress: 90,
      timeLeft: "1 dia",
      status: "revisão final"
    },
    {
      title: "Resultados",
      reviewer: "Ana Costa",
      progress: 30,
      timeLeft: "5 dias",
      status: "iniciado"
    }
  ]

  const sections: MenuItem[] = [
    {
      title: "Documentação",
      icon: Book,
      content: (
        <>
          <Button variant="ghost" className="w-full justify-start pl-8">
            <FileText className="h-4 w-4 mr-2" />
            <span>Guia de Início Rápido</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start pl-8">
            <Shield className="h-4 w-4 mr-2" />
            <span>Política de Segurança</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start pl-8">
            <FileText className="h-4 w-4 mr-2" />
            <span>Licença MIT</span>
          </Button>
        </>
      )
    },
    {
      title: "Atividades",
      icon: Activity,
      content: (
        <>
          <Button variant="ghost" className="w-full justify-start pl-8">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Discussões</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start pl-8">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Eventos</span>
          </Button>
        </>
      )
    },
    {
      title: "Colaboradores",
      icon: Users,
      content: (
        <div className="px-4">
          <div className="flex -space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                <AvatarFallback>BP</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">83 colaboradores</span>
        </div>
      )
    },
    {
      title: "Métricas",
      icon: Star,
      content: (
        <div className="px-4 space-y-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">11.8k</span>
            <span className="text-sm text-muted-foreground">estrelas</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">102</span>
            <span className="text-sm text-muted-foreground">visualizações</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">3.1k</span>
            <span className="text-sm text-muted-foreground">forks</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">5</span>
            <span className="text-sm text-muted-foreground">recompensas</span>
          </div>
        </div>
      )
    }
  ]

  const renderButton = (section: MenuItem) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-between",
        isCollapsed && "w-10 h-10 p-0",
      )}
    >
      <div className={cn(
        "flex items-center",
        isCollapsed && "w-full justify-center"
      )}>
        <section.icon className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">{section.title}</span>}
      </div>
      {!isCollapsed && (
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            openSections.includes(section.title) && "transform rotate-180"
          )}
        />
      )}
    </Button>
  )

  return (
    <div className={cn(
      "border-l bg-muted transition-all duration-300 ease-in-out h-full",
      isCollapsed ? "w-16" : "w-[285px]",
    )}>
      <div className={cn(
        "px-3 py-2 bg-muted fixed top-0 z-10",
        isCollapsed ? "w-16" : "w-fit max-w-[285px]",
      )}>
        <div className="flex items-center justify-start gap-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={cn(isCollapsed ? "mx-auto" : "")}
                >
                  {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCollapsed ? "Abrir" : "Fechar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {!isCollapsed && <h2 className="text-lg font-semibold ml-2">Sobre o Projeto</h2>}
        </div>
      </div>

      <ScrollArea className="h-full pt-12">
        <div className="space-y-2 py-4 px-3">
          {!isCollapsed && (
            <p className="text-sm text-muted-foreground mb-6">
              Este projeto faz parte da plataforma Brio, promovendo conhecimento colaborativo e inovação através de debates construtivos e revisão por pares.
            </p>
          )}

          {sections.map((section) => (
            <TooltipProvider key={section.title} delayDuration={300}>
              <Tooltip>
                <Collapsible
                  open={openSections.includes(section.title)}
                  onOpenChange={() => toggleSection(section.title)}
                >
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      {renderButton(section)}
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{section.title}</p>
                    </TooltipContent>
                  )}
                  {!isCollapsed && (
                    <CollapsibleContent className="py-2">
                      {section.content}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </Tooltip>
            </TooltipProvider>
          ))}

          {!isCollapsed && (
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