"use client"

import { useState, useRef, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Underline,
  LinkIcon,
  ImageIcon,
  FileText,
  AtSign,
  Smile,
  Calendar,
  Paperclip,
  X,
  Minus,
  Maximize2,
  Trash2,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface Mention {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  institution: string
  mutualConnections?: {
    name: string
    avatar: string
  }[]
}

interface Attachment {
  id: string
  name: string
  size: string
  type: string
  icon: string
}

interface Template {
  id: string
  name: string
  description: string
}

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

function UserTooltip({ user }: UserTooltipProps) {
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

const MAX_TITLE_LENGTH = 100

export function CreatePost() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showMentions, setShowMentions] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mentions: Mention[] = [
    {
      id: "1",
      name: "Anna Sosnovich",
      username: "annasos",
      email: "anna.s@university.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Researcher in Human-Computer Interaction. Working on innovative UI/UX solutions.",
      institution: "Harvard University",
      mutualConnections: [
        { name: "John Doe", avatar: "/placeholder.svg?height=20&width=20" },
        { name: "Jane Smith", avatar: "/placeholder.svg?height=20&width=20" },
        { name: "Mike Johnson", avatar: "/placeholder.svg?height=20&width=20" },
      ],
    },
    {
      id: "2",
      name: "Adam Dan",
      username: "adamdan",
      email: "adam.dan@research.org",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "AI Research Scientist. Focusing on machine learning and neural networks.",
      institution: "MIT",
      mutualConnections: [
        { name: "Sarah Wilson", avatar: "/placeholder.svg?height=20&width=20" },
        { name: "Tom Brown", avatar: "/placeholder.svg?height=20&width=20" },
      ],
    },
  ]

  const templates: Template[] = [
    {
      id: "1",
      name: "Research Proposal",
      description: "Template for academic research proposals",
    },
    {
      id: "2",
      name: "Literature Review",
      description: "Template for literature review submissions",
    },
  ]

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
        type: file.type,
        icon: file.type.startsWith("image/") ? "image" : "file",
      }))
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id))
  }

  const insertMention = useCallback((mention: Mention) => {
    const mentionText = `@${mention.name} `
    setContent((prev) => {
      const beforeCursor = prev.slice(0, prev.length)
      return beforeCursor + mentionText
    })
    setShowMentions(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "@") {
      setShowMentions(true)
    }
  }, [])

  return (
    <Card className="w-full max-w-7xl mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-muted-foreground h-12 px-4">
                Comece uma publicação acadêmica...
              </Button>
            </DialogTrigger>
            <DialogContent
              className={`sm:max-w-2xl ${isExpanded ? "w-screen h-screen !max-w-full !rounded-none" : ""}`}
            >
              <DialogHeader>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">De:</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Select defaultValue="default">
                          <SelectTrigger className="border-0 p-0 hover:bg-accent hover:text-accent-foreground">
                            <SelectValue placeholder="Selecione o email" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">user@university.edu</SelectItem>
                            <SelectItem value="alt">alt@university.edu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <Minus className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Título da sua publicação"
                      value={title}
                      onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                      className="text-lg font-semibold"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {title.length}/{MAX_TITLE_LENGTH}
                    </span>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative">
                  <Textarea
                    placeholder="Compartilhe seu conhecimento..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 p-1 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="text-xs mr-1">Text</span>
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <span className="text-sm">Parágrafo</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span className="text-xl font-semibold">Título 1</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span className="text-lg font-semibold">Título 2</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span className="text-base font-semibold">Título 3</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bold className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Negrito (⌘+B)</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Italic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Itálico (⌘+I)</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Underline className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Sublinhado (⌘+U)</TooltipContent>
                      </Tooltip>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <AlignLeft className="h-4 w-4 mr-2" />
                            Alinhar à esquerda
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlignCenter className="h-4 w-4 mr-2" />
                            Centralizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlignRight className="h-4 w-4 mr-2" />
                            Alinhar à direita
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <List className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Lista</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Inserir link (⌘+K)</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setShowMentions(!showMentions)}
                          >
                            <AtSign className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Mencionar alguém (@)</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Emoji</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {showMentions && (
                    <div className="absolute bottom-14 left-2 w-64 bg-background border rounded-lg shadow-lg p-2 space-y-1">
                      {mentions.map((mention) => (
                        <HoverCard key={mention.id}>
                          <HoverCardTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start px-2 py-1.5 h-auto"
                              onClick={() => insertMention(mention)}
                            >
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={mention.avatar} />
                                <AvatarFallback>{mention.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">{mention.name}</span>
                                <span className="text-xs text-muted-foreground">{mention.email}</span>
                              </div>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent side="left" align="start" className="p-0">
                            <UserTooltip
                              user={{
                                name: mention.name,
                                username: mention.username,
                                avatar: mention.avatar,
                                bio: mention.bio,
                                institution: mention.institution,
                                mutualConnections: mention.mutualConnections,
                              }}
                            />
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </div>
                  )}
                </div>
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file) => (
                      <div key={file.id} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/50">
                        {file.icon === "image" ? (
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="flex-1 text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeAttachment(file.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleAttachment}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Usar template</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {templates.map((template) => (
                        <DropdownMenuItem key={template.id} onClick={() => setSelectedTemplate(template.id)}>
                          <div className="flex flex-col">
                            <span>{template.name}</span>
                            <span className="text-xs text-muted-foreground">{template.description}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    Agendar
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button type="submit" size="sm" disabled={!title.trim() || !content.trim()}>
                    Publicar agora
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2 mt-4 border-t pt-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            Texto
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
            Mídia
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <LinkIcon className="h-5 w-5 mr-2 text-green-500" />
            Link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

