"use client"

import { useState, useRef, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader} from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Underline,
  LinkIcon,
  ImageIcon,
  FileText,
  AtSign,
  Smile,
  X,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  MessageSquare,
  Upload
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
import {
  Mention,
  Attachment,
  MAX_TITLE_LENGTH,
  MAX_TAGS,
  CreatePostProps,
  CreatePostState,
  ReferenceType,
  Reference
} from '../../types'

import UserTooltip from "../../userTooltip"

export default function ModalText( {
    onSubmit,
    onFileAdd
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
    const [title, setTitle] = useState('')
    const [showMentions, setShowMentions] = useState(false)
    const [attachments, setAttachments] = useState<Attachment[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [tags, setTags] = useState<string[]>([])
    const [currentTag, setCurrentTag] = useState('')
    const [references, setReferences] = useState<Reference[]>([])
    const [currentReference, setCurrentReference] = useState('')
    const [referenceType, setReferenceType] = useState<ReferenceType>('profile')
  
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
    function renderReferenceItem(ref: Reference): import("react").ReactNode {
      throw new Error("Function not implemented.")
    }
  
    return (
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
    )
  }