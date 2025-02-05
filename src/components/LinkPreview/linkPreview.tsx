import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface LinkPreviewProps {
  url: string
  title: string
  description: string
  image?: string
}

export function LinkPreview({ url, title, description, image }: LinkPreviewProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block no-underline">
      <Card className="overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <CardContent className="p-4 flex gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 truncate">{title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">{url}</p>
          </div>
          {image && (
            <div className="flex-shrink-0">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  )
}