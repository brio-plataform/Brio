"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Book,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Layout,
  List,
  Search,
  Settings,
  Users,
  Wrench,
  Folder,
  Star,
  MessageSquare,
  Bookmark,
  Globe,
  Clipboard,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const menuItems = [
    { icon: Home, label: "Página Inicial", isActive: true },
    { icon: Search, label: "Pesquisar" },
    { icon: Folder, label: "Meus Projetos" },
    { icon: Book, label: "Biblioteca" },
    { icon: Calendar, label: "Calendário" },
    { icon: List, label: "Tarefas" },
    { icon: MessageSquare, label: "Discussões" },
    { icon: Users, label: "Colaboradores" },
    { icon: Star, label: "Favoritos" },
    { icon: Bookmark, label: "Salvos" },
    { icon: Globe, label: "Eventos" },
    { icon: Clipboard, label: "Relatórios" },
    { icon: Settings, label: "Configurações" },
    { icon: HelpCircle, label: "Ajuda" },
  ]

  return (
    <div
      className={cn(
        "border-r bg-muted transition-all duration-300 ease-in-out fixed left-0 top-0 h-full",
        isCollapsed ? "w-16" : "w-[285px]",
      )}
    >
      <ScrollArea className="h-full">
        <div className="space-y-4 py-4">
          {/* Cabeçalho da Sidebar */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-2 px-2">
                  <span className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-background font-bold">
                    B
                  </span>
                  <h2 className="text-sm font-semibold">Brio Path</h2>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="ml-auto"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Itens do Menu */}
          <div className={cn("space-y-1 px-3", isCollapsed ? "flex flex-col items-center" : "")}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant={item.isActive ? "secondary" : "ghost"}
                className={cn(
                  "h-10 w-10",
                  isCollapsed ? "mx-auto" : "w-full justify-start",
                  item.isActive && "bg-secondary/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {/* Seção de Atalhos Rápidos (apenas quando expandido) */}
          {!isCollapsed && (
            <div className="px-3">
              <h3 className="text-sm font-semibold mb-2">Atalhos Rápidos</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Novo Documento
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Wrench className="h-4 w-4 mr-2" />
                  Modelos
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Layouts
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}