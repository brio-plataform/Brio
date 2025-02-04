"use client"

import { Clock, FileText, Quote, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface HeaderTopProps {
  lastEdited: Date
  wordCount: number
  citationCount: number
  aiAssistant: boolean
  progress: number
  handleProgressChange: (event: React.FormEvent<HTMLDivElement>) => void
}

export function HeaderTop({
  lastEdited,
  wordCount,
  citationCount,
  aiAssistant,
  progress,
  handleProgressChange
}: HeaderTopProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Última edição: {lastEdited.toLocaleTimeString()}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {wordCount} palavras
        </span>
        <span className="flex items-center gap-1">
          <Quote className="h-3 w-3" />
          {citationCount} citações
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-xs">
          <Brain className="h-3 w-3 mr-1" />
          IA Assistente {aiAssistant ? 'Ativo' : 'Inativo'}
        </Button>
        <Progress 
          value={progress} 
          className="w-20 h-2" 
          onChange={handleProgressChange}
        />
        <span className="text-xs text-muted-foreground">{progress}% concluído</span>
      </div>
    </div>
  )
} 