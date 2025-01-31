"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  Book,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield,
  Star,
  Eye,
  GitFork,
  Users,
  MessageSquare,
  Calendar,
  Bookmark,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"

import placeholder from "../../public/images/placeholder.svg"

export function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div
      className={cn(
        "border-l bg-muted transition-all duration-300 ease-in-out fixed right-0 top-0 h-full max-w-[300px]",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      {/* Parte fixa (botão e título) */}
      <div
        className={cn(
          "p-4 bg-muted fixed top-0 z-10",
          isCollapsed ? "w-16" : "w-80",
        )}
      >
        <div className="flex items-center justify-start gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(isCollapsed ? "mx-auto" : "")}
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {!isCollapsed && (
            <>
              <h2 className="text-lg font-semibold ml-2">Sobre o Projeto</h2>
            </>
          )}
        </div>
      </div>

      {/* Conteúdo rolável */}
      <ScrollArea
        className={cn(
          "h-full",
          isCollapsed ? "pt-16" : "pt-20", // Ajuste dinâmico do padding-top
        )}
      >
        <div className={cn("p-4", isCollapsed ? "flex flex-col items-center" : "")}>
          {!isCollapsed && (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Este projeto faz parte da plataforma Brio, promovendo conhecimento colaborativo e inovação através de debates construtivos e revisão por pares.
              </p>
            </>
          )}

          <div className={cn("space-y-4", isCollapsed ? "flex flex-col items-center" : "")}>
            {[
              { icon: Book, label: "Documentação" },
              { icon: FileText, label: "Licença MIT" },
              { icon: Shield, label: "Política de Segurança" },
              { icon: Activity, label: "Atividades Recentes" },
              { icon: Users, label: "Colaboradores" },
              { icon: MessageSquare, label: "Discussões" },
              { icon: Calendar, label: "Eventos Relacionados" },
              { icon: Bookmark, label: "Recursos da Biblioteca" },
            ].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn("w-full justify-start", isCollapsed ? "w-10 h-10 p-0" : "px-2 py-2")}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {!isCollapsed && (
            <>
              {/* Estatísticas do Projeto */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">11.8k</span>
                  <span className="text-sm text-muted-foreground">estrelas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">102</span>
                  <span className="text-sm text-muted-foreground">visualizações</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="h-4 w-4" />
                  <span className="text-sm font-medium">3.1k</span>
                  <span className="text-sm text-muted-foreground">forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-medium">5</span>
                  <span className="text-sm text-muted-foreground">recompensas</span>
                </div>
              </div>

              {/* Revisões em Andamento */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  Revisões em Andamento
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">3</span>
                </h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Revisão: Análise de Dados</span>
                      <span className="rounded-full bg-yellow-500/20 text-yellow-500 px-2 py-0.5 text-xs">pendente</span>
                    </div>
                    <p className="text-muted-foreground text-xs">2 dias atrás</p>
                  </div>
                  <Button variant="link" className="text-xs h-auto p-0">
                    Ver Todas as Revisões
                  </Button>
                </div>
              </div>

              {/* Colaboradores */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  Colaboradores
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">83</span>
                </h3>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Avatar key={i} className="h-8 w-8">
                      <AvatarImage src={placeholder} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}