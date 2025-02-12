"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  MessageCircle, 
  MoreVertical, 
  Star, 
  Trophy, 
  Users,
  Share2,
  Bookmark,
  Flag,
  Book,
  Check,
  MessageSquare,
  CheckCircle
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserProfileProps, BadgeType } from './types'
import { useState } from "react"

export function UserProfileSmall({ 
  user,
  onFollow,
  onMessage,
  className 
}: UserProfileProps) {
  const [avatarError, setAvatarError] = useState(false)
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getBadgeIcon = (type: BadgeType) => {
    switch (type) {
      case 'top-contributor':
        return <Trophy className="h-3 w-3" />
      case 'expert':
        return <Star className="h-3 w-3" />
      case 'mentor':
        return <Users className="h-3 w-3" />
      default:
        return null
    }
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
      {/* Banner do Usuário (se existir) */}
      {user.banner && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img 
            src={user.banner} 
            alt={`${user.name} banner`}
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
                {user.avatar && !avatarError ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-full w-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-xl font-semibold text-primary">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {user.name}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>@{user.username}</p>
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
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Salvar Perfil
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

              {(user.role || user.institution) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {user.role && <span>{user.role}</span>}
                {user.role && user.institution && <span>•</span>}
                {user.institution && (
                  <>
                    <span>{user.institution.name}</span>
                    {user.institution.location && (
                      <>
                        <span>•</span>
                        <span>{user.institution.location}</span>
                      </>
                    )}
                  </>
                )}
                </div>
              )}
            </div>
          </div>
          {user.badges && user.badges.length > 0 && (
            <div className="flex gap-2">
              {user.badges.map((badge) => (
                <TooltipProvider key={badge.type}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="secondary" className="gap-1">
                        {getBadgeIcon(badge.type)}
                        {badge.label}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{badge.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )}

          {user.bio && (
            <p className="text-sm text-muted-foreground max-w-3xl">
              {user.bio}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 min-w-[200px] w-full max-w-sm">

        <div className="flex gap-4 justify-center items-center w-full">
            <Button 
              className="w-full"
              variant={user.isFollowing ? "secondary" : "default"}
              onClick={onFollow}
            >
              {user.isFollowing ? (
                <><Check className="h-4 w-4 mr-2" />Seguindo</>
              ) : (
                'Seguir'
              )}
            </Button>
            <Button variant="outline" className="w-full h-10" onClick={onMessage}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Mensagem
            </Button>
          </div>
          
          <div className="flex w-full gap-4 text-center">
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <Book className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{formatNumber(user.stats.publications)}</p>
              <p className="text-xs text-muted-foreground">Publicações</p>
            </div>
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <MessageSquare className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{formatNumber(user.stats.citations)}</p>
              <p className="text-xs text-muted-foreground">Citações</p>
            </div>
            <div className="flex flex-col items-center bg-muted rounded-lg w-1/3 justify-center h-fit p-6">
              <Users className="h-4 w-4 mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{formatNumber(user.stats.followers)}</p>
              <p className="text-xs text-muted-foreground">Seguidores</p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
