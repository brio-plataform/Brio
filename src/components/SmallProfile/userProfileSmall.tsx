import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  MessageSquare,
  BookOpen,
  Users,
  School,
  Building2,
  MapPin,
  CheckCircle,
  MoreVertical,
  Share2,
  Ban,
  Flag,
  FileText,
  Bookmark,
  Star,
  Award,
  GraduationCap,
  Trophy,
  GitFork,
  Book,
  Check,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SmallProfileProps {
  user: {
    id: string
    name: string
    avatar: string
    role?: string
    bio?: string
    verified?: boolean
    institution?: {
      name: string
      type: 'university' | 'research' | 'company' | 'ngo'
      location?: string
    }
    stats?: {
      publications: number
      citations: number
      followers: number
    }
    mutualConnections?: Array<{
      id: string
      name: string
      avatar: string
    }>
    areas?: string[]
    username: string
    location?: string
    badges?: Array<{
      id: string
      name: string
      type: string
    }>
    isFollowing: boolean
  }
  onFollow: () => void
  onMessage: () => void
  className?: string
}

export function UserProfileSmall({ user, onFollow, onMessage, className }: SmallProfileProps) {
  return (
    <div className={`w-full flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/5 transition-colors ${className}`}>
      {/* Coluna Principal: Avatar + Info */}
      <div className="flex gap-3 flex-1 min-w-0">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0 gap-0.5">
          {/* Header: Nome + Verificação */}
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{user.name}</span>
            <span className="truncate text-sm text-muted-foreground">@{user.username}</span>
            {user.verified && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />}

            {/* Subheader: Username + Role */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {user.role && <span className="truncate">• {user.role} • </span>}
                {/* Stats */}
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{user.stats?.publications}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{user.stats?.citations}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{user.stats?.followers}</span>
                    </div>
                </div>
            </div>

          </div>



          {/* Info Row: Institution + Location + Stats */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {/* Institution + Location */}
            <div className="flex items-center gap-2">
              {user.institution && (
                <div className="flex items-center gap-1">
                  <School className="h-3 w-3" />
                  <span className="truncate">{user.institution.name}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
                {user.badges?.slice(0, 3).map((badge) => (
                <Badge key={badge.id} variant="secondary" className="flex items-center gap-1">
                    {getBadgeIcon(badge.type)}
                    <span className="text-xs">{badge.name}</span>
                </Badge>
                ))}
                {user.badges && user.badges.length > 3 && (
                    <Badge variant="secondary" className="text-xs">+{user.badges.length - 3}</Badge>
                )}
            </div>

          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button 
          variant={user.isFollowing ? "secondary" : "outline"} 
          size="sm" 
          onClick={onFollow}
          className="flex items-center gap-2"
        >
          {user.isFollowing ? (
            <><Check className="h-4 w-4" />Seguindo</>
          ) : (
            <><UserPlus className="h-4 w-4" />Seguir</>
          )}
        </Button>

        <Button 
          variant="default"
          size="sm" 
          onClick={onMessage}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Mensagem</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
              <GitFork className="w-4 h-4 mr-2" />
              Ver Projetos
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Book className="w-4 h-4 mr-2" />
              Ver Publicações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Ban className="w-4 h-4 mr-2" />
              Bloquear
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Flag className="w-4 h-4 mr-2" />
              Denunciar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Função auxiliar para ícones de badges
function getBadgeIcon(type: string) {
  switch (type) {
    case 'top-contributor':
      return <Star className="h-3 w-3 text-yellow-500" />;
    case 'expert':
      return <Award className="h-3 w-3 text-blue-500" />;
    case 'mentor':
      return <GraduationCap className="h-3 w-3 text-green-500" />;
    default:
      return <Trophy className="h-3 w-3 text-purple-500" />;
  }
}
