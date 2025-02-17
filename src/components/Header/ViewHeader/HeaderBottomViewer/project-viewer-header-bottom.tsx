"use client"

import { Search, Users, Library, Quote, BarChart2, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ProjectViewerHeaderBottomProps, NavigationMenu } from './types'

export function ProjectViewerHeaderBottom({ onNavigate }: ProjectViewerHeaderBottomProps) {
  const navigationMenus: NavigationMenu[] = [
    {
      label: "Conteúdo",
      icon: <Library className="h-4 w-4" />,
      items: [
        { label: "Capítulos", value: "chapters" },
        { label: "Seções", value: "sections" },
        { label: "Anexos", value: "attachments" }
      ]
    },
    {
      label: "Comentários",
      icon: <MessageSquare className="h-4 w-4" />,
      items: [
        { label: "Pendentes", value: "pending-comments" },
        { label: "Resolvidos", value: "resolved-comments" }
      ]
    },
    {
      label: "Citações",
      icon: <Quote className="h-4 w-4" />,
      action: "citations"
    },
    {
      label: "Estatísticas",
      icon: <BarChart2 className="h-4 w-4" />,
      items: [
        { label: "Contagem de Palavras", value: "word-count" },
        { label: "Histórico de Revisões", value: "revision-history" },
        { label: "Log de Atividades", value: "activity-log" }
      ]
    },
    {
      label: "Contribuidores",
      icon: <Users className="h-4 w-4" />,
      items: [
        { label: "Ativos", value: "active-contributors" },
        { label: "Convites Pendentes", value: "pending-invites" },
        { label: "Permissões", value: "permissions" }
      ]
    }
  ]

  return (
    <div className="flex items-center justify-between px-4 gap-4 pb-4">
      <nav className="flex gap-4">
        {navigationMenus.map((menu, index) => (
          menu.items ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {menu.icon}
                  {menu.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menu.items.map((item, itemIndex) => (
                  <DropdownMenuItem 
                    key={itemIndex}
                    onClick={() => onNavigate(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              key={index}
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => menu.action && onNavigate(menu.action)}
            >
              {menu.icon}
              {menu.label}
            </Button>
          )
        ))}
      </nav>

      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar no projeto..." className="pl-8" />
        </div>
      </div>
    </div>
  )
} 