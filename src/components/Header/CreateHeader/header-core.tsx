"use client"

import { Lock, Globe, Building, ChevronDown, Download, Share, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonSelect } from "@/components/ui/button-select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderCoreProps {
  projectName: string
  projectDescription: string
  documentType: 'article' | 'thesis' | 'book' | 'research'
  visibility: 'private' | 'public' | 'institutional'
  autoSaveStatus: string
  handleButtonSelectChange: (value: string) => void
  handleVisibilityChange: (value: 'private' | 'public' | 'institutional') => void
  handleAutoSave: () => void
}

export function HeaderCore({
  projectName,
  projectDescription,
  documentType,
  visibility,
  autoSaveStatus,
  handleButtonSelectChange,
  handleVisibilityChange,
  handleAutoSave
}: HeaderCoreProps) {
  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">{projectName || ''}</h1>
            <ButtonSelect
              value={documentType}
              onChange={handleButtonSelectChange}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {projectDescription || ''}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{autoSaveStatus}</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {visibility === 'private' ? <Lock className="h-4 w-4" /> : visibility === 'public' ? <Globe className="h-4 w-4" /> : <Building className="h-4 w-4" />}
              {visibility === 'private' ? 'Privado' : visibility === 'public' ? 'Público' : 'Institucional'}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleVisibilityChange('private')}>
              <Lock className="h-4 w-4 mr-2" /> Privado
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleVisibilityChange('public')}>
              <Globe className="h-4 w-4 mr-2" /> Público
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleVisibilityChange('institutional')}>
              <Building className="h-4 w-4 mr-2" /> Institucional
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Share className="h-4 w-4" />
          Compartilhar
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="gap-2" 
          onClick={handleAutoSave}
          disabled={autoSaveStatus === "Salvando..."}
        >
          <Save className="h-4 w-4" />
          {autoSaveStatus === "Salvando..." ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  )
} 