"use client"

import { GitBranch, ChevronDown, Tag, School, Settings, Search, Users, Library, Quote, BarChart2, MessageSquare, Eye, Coffee, Activity, History, GitFork, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Collaborator {
  id: string
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'away'
}

interface HeaderBottomProps {
  currentVersion: string
  collaborators: Collaborator[]
}

export function HeaderBottom({
  currentVersion,
  collaborators
}: HeaderBottomProps) {
  return (
    <>
      <div className="flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <GitBranch className="h-4 w-4" />
                v{currentVersion}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <History className="h-4 w-4 mr-2" /> Ver histórico
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitFork className="h-4 w-4 mr-2" /> Criar nova versão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <School className="h-4 w-4" />
            Instituição
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>

        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar no documento..." className="pl-8" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Colaboradores
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {collaborators.map(collaborator => (
                <DropdownMenuItem key={collaborator.id}>
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                  </Avatar>
                  {collaborator.name} - {collaborator.role}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" /> Adicionar colaborador
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="gap-2">
            <Library className="h-4 w-4" />
            Bibliografia
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Quote className="h-4 w-4" />
            Citações
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Estatísticas
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Comentários
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Visualizar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Coffee className="h-4 w-4" />
            Fazer pausa
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Activity className="h-4 w-4" />
            Foco
          </Button>
        </div>
      </div>
    </>
  )
} 