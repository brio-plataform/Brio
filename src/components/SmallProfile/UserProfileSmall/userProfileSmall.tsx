"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  CheckCircle, 
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
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserProfileProps, BadgeType } from './types'

export function UserProfileSmall({ 
  user,
  onFollow,
  onMessage,
  className 
}: UserProfileProps) {
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

  return (
    <Card className={`w-full max-w-7xl bg-card ${className}`}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">


        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full rounded-full"
              />
            ) : (
              <span className="text-xl font-semibold">
                {user.name[0]}
              </span>
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

        <div className="flex flex-col justify-between gap-6 min-w-[200px]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{user.stats.publications}</p>
              <p className="text-xs text-muted-foreground">Publicações</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.citations}</p>
              <p className="text-xs text-muted-foreground">Citações</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.followers}</p>
              <p className="text-xs text-muted-foreground">Seguidores</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
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
        </div>
      </CardHeader>
    </Card>
  )
}
