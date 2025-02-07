"use client"

import { Lock, Globe, Building, ChevronDown, Download, Share, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonSelect } from "@/components/ui/button-select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { HeaderCoreProps } from '@/types/types'

export function HeaderCore({
  projectName,
  projectDescription,
  documentType,
  visibility,
  handleButtonSelectChange,
  handleVisibilityChange,
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
          className="gap-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
        >
          <Rocket className="h-4 w-4" />
          Publicar
        </Button>
      </div>
    </div>
  )
} 