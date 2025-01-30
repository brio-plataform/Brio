"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, GitBranch, Tag, Search, Plus, Code, Eye, GitFork, Star } from "lucide-react"

export function Header() {
  return (
    <div className="flex flex-col border-b gap-5 py-2">
      <div className="flex h-14 items-center px-4 gap-4 justify-center pt-8">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Brio Plataform</h1>
          <p className="text-sm text-muted-foreground">Public</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Watch
            <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">102</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <GitFork className="h-4 w-4" />
            Fork
            <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">3.1k</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Star className="h-4 w-4" />
            Star
            <span className="rounded-lg bg-muted px-2 py-0.5 text-xs">11.8k</span>
          </Button>
        </div>
      </div>
      <div className="flex h-14 items-center px-4 gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <GitBranch className="h-4 w-4" />
          main
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <GitBranch className="h-4 w-4" />
          79 Branches
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Tag className="h-4 w-4" />
          36 Tags
        </Button>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 relative max-w-lg">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Go to file" className="pl-8" />
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add file
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="default" size="sm" className="gap-2">
          <Code className="h-4 w-4" />
          Code
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}