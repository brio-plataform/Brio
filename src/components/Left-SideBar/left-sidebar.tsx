"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock
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
import { MenuItem, SidebarProps, SidebarState } from './types'
import { MOCK_MENU_ITEMS, MOCK_BOTTOM_ITEMS } from './mockData'

export function LeftSidebar({ defaultCollapsed = false, className }: SidebarProps) {
  const [state, setState] = useState<SidebarState>({
    isCollapsed: defaultCollapsed,
    openSections: [],
    activeItem: MOCK_MENU_ITEMS[0]
  })

  const toggleSidebar = () => {
    setState(prev => ({
      ...prev,
      isCollapsed: !prev.isCollapsed
    }))
  }
  
  const toggleSection = (section: string) => {
    if (state.isCollapsed) {
      setState(prev => ({
        ...prev,
        isCollapsed: false,
        openSections: [section]
      }))
    } else {
      setState(prev => ({
        ...prev,
        openSections: prev.openSections.includes(section)
          ? prev.openSections.filter(item => item !== section)
          : [...prev.openSections, section]
      }))
    }
  }

  const setActiveItem = (item: MenuItem) => {
    setState(prev => ({
      ...prev,
      activeItem: item
    }))
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <TooltipProvider key={item.label} delayDuration={300}>
          <Tooltip>
            <Collapsible
              open={state.openSections.includes(item.label)}
              onOpenChange={() => toggleSection(item.label)}
            >
              <TooltipTrigger asChild>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between",
                      state.isCollapsed && "w-10 h-10 p-0",
                      state.activeItem.label === item.label && "bg-accent"
                    )}
                    onClick={() => setActiveItem(item)}
                  >
                    <div className={cn(
                      "flex items-center",
                      state.isCollapsed && "w-full justify-center"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {!state.isCollapsed && <span className="ml-2">{item.label}</span>}
                    </div>
                    {!state.isCollapsed && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          state.openSections.includes(item.label) && "transform rotate-180"
                        )}
                      />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </TooltipTrigger>
              {state.isCollapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
              {!state.isCollapsed && (
                <CollapsibleContent className="py-2">
                  {item.items.map((subItem, index) => (
                    <div key={index} className="space-y-1">
                      <Button
                        variant="ghost"
                        asChild
                        className="w-full justify-start pl-8"
                      >
                        <Link href={subItem.href || "#"}>
                          <subItem.icon className="h-4 w-4 mr-2" />
                          <span>{subItem.label}</span>
                        </Link>
                      </Button>
                      {subItem.metadata && (
                        <div className="pl-8 pr-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Restam {subItem.metadata.timeLeft}</span>
                            <span>•</span>
                            <span>{subItem.metadata.reviewer}</span>
                          </div>
                          <Progress 
                            value={subItem.metadata.progress} 
                            className="h-1 mt-1" 
                          />
                        </div>
                      )}
                    </div>
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
                state.isCollapsed && "w-10 h-10 p-0",
                state.activeItem.label === item.label && "bg-accent"
              )}
              onClick={() => setActiveItem(item)}
            >
              <Link href={item.href || "#"} className={cn(
                "flex items-center",
                state.isCollapsed && "w-full justify-center"
              )}>
                <item.icon className="h-4 w-4" />
                {!state.isCollapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            </Button>
          </TooltipTrigger>
          {state.isCollapsed && (
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
        state.isCollapsed ? "w-16" : "w-fit max-w-[278px]",
        className
      )}
    >
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          {!state.isCollapsed && (
            <div className="flex items-center gap-2 px-2">
              <span className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-background font-bold">
                <state.activeItem.icon className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-semibold">
                Brio - {state.activeItem.label}
              </h2>
            </div>
          )}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={cn("ml-auto", state.isCollapsed && "mx-auto")}
                >
                  {state.isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={state.isCollapsed ? "right" : "left"}>
                <p>{state.isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className={cn(
          "space-y-2 py-4",
          state.isCollapsed ? "px-3" : "px-3"
        )}>
          {MOCK_MENU_ITEMS.map(renderMenuItem)}
        </div>
      </ScrollArea>

      <div className={cn(
        "mt-auto py-4 border-t",
        state.isCollapsed ? "px-3" : "px-3"
      )}>
        {MOCK_BOTTOM_ITEMS.map(renderMenuItem)}
      </div>
    </div>
  )
}