import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  MapPin,
  Users,
  FileText,
  BookOpen,
  TrendingUp,
  GraduationCap,
  Microscope,
  Award,
  Globe,
  CheckCircle,
  MoreVertical,
  ExternalLink,
  UserPlus,
  Trophy,
  Share2,
  Flag,
  Bookmark,
  Book,
  Check,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ReactNode } from "react"

interface InstitutionalProfileSmallProps {
  institution: {
    id: string
    name: string
    avatar: string
    type: 'university' | 'research' | 'company' | 'ngo'
    verified?: boolean
    description?: string
    location?: string
    link?: string
    stats: {
      researchers: number
      publications: number
      citations: number
      ranking?: number
    }
    researchAreas?: string[]
    achievements?: {
      type: 'award' | 'ranking' | 'certification'
      title: string
      year: number
    }[]
    collaborations?: Array<{
      id: string
      name: string
      avatar: string
      type: 'university' | 'research' | 'company' | 'ngo'
    }>
    isFollowing: boolean
    isMember: boolean
  }
  onFollow: () => void
  onJoin: () => void
  onVisit?: () => void
  className?: string
}

export function InstitutionalProfileSmall({ 
  institution, 
  onFollow, 
  onJoin,
  onVisit, 
  className 
}: InstitutionalProfileSmallProps) {
  const getInstitutionIcon = (type: string) => {
    switch (type) {
      case 'university': return <GraduationCap className="h-5 w-5" />
      case 'research': return <Microscope className="h-5 w-5" />
      case 'company': return <Building2 className="h-5 w-5" />
      case 'ngo': return <Globe className="h-5 w-5" />
      default: return <Building2 className="h-5 w-5" />
    }
  }

  return (
    <div className={`w-full flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/5 transition-colors ${className}`}>
      {/* Coluna Principal: Avatar + Info */}
      <div className="flex gap-3 flex-1 min-w-0">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={institution.avatar} alt={institution.name} />
          <AvatarFallback>{getInstitutionIcon(institution.type)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0 gap-0.5">
          {/* Header: Nome + Verificação */}
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{institution.name}</span>
            {institution.verified && (
              <Badge variant="secondary" className="flex-shrink-0 flex items-center gap-1 text-xs">
                <CheckCircle className="h-3 w-3" />
                Verificada
              </Badge>
            )}
          </div>

          {/* Subheader: Tipo + Localização */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span className="capitalize">{institution.type}</span>
            </div>
            {institution.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{institution.location}</span>
              </div>
            )}
          </div>

          {/* Descrição */}
          {institution.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {institution.description}
            </p>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{institution.stats.researchers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>{institution.stats.publications.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{institution.stats.citations.toLocaleString()}</span>
            </div>
            {institution.stats.ranking && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span className="text-xs">#{institution.stats.ranking}</span>
              </Badge>
            )}
          </div>

          {/* Areas + Achievements */}
          <div className="flex items-center gap-2 mt-1">
            {/* Research Areas */}
            <div className="flex items-center gap-1">
              {institution.researchAreas?.slice(0, 2).map((area) => (
                <Badge key={area} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
              {institution.researchAreas && institution.researchAreas.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{institution.researchAreas.length - 2}
                </Badge>
              )}
            </div>

            {/* Achievements */}
            {institution.achievements && (
              <div className="flex items-center gap-1">
                {institution.achievements.slice(0, 1).map((achievement) => (
                  <Badge key={achievement.title} variant="secondary" className="flex items-center gap-1">
                    {getAchievementIcon(achievement.type)}
                    <span className="text-xs">{achievement.title}</span>
                  </Badge>
                ))}
                {institution.achievements.length > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    +{institution.achievements.length - 1}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button 
          variant={institution.isFollowing ? "secondary" : "outline"} 
          size="sm" 
          className="flex items-center gap-2"
          onClick={onFollow}
        >
          {institution.isFollowing ? (
            <><Check className="h-4 w-4" />Seguindo</>
          ) : (
            <><UserPlus className="h-4 w-4" />Seguir</>
          )}
        </Button>
        
        <Button 
          variant={institution.isMember ? "secondary" : "default"}
          size="sm" 
          className="flex items-center gap-2"
          onClick={onJoin}
        >
          {institution.isMember ? (
            <><GraduationCap className="h-4 w-4" />Membro</>
          ) : (
            <><GraduationCap className="h-4 w-4" />Juntar-se</>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onVisit && (
              <DropdownMenuItem>
                <ExternalLink className="w-4 h-4 mr-2" />
                Visitar Site
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="w-4 h-4 mr-2" />
              Salvar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="w-4 h-4 mr-2" />
              Ver Pesquisadores
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Book className="w-4 h-4 mr-2" />
              Ver Publicações
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GraduationCap className="w-4 h-4 mr-2" />
              Ver Projetos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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

// Função auxiliar para ícones de conquistas
function getAchievementIcon(type: string) {
  switch (type) {
    case 'award':
      return <Award className="h-3 w-3 text-yellow-500" />;
    case 'ranking':
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    case 'certification':
      return <CheckCircle className="h-3 w-3 text-blue-500" />;
    default:
      return <Trophy className="h-3 w-3 text-purple-500" />;
  }
}

// Componente auxiliar para estatísticas
function StatCard({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
      {icon}
      <span className="font-semibold mt-1">{value.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
} 