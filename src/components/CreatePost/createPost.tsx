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
  X,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  MessageSquare,
  Upload,
  Layout,
  HelpCircle,
  Vote,
  Users,
  Globe,
  MapPin,
  FileIcon,
  Link2Icon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import DatePickerRange from "@/components/ui/datePickerRange"
import { Label } from "@/components/ui/label"
import { DateRange } from "react-day-picker"
import {
  QuestionType,
  PollOption,
  Mention,
  Attachment,
  Template,
  MAX_TITLE_LENGTH,
  MAX_TAGS,
  CreatePostProps,
  CreatePostState,
  CreatePostDialogState,
  PostType,
  ReferenceType,
  Reference
} from './types'
import { cn } from "@/lib/utils"
import {
  MOCK_REFERENCES,
  MOCK_STUDY_TABS,
  MOCK_DEBATE_CONFIG 
} from './mockData'

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

export function CreatePost({
  user,
  placeholder = "O que você está pensando?",
  showMediaButton = true,
  showFileButton = true,
  showLinkButton = true,
  customActions,
  className,
  onSubmit,
  onMediaAdd,
  onFileAdd,
  onLinkAdd,
  img = "/images/placeholder.svg"
}: CreatePostProps) {
  const initialState: CreatePostState = {
    postType: 'text',
    title: '',
    content: '',
    tags: [],
    currentTag: '',
    references: [],
    currentReference: '',
    referenceType: 'profile',
    isSubmitting: false,
    isUploadingMedia: false,
    isUploadingFile: false,
    showLinkModal: false,
    linkUrl: ''
  }

  const [state, setState] = useState<CreatePostState>(initialState)
  const [dialogState, setDialogState] = useState<CreatePostDialogState>({
    isOpen: false,
    isSubmitting: false
  })
  
  const [postType, setPostType] = useState<PostType>('text')
  const [title, setTitle] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [references, setReferences] = useState<Reference[]>([])
  const [currentReference, setCurrentReference] = useState('')
  const [referenceType, setReferenceType] = useState<ReferenceType>('profile')
  const [eventDate, setEventDate] = useState<DateRange | undefined>();
  const [questionType, setQuestionType] = useState<QuestionType>('question');
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);
  const [debateTopics, setDebateTopics] = useState<string[]>(['', '']);

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

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileAdd) {
      setState(prev => ({ ...prev, isUploadingFile: true }))
      try {
        await onFileAdd(file)
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setState(prev => ({ ...prev, isUploadingFile: false }))
      }
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id))
  }

  const insertMention = useCallback((mention: Mention) => {
    const mentionText = `@${mention.name} `
    setState(prev => ({ ...prev, content: prev.content + mentionText }))
    setShowMentions(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "@") {
      setShowMentions(true)
    }
  }, [])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (tags.length >= MAX_TAGS) return
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddReference = () => {
    if (!currentReference.trim()) return
    
    let newReference: Reference;
    
    switch (referenceType) {
      case 'profile':
        newReference = {
          id: crypto.randomUUID(),
          type: 'profile',
          content: currentReference,
          username: currentReference.replace('@', '')
        }
        break;
        
      case 'document':
        newReference = {
          id: crypto.randomUUID(),
          type: 'document',
          content: currentReference,
          fileName: currentReference,
          fileSize: '0 KB'
        }
        break;
        
      case 'comment':
        newReference = {
          id: crypto.randomUUID(),
          type: 'comment',
          content: currentReference,
          author: 'Unknown',
          preview: currentReference
        }
        break;
        
      default:
        return;
    }
    
    setReferences([...references, newReference])
    setCurrentReference('')
  }

  const removeReference = (id: string) => {
    setReferences(references.filter((ref) => ref.id !== id))
  }

  const renderReferenceItem = (ref: Reference) => {
    switch (ref.type) {
      case 'profile':
        return (
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <Avatar className="h-8 w-8">
              <AvatarImage src={ref.avatar || ''} />
              <AvatarFallback>{ref.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">@{ref.username}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setReferences(references.filter(r => r.id !== ref.id))
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )

      case 'document':
        return (
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <FileText className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium">Documento anexado</p>
              <p className="text-sm text-muted-foreground">{ref.content}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeReference(ref.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )

      case 'comment':
        return (
          <div className="flex items-start gap-3 p-2 rounded-md bg-muted/50">
            <MessageSquare className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <p className="text-sm">Comentário vinculado</p>
              <a 
                href={ref.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                {ref.content}
              </a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeReference(ref.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
    }
  }

  const handleSubmit = async () => {
    if (!state.content.trim() || state.isSubmitting) return

    setState(prev => ({ ...prev, isSubmitting: true }))
    try {
      await onSubmit?.(state.content)
      setState(prev => ({ ...prev, content: "" }))
    } catch (error) {
      console.error("Erro ao enviar post:", error)
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }))
    }
  }

  return (
    <Card className={cn("w-full max-w-7xl", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage 
              src={typeof img === 'string' ? img : img.src} 
              alt="Avatar" 
            />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <Dialog open={dialogState.isOpen} onOpenChange={(isOpen) => {
            setDialogState({ ...dialogState, isOpen })
            if (!isOpen) {
              setPostType('text')
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-muted-foreground h-12 px-4">
                {placeholder}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              {postType === 'text' && (
                <div>
                  <DialogHeader>
                    <div className="flex flex-col space-y-4">
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
                      <div className="flex flex-wrap gap-2 items-center">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm"
                          >
                            #{tag}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Input
                          placeholder="Adicione tags (pressione Enter)"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleAddTag}
                          className="flex-1 min-w-[200px]"
                        />
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="relative">
                      <Textarea
                        placeholder="Compartilhe seu conhecimento..."
                        value={state.content}
                        onChange={(e) => setState(prev => ({ ...prev, content: e.target.value }))}
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
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Referências & Citações</h4>
                      <Select value={referenceType} onValueChange={(value) => setReferenceType(value as ReferenceType)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Tipo de referência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="profile">
                            <div className="flex items-center gap-2">
                              <AtSign className="h-4 w-4" />
                              <span>Perfil</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="document">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Documento</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="comment">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              <span>Comentário</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {referenceType === 'profile' && (
                          <Input 
                            placeholder="Digite o @ do perfil"
                            value={currentReference}
                            onChange={(e) => setCurrentReference(e.target.value)}
                          />
                        )}
                        {referenceType === 'comment' && (
                          <Input 
                            placeholder="Cole o link do comentário"
                            value={currentReference}
                            onChange={(e) => setCurrentReference(e.target.value)}
                          />
                        )}
                        {(referenceType === 'document') && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleAttachment}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Fazer upload de {referenceType === 'document' ? 'documento' : 'imagem'}
                          </Button>
                        )}
                        {(referenceType === 'profile' || referenceType === 'comment') && (
                          <Button 
                            onClick={handleAddReference}
                            disabled={!currentReference.trim()}
                          >
                            Adicionar
                          </Button>
                        )}
                      </div>
                      {references.map((ref) => (
                        <div key={ref.id}>{renderReferenceItem(ref)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {postType === 'study' && (
                <div className="space-y-6">
                  <DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Título do seu estudo"
                          value={title}
                          onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                          className="text-lg font-semibold"
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {title.length}/{MAX_TITLE_LENGTH}
                        </span>
                      </div>
                      
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                          <TabsTrigger value="methodology">Metodologia</TabsTrigger>
                          <TabsTrigger value="results">Resultados</TabsTrigger>
                          <TabsTrigger value="discussion">Discussão</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label>Resumo</Label>
                              <Textarea 
                                placeholder="Descreva brevemente seu estudo..."
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Palavras-chave</Label>
                              <Input placeholder="Separe as palavras-chave por vírgula" />
                            </div>
                            <div className="space-y-2">
                              <Label>Área de Pesquisa</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a área" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sciences">Ciências Naturais</SelectItem>
                                  <SelectItem value="humanities">Humanidades</SelectItem>
                                  <SelectItem value="tech">Tecnologia</SelectItem>
                                  {/* Adicione mais áreas */}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="methodology" className="space-y-4">
                          {/* Conteúdo da aba de metodologia */}
                        </TabsContent>
                        
                        {/* Outras TabsContent... */}
                      </Tabs>
                    </div>
                  </DialogHeader>
                </div>
              )}

              {postType === 'question' && (
                <div className="space-y-6">
                  <DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <RadioGroup 
                        defaultValue="question" 
                        className="grid grid-cols-3 gap-2"
                        onValueChange={(value) => setQuestionType(value as QuestionType)}
                      >
                        <div>
                          <RadioGroupItem value="question" id="question" className="peer sr-only" />
                          <Label
                            htmlFor="question"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <HelpCircle className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Pergunta</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="poll" id="poll" className="peer sr-only" />
                          <Label
                            htmlFor="poll"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Vote className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Enquete</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="debate" id="debate" className="peer sr-only" />
                          <Label
                            htmlFor="debate"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Users className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Debate</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      <Input
                        placeholder={
                          questionType === 'question' 
                            ? "Sua pergunta aqui..." 
                            : questionType === 'poll' 
                            ? "Título da enquete..." 
                            : "Tema do debate..."
                        }
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                        className="text-lg font-semibold"
                      />
                      
                      {questionType === 'question' && (
                        <>
                          <Textarea 
                            placeholder="Adicione mais contexto à sua pergunta..."
                            className="min-h-[100px]"
                            value={state.content}
                            onChange={(e) => setState(prev => ({ ...prev, content: e.target.value }))}
                          />
                          
                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Permitir respostas anônimas</Label>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Notificar sobre novas respostas</Label>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </>
                      )}

                      {questionType === 'poll' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {pollOptions.map((option, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  placeholder={`Opção ${index + 1}`}
                                  value={option.text}
                                  onChange={(e) => {
                                    const newOptions = [...pollOptions];
                                    newOptions[index] = { ...option, text: e.target.value };
                                    setPollOptions(newOptions);
                                  }}
                                />
                                {index > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== index))}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setPollOptions([...pollOptions, { id: crypto.randomUUID(), text: '' }])}
                          >
                            Adicionar opção
                          </Button>

                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Permitir múltipla escolha</Label>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Mostrar resultados em tempo real</Label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Data limite para votação</Label>
                              <DatePickerRange />
                            </div>
                          </div>
                        </div>
                      )}

                      {questionType === 'debate' && (
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Descreva o contexto do debate..."
                            className="min-h-[100px]"
                            value={state.content}
                            onChange={(e) => setState(prev => ({ ...prev, content: e.target.value }))}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Posição A</Label>
                              <Input 
                                placeholder="Ex: A favor"
                                value={debateTopics[0]}
                                onChange={(e) => {
                                  const newTopics = [...debateTopics];
                                  newTopics[0] = e.target.value;
                                  setDebateTopics(newTopics);
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Posição B</Label>
                              <Input 
                                placeholder="Ex: Contra"
                                value={debateTopics[1]}
                                onChange={(e) => {
                                  const newTopics = [...debateTopics];
                                  newTopics[1] = e.target.value;
                                  setDebateTopics(newTopics);
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Moderação ativa</Label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Tempo limite para argumentos</Label>
                              <Input type="number" className="w-32" placeholder="5 min" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Duração do debate</Label>
                              <DatePickerRange />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogHeader>
                </div>
              )}

              {postType === 'event' && (
                <div className="space-y-6">
                  <DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <Input
                        placeholder="Nome do evento"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                        className="text-lg font-semibold"
                      />

                      <div className="space-y-2">
                        <Label>Data e Horário do Evento</Label>
                        <DatePickerRange 
                          value={eventDate}
                          onChange={setEventDate}
                          label="Selecione o período do evento"
                        />
                      </div>

                      <RadioGroup defaultValue="online" className="grid grid-cols-2 gap-2">
                        <div>
                          <RadioGroupItem value="online" id="online" className="peer sr-only" />
                          <Label
                            htmlFor="online"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Globe className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Online</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="presential" id="presential" className="peer sr-only" />
                          <Label
                            htmlFor="presential"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <MapPin className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Presencial</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      <Textarea 
                        placeholder="Descrição do evento..."
                        className="min-h-[100px]"
                      />

                      <div className="space-y-4 border-t pt-4">
                        <div className="flex items-center justify-between">
                          <Label>Limite de participantes</Label>
                          <Input type="number" className="w-32" placeholder="Ilimitado" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Requer inscrição</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Evento privado</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </DialogHeader>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {showMediaButton && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={state.isUploadingMedia}
                      onClick={() => {/* Implementar upload de mídia */}}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  )}
                  {showFileButton && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={state.isUploadingFile}
                      onClick={() => {/* Implementar upload de arquivo */}}
                    >
                      <FileIcon className="h-4 w-4" />
                    </Button>
                  )}
                  {showLinkButton && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setState(prev => ({ ...prev, showLinkModal: true }))}
                    >
                      <Link2Icon className="h-4 w-4" />
                    </Button>
                  )}
                  {customActions}
                </div>
                <Button 
                  onClick={handleSubmit}
                  disabled={!state.content.trim() || state.isSubmitting}
                >
                  Publicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4 border-t pt-4">
          <Button
            variant="ghost"
            className="flex flex-col items-center py-3 h-auto hover:bg-blue-50/10 dark:hover:bg-blue-900/20 transition-all group"
            onClick={() => {
              setDialogState({ ...dialogState, isOpen: true })
              setPostType('text')
            }}
          >
            <div className="rounded-full bg-blue-50 dark:bg-blue-900/50 p-2 mb-1 group-hover:scale-110 transition-transform">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium">Artigo</span>
            <span className="text-xs text-muted-foreground">Compartilhe</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center py-3 h-auto hover:bg-purple-50/10 dark:hover:bg-purple-900/20 transition-all group"
            onClick={() => {
              setDialogState({ ...dialogState, isOpen: true })
              setPostType('study')
            }}
          >
            <div className="rounded-full bg-purple-50 dark:bg-purple-900/50 p-2 mb-1 group-hover:scale-110 transition-transform">
              <Layout className="h-4 w-4 text-purple-500" />
            </div>
            <span className="text-sm font-medium">Estudo</span>
            <span className="text-xs text-muted-foreground">Pesquise</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center py-3 h-auto hover:bg-green-50/10 dark:hover:bg-green-900/20 transition-all group"
            onClick={() => {
              setDialogState({ ...dialogState, isOpen: true })
              setPostType('question')
            }}
          >
            <div className="rounded-full bg-green-50 dark:bg-green-900/50 p-2 mb-1 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-sm font-medium">Pergunta</span>
            <span className="text-xs text-muted-foreground">Debata</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center py-3 h-auto hover:bg-amber-50/10 dark:hover:bg-amber-900/20 transition-all group"
            onClick={() => {
              setDialogState({ ...dialogState, isOpen: true })
              setPostType('event')
            }}
          >
            <div className="rounded-full bg-amber-50 dark:bg-amber-900/50 p-2 mb-1 group-hover:scale-110 transition-transform">
              <Calendar className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-sm font-medium">Evento</span>
            <span className="text-xs text-muted-foreground">Organize</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

