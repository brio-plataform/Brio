import { useState, type ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Send, ArrowBigDown, ArrowBigUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { CommentProps, CommentMetrics, CommentState } from './types'
import { cn } from "@/lib/utils"

export function Comment({
  id,
  author,
  content,
  timestamp,
  likes,
  replies,
  level,
  onReply,
  onShare,
  onReport,
  children
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isDesLiked, setIsDesLiked] = useState(false)
  // Estado local
  const [metrics, setMetrics] = useState<CommentMetrics>({
    likes: likes,
    replies: replies,
    isLiked: false,
    isDesLiked: false
  })
  
  const [state, setState] = useState<CommentState>({
    isReplying: false,
    showReplies: false,
    replyContent: ""
  })

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!state.replyContent.trim()) return
    
    onReply(id, state.replyContent)
    setState((prev: CommentState) => ({
      ...prev,
      replyContent: "",
      isReplying: false,
      showReplies: true
    }))
  }

  const toggleReplying = () => {
    setState((prev: CommentState) => ({
      ...prev,
      isReplying: !prev.isReplying
    }))
  }

  const toggleShowReplies = () => {
    setState((prev: CommentState) => ({
      ...prev,
      showReplies: !prev.showReplies
    }))
  }

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else if (isDesLiked) {
      setLikeCount(likeCount + 1)
      setIsDesLiked(false)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleDesLike = () => {
    if (isDesLiked) {
      setLikeCount(likeCount + 1)
    } else if (isLiked) {
      setLikeCount(likeCount - 1)
      setIsLiked(false)
    } else {
      setLikeCount(likeCount - 1)
    }
    setIsDesLiked(!isDesLiked)
  }

  if (level > 7) return null // Limit nesting depth

  return (
    <div className="group">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-gray-500 text-muted-foreground">
            {author.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 gap-2">
          <div className="rounded-lg px-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{author.name}</span>
              {author.institution && (
                <span className="text-xs text-muted-foreground">• {author.institution}</span>
              )}
              <span className="text-xs text-muted-foreground">
                • {formatDistanceToNow(timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleLike}>
                <ArrowBigUp className={cn("w-5 h-5 transition-colors", isLiked && "text-blue-500 fill-blue-500")} />
              </Button>
                <span className="font-bold">{likeCount}</span>
              <Button variant="ghost" size="sm" onClick={handleDesLike}>
                <ArrowBigDown className={cn("w-5 h-5 transition-colors", isDesLiked && "text-red-500 fill-red-500")} />
              </Button>
            </div>
            {metrics.replies > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={toggleShowReplies}
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span className="text-xs">{metrics.replies} replies</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={onShare}
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Share</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={toggleReplying}
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Reply</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onReport}>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {state.isReplying && (
        <form onSubmit={handleSubmitReply} className="flex gap-3 mt-3 ml-11">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input
              value={state.replyContent}
              onChange={(e) => setState(prev => ({
                ...prev,
                replyContent: e.target.value
              }))}
              placeholder="Write a reply..."
              className="min-h-[2.5rem] py-2"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!state.replyContent.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {state.showReplies && children && (
        <div className={`ml-11 mt-3 space-y-3 ${level > 0 ? "pl-3 border-l" : ""}`}>
          {children}
        </div>
      )}
    </div>
  )
}