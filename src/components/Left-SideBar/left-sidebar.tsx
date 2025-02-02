"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { LucideIcon, User } from "lucide-react"
import {
  Book,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
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
  Building2,
  GraduationCap,
  BookOpen,
  Trophy,
  Target,
  Lightbulb,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  items?: Omit<MenuItem, 'items'>[];
}

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)
  
  const toggleSection = (section: string) => {
    if (isCollapsed) {
      setIsCollapsed(false)
      setOpenSections([section])
    } else {
      setOpenSections(current => 
        current.includes(section)
          ? current.filter(item => item !== section)
          : [...current, section]
      )
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: "Início",
      href: "/"
    },
    {
      icon: Search,
      label: "Explorar",
      href: "/explore"
    },
    {
      icon: Folder,
      label: "Meu Espaço",
      items: [
        { icon: User, label: "Meu Perfil", href: "/user" },
        { icon: Folder, label: "Meus Projetos", href: "/user/projects/new-project" },
        { icon: BookOpen, label: "Meus Estudos", href: "/user/studies" },
        { icon: Trophy, label: "Conquistas", href: "/user/achievements" },
        { icon: Target, label: "Metas", href: "/user/goals" },
      ]
    },
    {
      icon: Building2,
      label: "Acadêmico",
      items: [
        { icon: Building2, label: "Instituições", href: "/institutions" },
        { icon: GraduationCap, label: "Cursos", href: "/courses" },
        { icon: Book, label: "Biblioteca", href: "/library" },
      ]
    },
    {
      icon: Users,
      label: "Colaboração",
      items: [
        { icon: MessageSquare, label: "Discussões", href: "/discussions" },
        { icon: Users, label: "Colaboradores", href: "/collaborators" },
        { icon: Globe, label: "Eventos", href: "/events" },
      ]
    },
    {
      icon: Star,
      label: "Organização",
      items: [
        { icon: Calendar, label: "Calendário", href: "/calendar" },
        { icon: List, label: "Tarefas", href: "/tasks" },
        { icon: Star, label: "Favoritos", href: "/favorites" },
        { icon: Bookmark, label: "Salvos", href: "/saved" },
        { icon: Lightbulb, label: "Ideias", href: "/ideas" },
        { icon: Clipboard, label: "Relatórios", href: "/reports" },
      ]
    }
  ]

  const bottomItems: MenuItem[] = [
    { icon: Settings, label: "Configurações", href: "/settings" },
    { icon: HelpCircle, label: "Ajuda", href: "/help" },
  ]

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <TooltipProvider key={item.label} delayDuration={300}>
          <Tooltip>
            <Collapsible
              open={openSections.includes(item.label)}
              onOpenChange={() => toggleSection(item.label)}
            >
              <TooltipTrigger asChild>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between",
                      isCollapsed && "w-10 h-10 p-0",
                    )}
                  >
                    <div className={cn(
                      "flex items-center",
                      isCollapsed && "w-full justify-center"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-2">{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSections.includes(item.label) && "transform rotate-180"
                        )}
                      />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
              {!isCollapsed && (
                <CollapsibleContent className="py-2">
                  {item.items.map((subItem, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      asChild
                      className="w-full justify-start pl-8"
                    >
                      <Link href={subItem.href || "#"}>
                        <subItem.icon className="h-4 w-4 mr-2" />
                        <span>{subItem.label}</span>
                      </Link>
                    </Button>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <TooltipProvider key={item.label} delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start",
                isCollapsed && "w-10 h-10 p-0"
              )}
            >
              <Link href={item.href || "#"} className={cn(
                "flex items-center",
                isCollapsed && "w-full justify-center"
              )}>
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div
      className={cn(
        "border-r bg-muted transition-all duration-300 ease-in-out h-full flex flex-col",
        isCollapsed ? "w-16" : "w-fit max-w-[278px]",
      )}
    >
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
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={cn("ml-auto", isCollapsed && "mx-auto")}
                >
                  {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={isCollapsed ? "right" : "left"}>
                <p>{isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className={cn(
          "space-y-2 py-4",
          isCollapsed ? "px-3" : "px-3"
        )}>
          {menuItems.map(renderMenuItem)}
        </div>
      </ScrollArea>

      <div className={cn(
        "mt-auto py-4 border-t",
        isCollapsed ? "px-3" : "px-3"
      )}>
        {bottomItems.map(renderMenuItem)}
      </div>
    </div>
  )
}