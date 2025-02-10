"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  CheckCircle, 
  MapPin, 
  MoreVertical, 
  Trophy, 
  Users,
  Share2,
  Bookmark,
  Flag,
  ExternalLink,
  Book,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InstitutionProfileProps } from './types'
import { useState } from "react"

// Componente principal
export function InstitutionalProfileSmall({ 
  institution,
  onFollow,
  onJoin,
  className 
}: InstitutionProfileProps) {
  const [avatarError, setAvatarError] = useState(false)
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Função para formatar números com K, M, B
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <Card className={`w-full max-w-7xl bg-card ${className}`}>
      {/* Banner da Instituição (se existir) */}
      {institution.banner && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img 
            src={institution.banner} 
            alt={`${institution.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {institution.avatar && !avatarError ? (
                  <img 
                    src={institution.avatar} 
                    alt={institution.name}
                    className="h-full w-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-xl font-semibold text-primary">
                    {getInitials(institution.name)}
                  </span>
                )}
              </div>
              {institution.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold flex items-center gap-2 justify-between w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      {institution.name}
                      <Badge variant="secondary">{institution.type}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>@{institution.username}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="self-end">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar Site
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Salvar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Book className="w-4 h-4 mr-2" />
                      Ver Publicações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Flag className="w-4 h-4 mr-2" />
                      Denunciar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </h2>
              {institution.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{institution.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {institution.researchAreas?.map((area) => (
              <Badge key={area} variant="secondary">
                {area}
              </Badge>
            ))}
            {institution.achievements?.map((achievement) => (
              <TooltipProvider key={achievement}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {achievement}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{achievement}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          {institution.description && (
            <p className="text-sm text-muted-foreground max-w-3xl">
              {institution.description}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 min-w-[200px] w-full max-w-sm">

        <div className="flex gap-4 justify-center items-center w-full">
            <Button 
              className="w-full"
              onClick={onFollow}
            >
              Seguir
            </Button>
            <Button variant="outline" className="w-full h-10 gap-2" onClick={onJoin}>
              <Users className="h-4 w-4" />
              Juntar-se
            </Button>
          </div>
          
          <div className="flex w-full gap-4 text-center">
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <Users className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {formatNumber(institution.stats.professors)}
              </p>
              <p className="text-xs text-muted-foreground">Professores</p>
            </div>
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <Book className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {formatNumber(institution.stats.publications)}
              </p>
              <p className="text-xs text-muted-foreground">Publicações</p>
            </div>
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <Users className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {formatNumber(institution.stats.students)}
              </p>
              <p className="text-xs text-muted-foreground">Alunos</p>
            </div>
          </div>
          
        </div>
      </CardHeader>
    </Card>
  )
} 