import { useState, type ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { CommentProps, CommentMetrics, CommentState } from "@/types/types"

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
  // Estado local
  const [metrics, setMetrics] = useState<CommentMetrics>({
    likes: likes,
    replies: replies,
    isLiked: false
  })
  
  const [state, setState] = useState<CommentState>({
    isReplying: false,
    showReplies: false,
    replyContent: ""
  })

  // Handlers
  const handleLike = () => {
    setMetrics((prev: CommentMetrics) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

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
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={handleLike}
            >
              <ThumbsUp className={`h-4 w-4 mr-1.5 ${metrics.isLiked ? "text-blue-500 fill-blue-500" : ""}`} />
              <span className="text-xs">{metrics.likes}</span>
            </Button>
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