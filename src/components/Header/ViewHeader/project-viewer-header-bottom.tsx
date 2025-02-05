import { Search, Users, Library, Quote, BarChart2, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ProjectViewerHeaderBottomProps } from '@/types/types'

export function ProjectViewerHeaderBottom({ onNavigate }: ProjectViewerHeaderBottomProps) {
  return (
    <>
      <div className="flex items-center justify-between px-4 gap-4 pb-4">
        <nav className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Library className="h-4 w-4" />
                Conteúdo
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onNavigate('chapters')}>
                Capítulos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('sections')}>
                Seções
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('attachments')}>
                Anexos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Comentários
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onNavigate('pending-comments')}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('resolved-comments')}>
                Resolvidos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavigate('citations')}
          >
            <Quote className="h-4 w-4" />
            Citações
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                Estatísticas
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onNavigate('word-count')}>
                Contagem de Palavras
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('revision-history')}>
                Histórico de Revisões
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('activity-log')}>
                Log de Atividades
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Contribuidores
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onNavigate('active-contributors')}>
                Ativos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('pending-invites')}>
                Convites Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('permissions')}>
                Permissões
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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