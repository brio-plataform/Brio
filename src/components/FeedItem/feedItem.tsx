"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ThumbsUp,
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
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Modal } from "@/components/Modal/modal"
import { Comment } from "@/components/Comment/comment"
import { LinkPreview } from "@/components/LinkPreview/linkPreview"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"

interface Citation {
  type: "person" | "article" | "post" | "media"
  content: string
  link: string
}

interface CommentType {
  id: string
  author: {
    name: string
    avatar: string
    institution?: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: CommentType[]
}

export interface FeedItemProps {
  author: {
    name: string
    avatar: string
    institution?: string
  }
  title: string
  content: {
    summary: string
    full: string
  }
  tags: string[]
  likes: number
  comments: CommentType[]
  forks: number
  citations: number
  references: Citation[]
  links?: Array<{
    url: string
    title: string
    description: string
    image?: string
  }>
  timestamp: Date
}

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [allComments, setAllComments] = useState(comments)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
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
        author={comment.author}
        content={comment.content}
        timestamp={comment.timestamp}
        likes={comment.likes}
        replies={comment.replies.length}
        level={level}
      >
        {comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
      </Comment>
    ))
  }

  return (
    <>
      <Card className="w-full max-w-7xl mb-4 bg-muted/30">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-gray-500 text-muted-foreground">{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{author.name}</h3>
              {author.institution && <span className="text-sm text-muted-foreground">• {author.institution}</span>}
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
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
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
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
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
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn("transition-colors", isLiked && "text-blue-500 [&>svg]:fill-blue-500")}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {likeCount}
              </Button>
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
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                Read More
              </Button>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          <span className="font-semibold">Author:</span> {author.name}
          {author.institution && <span> ({author.institution})</span>}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {content.full.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {references.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">References & Citations:</h3>
            <ul className="list-disc pl-5">
              {references.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {ref.content} ({ref.type})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  )
}

