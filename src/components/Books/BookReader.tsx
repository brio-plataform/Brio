"use client"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { 
  ChevronLeft, PlayCircle, ChevronDown,
  SkipBack, SkipForward, Pause,
  BookOpen, ListMusic, ArrowLeftCircle, ArrowRightCircle
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Book } from "lucide-react"

interface Chapter {
  number: number
  title: string
  content: string[]
  audioUrl: string
}

interface BookContent {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  coverUrl: string
  duration: string
  totalChapters: number
  progress: {
    chapter: number
    percentage: number
    currentPage: number
    totalPages: number
  }
  chapters: Chapter[]
}

export function BookReader({ bookId }: { bookId: string }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Mock data - Substituir por chamada API real
  const bookData: BookContent = {
    id: "1",
    title: "The Witches of Willow Cove",
    author: {
      name: "John Roberts",
      avatar: "/avatars/john.jpg"
    },
    coverUrl: "/books/witches.jpg",
    duration: "12h 32min",
    totalChapters: 12,
    progress: {
      chapter: 6,
      percentage: 82,
      currentPage: 145,
      totalPages: 324
    },
    chapters: [
      {
        number: 6,
        title: "The Hidden Letters",
        content: [
          "He thumbed through them until he found a faded photo...",
          "The memories came flooding back as he stared at the image...",
          // Mais parágrafos
        ],
        audioUrl: "/audio/chapter-6.mp3"
      }
    ]
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const navigateParagraph = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentParagraph < bookData.chapters[0].content.length - 1) {
      setCurrentParagraph(prev => prev + 1)
    } else if (direction === 'prev' && currentParagraph > 0) {
      setCurrentParagraph(prev => prev - 1)
    }
  }

  return (
    <div className="w-full max-w-7xl my-10 mx-auto px-4 py-6">
      {/* Header com Capa e Informações */}
      <div className="flex items-start gap-6 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mt-2"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Avatar className="w-24 h-36 rounded-lg">
          <AvatarImage 
            src={bookData.coverUrl} 
            alt={bookData.title} 
            className="object-cover" 
          />
          <AvatarFallback className="rounded-lg">
            <Book className="w-8 h-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{bookData.title}</h1>
          <p className="text-muted-foreground mb-2">{bookData.author.name}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{bookData.duration}</span>
            <span>•</span>
            <span>Chapter {bookData.progress.chapter} of {bookData.totalChapters}</span>
          </div>

          <div className="space-y-2">
            <Progress value={bookData.progress.percentage} />
            <div className="flex justify-between text-sm">
              <span>{bookData.progress.percentage}% completed</span>
              <span>Page {bookData.progress.currentPage} of {bookData.progress.totalPages}</span>
            </div>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <ListMusic className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chapters</SheetTitle>
            </SheetHeader>
            {/* Lista de Capítulos */}
          </SheetContent>
        </Sheet>
      </div>

      {/* Controles de Áudio */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateParagraph('prev')}
        >
          <SkipBack className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <PlayCircle className="h-8 w-8" />
          )}
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateParagraph('next')}
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      {/* Área de Leitura */}
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-400px)] rounded-lg border p-8 bg-card">
          <div className="max-w-2xl mx-auto prose dark:prose-invert">
            <h2 className="text-xl font-semibold mb-6">
              {bookData.chapters[0].title}
            </h2>
            {bookData.chapters[0].content.map((paragraph, index) => (
              <p 
                key={index}
                className={currentParagraph === index ? "bg-accent/20 p-2 rounded" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>

        {/* Botões de Navegação de Página */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur pointer-events-auto"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            <ArrowLeftCircle className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur pointer-events-auto"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <ArrowRightCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={bookData.chapters[0].audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
} 