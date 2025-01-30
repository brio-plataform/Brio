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
} from "lucide-react"
import { cn } from "@/lib/utils"

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const menuItems = [
    { icon: Search, label: "Pesquisar" },
    { icon: Home, label: "Página inicial" },
    { icon: Inbox, label: "Caixa de entrada" },
    { icon: Book, label: "Brio Platform" },
    { icon: FileText, label: "Nova página" },
    { icon: List, label: "Lista de tarefas" },
    { icon: Calendar, label: "Calendário" },
    { icon: Settings, label: "Configurações" },
    { icon: Wrench, label: "Modelos" },
    { icon: HelpCircle, label: "Ajuda" },
  ]

  return (
    <div
      className={cn(
        "relative border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <ScrollArea className="h-full">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-2 px-2">
                  <span className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-background font-bold">
                    B
                  </span>
                  <h2 className="text-sm font-semibold">Brio Path ...</h2>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className={cn("space-y-1 px-3", isCollapsed ? "flex flex-col items-center" : "")}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn("h-10 w-10", isCollapsed ? "mx-auto" : "w-full justify-start")}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}