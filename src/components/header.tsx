"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  GitBranch,
  Tag,
  Search,
  Plus,
  Code,
  Eye,
  GitFork,
  Star,
  Users,
  Book,
  MessageSquare,
  Calendar,
} from "lucide-react"

export function Header() {
  return (
    <div className="flex flex-col border-b gap-4 py-4 bg-background">
      {/* Primeira Linha: Título e Estatísticas */}
      <div className="flex items-center justify-between px-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Brio Platform</h1>
          <p className="text-sm text-muted-foreground">Plataforma de Conhecimento Colaborativo</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Estatísticas */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              <span>Watch</span>
              <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">102</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <GitFork className="h-4 w-4" />
              <span>Fork</span>
              <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">3.1k</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Star className="h-4 w-4" />
              <span>Star</span>
              <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">11.8k</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Segunda Linha: Navegação e Ações Rápidas */}
      <div className="flex items-center justify-between px-6 gap-4">
        {/* Navegação */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <GitBranch className="h-4 w-4" />
            <span>main</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <GitBranch className="h-4 w-4" />
            <span>79 Branches</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Tag className="h-4 w-4" />
            <span>36 Tags</span>
          </Button>
        </div>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar arquivos, estudos ou colaboradores..." className="pl-8" />
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Adicionar Arquivo</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <Code className="h-4 w-4" />
            <span>Code</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Terceira Linha: Funcionalidades do Brio */}
      <div className="flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Book className="h-4 w-4" />
            <span>Estudos Colaborativos</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Revisão por Pares</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Discussões</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Eventos</span>
          </Button>
        </div>
      </div>
    </div>
  )
}