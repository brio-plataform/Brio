"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  ChevronDown,
  HelpCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NavigationHeader() {
  return (
    <div className="flex flex-col border-b bg-background w-full sticky top-0 z-40">
      {/* Barra Principal */}
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo e Pesquisa */}
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-foreground flex items-center justify-center text-background font-bold">
              B
            </span>
            <span className="font-semibold">Brio Path</span>
          </div>

          {/* Barra de Pesquisa */}
          <div className="max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar no Brio..." 
                className="pl-8 bg-muted"
              />
            </div>
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-4">
          {/* Botão Criar */}
          <Button variant="ghost" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Criar</span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Notificações */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Mensagens */}
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Ajuda */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Avatar do Usuário */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback>BP</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Navegação Secundária (opcional, pode ser customizada por página) */}
      <div className="flex items-center px-6 h-12 gap-6 text-sm">
        <Button variant="ghost" size="sm" className="h-12">
          Visão Geral
        </Button>
        <Button variant="ghost" size="sm" className="h-12">
          Meus Projetos
        </Button>
        <Button variant="ghost" size="sm" className="h-12">
          Biblioteca
        </Button>
        <Button variant="ghost" size="sm" className="h-12">
          Comunidade
        </Button>
        <Button variant="ghost" size="sm" className="h-12">
          Eventos
        </Button>
      </div>
    </div>
  )
} 