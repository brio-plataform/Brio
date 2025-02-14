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
  Star,
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
  const [showAllAreas, setShowAllAreas] = useState(false)
  const [showAllAchievements, setShowAllAchievements] = useState(false)
  
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

  const getAreaStyle = (area: string): string => {
    const areaStyles: { [key: string]: string } = {
      "Ciência da Computação": "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      "Medicina": "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      "Direito": "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
      "Administração": "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
      "Engenharia": "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
      "Física": "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
      "Química": "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    }
    return areaStyles[area] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }

  const getAchievementStyle = (achievement: string): { icon: JSX.Element; className: string } => {
    if (achievement.includes("Melhor") || achievement.includes("Top")) {
      return {
        icon: <Trophy className="h-3 w-3" />,
        className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      }
    }
    if (achievement.includes("Produção") || achievement.includes("Publicações")) {
      return {
        icon: <Book className="h-3 w-3" />,
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      }
    }
    if (achievement.includes("Impacto") || achievement.includes("Líder")) {
      return {
        icon: <Star className="h-3 w-3" />,
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      }
    }
    return {
      icon: <Trophy className="h-3 w-3" />,
      className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
    }
  }

  // Função para limitar e organizar itens
  const organizeItems = <T,>(
    items: T[], 
    isExpanded: boolean, 
    initialLimit: number
  ): { visibleItems: T[], hiddenCount: number } => {
    if (!items) return { visibleItems: [], hiddenCount: 0 }
    if (isExpanded) return { visibleItems: items, hiddenCount: 0 }
    
    return {
      visibleItems: items.slice(0, initialLimit),
      hiddenCount: Math.max(0, items.length - initialLimit)
    }
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
          <div className="flex flex-col gap-2">
            {/* Áreas de Pesquisa */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Áreas:
              </span>
              {institution.researchAreas && (
                <>
                  {organizeItems(
                    institution.researchAreas,
                    showAllAreas,
                    3
                  ).visibleItems.map((area) => (
                    <Badge 
                      key={area} 
                      variant="secondary"
                      className={`transition-colors duration-200 ${getAreaStyle(area)}`}
                    >
                      {area}
                    </Badge>
                  ))}
                  {!showAllAreas && organizeItems(institution.researchAreas, false, 3).hiddenCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowAllAreas(true)}
                    >
                      +{organizeItems(institution.researchAreas, false, 3).hiddenCount}
                    </Button>
                  )}
                  {showAllAreas && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowAllAreas(false)}
                    >
                      Mostrar menos
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Conquistas */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Conquistas:
              </span>
              {institution.achievements && (
                <>
                  {organizeItems(
                    institution.achievements,
                    showAllAchievements,
                    2
                  ).visibleItems.map((achievement) => {
                    const { icon, className: achievementClass } = getAchievementStyle(achievement)
                    return (
                      <TooltipProvider key={achievement}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge 
                              variant="secondary" 
                              className={`gap-1 transition-colors duration-200 ${achievementClass}`}
                            >
                              {icon}
                              {achievement}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{achievement}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                  {!showAllAchievements && organizeItems(institution.achievements, false, 2).hiddenCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowAllAchievements(true)}
                    >
                      +{organizeItems(institution.achievements, false, 2).hiddenCount}
                    </Button>
                  )}
                  {showAllAchievements && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowAllAchievements(false)}
                    >
                      Mostrar menos
                    </Button>
                  )}
                </>
              )}
            </div>
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