import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserTooltipProps {
    user: {
      name: string
      username: string
      avatar: string
      bio: string
      institution: string
      mutualConnections?: {
        avatar: string
        name: string
      }[]
    }
  }
  
  export default function UserTooltip({ user }: UserTooltipProps) {
    return (
      <div className="w-full rounded-lg bg-background border shadow-lg p-4 space-y-3">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{user.name}</h4>
            <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm">{user.bio}</p>
          <p className="text-sm text-muted-foreground">{user.institution}</p>
        </div>
        {user.mutualConnections && user.mutualConnections.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {user.mutualConnections.map((connection, i) => (
                <Avatar key={i} className="h-5 w-5 border-2 border-background">
                  <AvatarImage src={connection.avatar} />
                  <AvatarFallback>{connection.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{user.mutualConnections.length} conexões em comum</span>
          </div>
        )}
      </div>
    )
  }