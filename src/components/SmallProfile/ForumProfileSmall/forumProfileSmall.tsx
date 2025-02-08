"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  MoreVertical, 
  Users,
  Share2,
  Bookmark,
  Flag,
  Book,
  MessageSquare,
  TrendingUp,
  Settings,
  Check,
  MapPin,
  Sparkles,
  Calendar,
  Activity,
  Eye
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ForumProfileProps } from './types'
import { MOCK_FORUM } from './mockData'

export function ForumProfileSmall({ 
  forum,
  onJoin,
  onModerate,
  className 
}: ForumProfileProps) {
  return (
    <Card className={`w-full max-w-7xl bg-card ${className}`}>
      {/* Banner do Fórum (se existir) */}
      {forum.banner && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img 
            src={forum.banner} 
            alt={`${forum.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <CardHeader className="flex flex-col gap-6 p-6">
        {/* Cabeçalho Principal */}
        <div className="flex items-start justify-between">
          {/* Informações Básicas */}
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center relative">
              {forum.avatar ? (
                <img 
                  src={forum.avatar} 
                  alt={forum.name} 
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">{forum.name[0]}</span>
              )}
              {forum.verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-500 bg-background rounded-full" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{forum.name}</h2>
                <Badge variant={forum.type === 'official' ? "default" : "secondary"}>
                  {forum.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{forum.category}</Badge>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {forum.stats.members} membros
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-green-500">
                  <Activity className="h-4 w-4" />
                  {forum.stats.weeklyGrowth}% esta semana
                </div>
              </div>
            </div>
          </div>

          {/* Ações Principais */}
          <div className="flex items-center gap-2">

            <Button 
              className="min-w-[120px]"
              variant={forum.isJoined ? "secondary" : "default"}
              onClick={onJoin}
            >
              {forum.isJoined ? (
                <><Check className="h-4 w-4 mr-2" />Membro</>
              ) : (
                <><Users className="h-4 w-4 mr-2" />Participar</>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
                  Salvar
                </DropdownMenuItem>
                {forum.isModerator && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onModerate}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Flag className="w-4 h-4 mr-2" />
                  Denunciar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Descrição */}
        {forum.description && (
          <p className="text-sm text-muted-foreground">{forum.description}</p>
        )}

        {/* Estatísticas e Atividade */}
        <div className="grid grid-cols-2 gap-6">
          {/* Coluna Esquerda - Estatísticas */}
          <div className="flex justify-between items-center gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-2">
                  <span className="text-sm font-medium">Atividade Diária</span>
                  <span className="text-sm text-muted-foreground">{forum.stats.dailyActivity}%</span>
                </div>
                <Progress value={forum.stats.dailyActivity} className="h-2" />
                                      {/* Coluna Direita - Próximos Eventos */}
                <div className="flex gap-2 mr-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Próximos Eventos
                    </h3>
                    {forum.nextEvents ? (
                    <div className="space-y-2">
                        {forum.nextEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                            </div>
                            <Badge variant="secondary">
                            {event.participants} participantes
                            </Badge>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-sm text-muted-foreground">Nenhum evento programado</p>
                    )}
                </div>
              </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <Eye className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-lg font-bold">{forum.stats.onlineNow}</span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <MessageSquare className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-lg font-bold">{forum.stats.posts}</span>
                <span className="text-xs text-muted-foreground">Posts</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <Sparkles className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-lg font-bold">{forum.moderators?.length || 0}</span>
                <span className="text-xs text-muted-foreground">Mods</span>
              </div>
            </div>
        </div>
      </CardHeader>
    </Card>
  )
} 