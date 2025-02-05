"use client"

import { Search, Users, Library, Quote, BarChart2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProjectViewerHeaderBottomProps {
  onNavigate: (section: string) => void
}

export function ProjectViewerHeaderBottom({ onNavigate }: ProjectViewerHeaderBottomProps) {
  return (
    <>
      <div className="flex items-center justify-between px-4 gap-4 pb-4">
        <nav className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('content')}
          >
            <Library className="h-4 w-4" />
            Conteúdo
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('comments')}
          >
            <MessageSquare className="h-4 w-4" />
            Comentários
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('citations')}
          >
            <Quote className="h-4 w-4" />
            Citações
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('stats')}
          >
            <BarChart2 className="h-4 w-4" />
            Estatísticas
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('contributors')}
          >
            <Users className="h-4 w-4" />
            Contribuidores
          </Button>
        </nav>

        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar no projeto..." className="pl-8" />
          </div>
        </div>
      </div>
    </>
  )
} 