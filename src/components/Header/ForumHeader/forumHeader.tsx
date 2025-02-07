import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BannerCarousel } from "@/components/Banner/banner"
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { BadgeCheck } from "lucide-react"

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
    <Card className="w-full p-5">
      <BannerCarousel />
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
              <h1 className="text-3xl font-bold mb-2 gap-2 flex items-center">{name} <BadgeCheck className="w-7 h-7 text-primary" /></h1>
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
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <Tabs defaultValue="departments" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="departments">Departamentos</TabsTrigger>
                <TabsTrigger value="research">Centros de Pesquisa</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
              </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}