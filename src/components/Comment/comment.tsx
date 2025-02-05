import { useState, type ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentProps {
  author: {
    name: string
    avatar: string
    institution?: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: number
  level?: number
  children?: ReactNode
}

export function Comment({
  author,
  content,
  timestamp,
  likes: initialLikes,
  replies,
  level = 0,
  children,
}: CommentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  if (level > 3) return null // Limit nesting depth

  return (
    <div className="group">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-gray-500 text-muted-foreground">{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className=" rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{author.name}</span>
              {author.institution && <span className="text-xs text-muted-foreground">• {author.institution}</span>}
              <span className="text-xs text-muted-foreground">
                • {formatDistanceToNow(timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleLike}>
              <ThumbsUp className={`h-4 w-4 mr-1.5 ${isLiked ? "text-blue-500 fill-blue-500" : ""}`} />
              <span className="text-xs">{likesCount}</span>
            </Button>
            {replies > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setShowReplies(!showReplies)}>
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span className="text-xs">{replies} replies</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Share2 className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Share</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {showReplies && children && (
        <div className={`ml-11 mt-3 space-y-3 ${level > 0 ? "pl-3 border-l" : ""}`}>{children}</div>
      )}
    </div>
  )
}