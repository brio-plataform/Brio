"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  ImageIcon,
  FileText,
  Calendar,
  Layout,
  HelpCircle,
  FileIcon,
  Link2Icon,
} from "lucide-react"
import {
  CreatePostProps,
  CreatePostState,
  CreatePostDialogState,
  PostType,
} from './types'
import { cn } from "@/lib/utils"

import ModalText from "./Modals/ModalText/modalText"
import ModalStudy from "./Modals/ModalStudy/modalStudy"
import { ModalQuestion } from "./Modals/ModalQuestion/modalQuestion"
import { ModalEvent } from "./Modals/ModalEvent/modalEvent"

export function CreatePost({
  user,
  placeholder = "O que você está pensando?",
  showMediaButton = true,
  showFileButton = true,
  showLinkButton = true,
  customActions,
  className,
  onSubmit,
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
                <ModalText img={""}/>
              )}

              {postType === 'study' && (
                <ModalStudy/>
              )}

              {postType === 'question' && (
                <ModalQuestion img={""}/>
              )}

              {postType === 'event' && (
                <ModalEvent/>
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