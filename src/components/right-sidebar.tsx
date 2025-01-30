"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  AlertCircle,
  Book,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield,
  Star,
  Eye,
  GitFork,
} from "lucide-react"
import { cn } from "@/lib/utils"

import placeholder from "../../public/images/placeholder.svg"

export function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div
      className={cn(
        "relative border-l bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      <ScrollArea className="h-full">
        <div className={cn("p-4", isCollapsed ? "flex flex-col items-center" : "")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn("mb-4", isCollapsed ? "mx-auto" : "")}
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {!isCollapsed && (
            <>
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <p className="text-sm text-muted-foreground mb-6">
                O Brio é uma plataforma de conhecimento colaborativo que visa democratizar o acesso à educação e promover debates construtivos em um ambiente digital estruturado.
              </p>
            </>
          )}

          <div className={cn("space-y-4", isCollapsed ? "flex flex-col items-center" : "")}>
            {[
              { icon: Book, label: "Readme" },
              { icon: FileText, label: "MIT license" },
              { icon: Shield, label: "Security policy" },
              { icon: Activity, label: "Activity" },
              { icon: AlertCircle, label: "Custom properties" },
            ].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn("w-full justify-start", isCollapsed ? "w-10 h-10 p-0" : "px-2 py-2")}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>


          {!isCollapsed && (
            <>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">11.8k</span>
                  <span className="text-sm text-muted-foreground">stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">102</span>
                  <span className="text-sm text-muted-foreground">watching</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="h-4 w-4" />
                  <span className="text-sm font-medium">3.1k</span>
                  <span className="text-sm text-muted-foreground">forks</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  Releases
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">25</span>
                </h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">v3.1.5 - "Spectre"</span>
                      <span className="rounded-full bg-green-500/20 text-green-500 px-2 py-0.5 text-xs">latest</span>
                    </div>
                    <p className="text-muted-foreground text-xs">27 days ago</p>
                  </div>
                  <Button variant="link" className="text-xs h-auto p-0">
                    + 24 releases
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  Contributors
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">83</span>
                </h3>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Avatar key={i} className="h-8 w-8">
                      <AvatarImage src={placeholder} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}