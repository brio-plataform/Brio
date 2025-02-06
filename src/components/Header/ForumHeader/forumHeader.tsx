import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ForumHeaderProps {
  name: string
  description: string
  image: string
  banner?: string
  memberCount: number
  postCount: number
}

export function ForumHeader({ name, description, image, banner, memberCount, postCount }: ForumHeaderProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        {banner && (
          <div className="relative h-48 mb-4">
            {banner ? (
              <img src={banner || "/placeholder.svg"} alt={`${name} banner`} className="w-full h-full object-cover" />
            ) : (
              <img src="/default-banner.jpg" alt="Default forum banner" className="w-full h-full object-cover" />
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <p className="text-muted-foreground mb-4">{description}</p>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-semibold">{memberCount.toLocaleString()}</span> members
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{postCount.toLocaleString()}</span> posts
                </div>
                <Button>Join Community</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}