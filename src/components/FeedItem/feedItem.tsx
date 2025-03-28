"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  GitBranch,
  BookOpen,
  Share2,
  Link,
  ImageIcon,
  FileText,
  User,
  Send,
  MoreHorizontal,
  UserPlus,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Comment } from "@/components/Comment/comment"
import { LinkPreview } from "@/components/LinkPreview/linkPreview"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FeedItemProps, CommentType, Citation } from './types'

export function FeedItem({
  author,
  title,
  content,
  tags,
  likes,
  comments,
  forks,
  citations,
  references,
  links,
  timestamp,
}: FeedItemProps) {
  const [likeCount, setLikeCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isDesLiked, setIsDesLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [allComments, setAllComments] = useState(comments)

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: CommentType = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        institution: "Your Institution",
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    }

    setAllComments([comment, ...allComments])
    setNewComment("")
  }

  const handleReplyToComment = (commentId: string, content: string) => {
    const newReply: CommentType = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        institution: "Your Institution",
      },
      content: content,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    }

    const addReplyToComment = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [newReply, ...(comment.replies || [])]
          }
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          }
        }
        return comment
      })
    }

    setAllComments(addReplyToComment(allComments))
  }

  const getCitationIcon = (type: Citation["type"]) => {
    switch (type) {
      case "person":
        return <User className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "post":
        return <MessageSquare className="h-4 w-4" />
      case "media":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <Link className="h-4 w-4" />
    }
  }

  const renderComments = (commentsToRender: CommentType[], level = 0) => {
    return commentsToRender.map((comment) => (
      <Comment
        key={comment.id}
        id={comment.id}
        author={comment.author}
        content={comment.content}
        timestamp={comment.timestamp}
        likes={comment.likes || 0}
        replies={comment.replies?.length || 0}
        level={level}
        onReply={handleReplyToComment}
      >
        {comment.replies && comment.replies.length > 0 && 
          renderComments(comment.replies, level + 1)}
      </Comment>
    ))
  }

  return (
    <>
      <Card className="w-full max-w-7xl bg-muted/30 ">
        <CardHeader className="flex flex-row items-center gap-4">

          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-gray-500 text-muted-foreground">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <HoverCard>
                <div className="flex items-center gap-3">
                  <div className="space-y-0.5">
                    <HoverCardTrigger asChild>
                      <button 
                        onClick={() => window.location.href = `/profile/${author.id}`}
                        className="text-md font-medium hover:underline"
                      >
                        {author.name}
                      </button>
                    </HoverCardTrigger>
                  </div>
                </div>
                <HoverCardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{author.name}</p>
                        {author.institution?.name && (
                          <p className="text-xs text-muted-foreground">
                            {author.institution.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Button variant="ghost" className="text-muted-foreground hover:text-white">
                            <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Researcher at <strong className="font-medium text-foreground">{author.institution?.name}</strong>.
                      {/* Você pode adicionar uma bio aqui se tiver essa informação */}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {/* Exemplo de amigos mútuos - você precisará adicionar esses dados */}
                        <Avatar className="h-5 w-5 ring-1 ring-background">
                          <AvatarImage src="/avatar-20-04.jpg" alt="Friend 01" />
                        </Avatar>
                        <Avatar className="h-5 w-5 ring-1 ring-background">
                          <AvatarImage src="/avatar-20-05.jpg" alt="Friend 02" />
                        </Avatar>
                        <Avatar className="h-5 w-5 ring-1 ring-background">
                          <AvatarImage src="/avatar-20-06.jpg" alt="Friend 03" />
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground">3 mutual friends</div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {author.institution && (
                <>
                  <span className="text-sm text-muted-foreground">•</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto text-sm text-muted-foreground hover:text-white p-1"
                      >
                        {author.institution.name}
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/institutions/${author.institution.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={author.institution.name} />
                            <AvatarFallback>{author.institution.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{author.institution.name}</h4>
                            <p className="text-xs text-muted-foreground">Research Institution</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>2.5k Researchers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>10k Publications</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => window.location.href = author.institution!.link}
                        >
                          View Institution Profile
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(timestamp).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Salvar</DropdownMenuItem>
              <DropdownMenuItem>Copiar link</DropdownMenuItem>
              <DropdownMenuItem>Reportar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex items-start justify-start gap-4">
          <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            {content.summary.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {links &&
            links.map((link, index) => (
              <div key={index} className="mb-4">
                <LinkPreview {...link} />
              </div>
            ))}
          {references.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-semibold mb-2">References & Citations:</h4>
              <div className="flex flex-wrap gap-2">
                {references.map((ref, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {getCitationIcon(ref.type)}
                          <span className="ml-1">{ref.content}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {ref.type.charAt(0).toUpperCase() + ref.type.slice(1)}: {ref.content}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={handleLike}>
                  <ArrowBigUp className={cn("w-5 h-5 transition-colors", isLiked && "text-blue-500 [&>svg]:fill-blue-500")} />
                </Button>
                <span className="font-bold">{likeCount}</span>
                <Button variant="ghost" size="sm" onClick={handleDesLike}>
                  <ArrowBigDown className={cn("w-5 h-5 transition-colors", isDesLiked && "text-red-500 [&>svg]:fill-red-500")} />
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                {allComments.length}
              </Button>
              <Button variant="ghost" size="sm">
                <GitBranch className="w-4 h-4 mr-2" />
                {forks}
              </Button>
              <Button variant="ghost" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {citations}
              </Button>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                  <DropdownMenuItem>Share to Community</DropdownMenuItem>
                  <DropdownMenuItem>Cite This Work</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {showComments && (
            <div className="w-full border-t pt-4">
              <form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
                  <AvatarFallback className="bg-gray-500 text-muted-foreground">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="min-h-[2.5rem] py-2"
                  />
                  <Button type="submit" size="icon" disabled={!newComment.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              <div className="space-y-4">{renderComments(allComments)}</div>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  )
}

