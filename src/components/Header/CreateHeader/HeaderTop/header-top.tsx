"use client"

import { Clock, FileText, Quote, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { 
  HeaderTopProps, 
  StatusItem 
} from './types'

export function HeaderTop({
  lastEdited,
  wordCount,
  citationCount,
  aiAssistant,
  progress,
  handleProgressChange
}: HeaderTopProps) {
  
  const statusItems: StatusItem[] = [
    {
      icon: <Clock className="h-3 w-3" />,
      label: "Última edição",
      value: lastEdited.toLocaleTimeString(),
      tooltip: "Horário da última modificação"
    },
    {
      icon: <FileText className="h-3 w-3" />,
      label: "Palavras",
      value: wordCount,
      tooltip: "Total de palavras no documento"
    },
    {
      icon: <Quote className="h-3 w-3" />,
      label: "Citações",
      value: citationCount,
      tooltip: "Total de citações"
    }
  ]

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {statusItems.map((item, index) => (
          <span key={index} className="flex items-center gap-1" title={item.tooltip}>
            {item.icon}
            {item.label}: {item.value}
          </span>
        ))}
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
        <span className="text-xs text-muted-foreground">
          {progress}% concluído
        </span>
      </div>
    </div>
  )
} 