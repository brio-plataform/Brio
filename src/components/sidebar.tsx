"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Book,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Layout,
  List,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-muted/40 pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-2">
            <Book className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Notion de ...</h2>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Search className="h-4 w-4" />
              Pesquisar
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Layout className="h-4 w-4" />
              IA do Notion
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-2 text-sm font-medium">Workspace</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Página inicial
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Inbox className="h-4 w-4" />
              Caixa de entrada
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-2 text-sm font-medium">Particular</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Brio Platform
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Nova página
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <List className="h-4 w-4" />
              Lista de tarefas semanal
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Calendário
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <HelpCircle className="h-4 w-4" />
              Ajuda
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}