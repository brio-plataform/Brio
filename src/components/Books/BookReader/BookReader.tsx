"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, PlayCircle, Pause,
  SkipBack, SkipForward,
  Book, ListMusic, ChevronRight
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface BookData {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  coverUrl: string
  duration: string
  chapters: {
    number: number
    title: string
    pages: {
      number: number
      content: string[]
    }[]
  }[]
  audioUrl: string
  progress: {
    currentChapter: number
    currentPage: number
  }
}

const BookHeader = ({ 
  book, 
  currentChapter, 
  currentPage, 
  totalPages,
  currentParagraphIndex,
  calculateProgress,
  onBack 
}: { 
  book: BookData
  currentChapter: { number: number; title: string }
  currentPage: { number: number; content: string[] }
  totalPages: number
  currentParagraphIndex: number
  calculateProgress: () => number
  onBack: () => void
}) => (
  <div className="flex items-start gap-6 mb-8">
    <Button variant="ghost" size="icon" onClick={onBack}>
      <ChevronLeft className="h-6 w-6" />
    </Button>

    <Avatar className="w-24 h-36 rounded-lg">
      <AvatarImage src={book.coverUrl} alt={book.title} className="object-cover" />
      <AvatarFallback className="rounded-lg">
        <Book className="w-8 h-8 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>

    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="text-muted-foreground mb-2">{book.author.name}</p>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span>{book.duration}</span>
        <span>•</span>
        <span>Chapter {currentChapter.number}</span>
      </div>

      <Progress value={calculateProgress()} className="mb-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Página {currentPage.number} de {totalPages} • 
          Parágrafo {currentParagraphIndex + 1} de {currentPage.content.length}
        </span>
        <span>{Math.round(calculateProgress())}% concluído</span>
      </div>
    </div>
  </div>
)

const AudioControls = ({
  isPlaying,
  onPrevParagraph,
  onTogglePlay,
  onNextParagraph,
  disablePrev,
  disableNext
}: {
  isPlaying: boolean
  onPrevParagraph: () => void
  onTogglePlay: () => void
  onNextParagraph: () => void
  disablePrev: boolean
  disableNext: boolean
}) => (
  <div className="flex items-center justify-center gap-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onPrevParagraph}
          disabled={disablePrev}
        >
          <SkipBack className="h-6 w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Parágrafo Anterior</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12"
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <PlayCircle className="h-8 w-8" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isPlaying ? 'Pausar' : 'Reproduzir'}
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onNextParagraph}
          disabled={disableNext}
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Próximo Parágrafo</TooltipContent>
    </Tooltip>
  </div>
)

const PageControls = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  disablePrev,
  disableNext
}: {
  currentPage: { number: number; content: string[] }
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
  disablePrev: boolean
  disableNext: boolean
}) => (
  <div className="flex items-center justify-center gap-4">
    <Button 
      variant="outline" 
      size="sm"
      onClick={onPrevPage}
      disabled={disablePrev}
      className="flex items-center gap-2"
    >
      <ChevronLeft className="h-4 w-4" />
      Página Anterior
    </Button>

    <span className="text-sm text-muted-foreground">
      Página {currentPage.number} de {totalPages}
    </span>

    <Button 
      variant="outline" 
      size="sm"
      onClick={onNextPage}
      disabled={disableNext}
      className="flex items-center gap-2"
    >
      Próxima Página
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)

const ChapterList = ({
  book,
  currentChapterIndex,
  onChapterChange
}: {
  book: BookData
  currentChapterIndex: number
  onChapterChange: (index: number) => void
}) => (
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
      <div className="mt-4 space-y-2">
        {book.chapters.map((chapter, index) => (
          <Button
            key={chapter.number}
            variant={index === currentChapterIndex ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onChapterChange(index)}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Chapter {chapter.number}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {chapter.title}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </SheetContent>
  </Sheet>
)

export function BookReader({ bookId }: { bookId: string }) {
  const router = useRouter()
  const [book, setBook] = useState<BookData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentParagraphRef = useRef<HTMLParagraphElement>(null)

  // Simula carregamento do livro - substituir por chamada API real
  useEffect(() => {
    const generateParagraphs = (count: number, prefix: string) => {
      return Array.from({ length: count }, (_, i) => 
        `${prefix} - Parágrafo ${i + 1}. ${Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ).join(" ")}`
      );
    };

    const mockBook: BookData = {
      id: "1",
      title: "Os Segredos de Vila das Sombras",
      author: {
        name: "Maria Clara Santos",
        avatar: "/avatars/maria.jpg"
      },
      coverUrl: "/books/vila-sombras.jpg",
      duration: "12h 32min",
      chapters: [
        {
          number: 1,
          title: "As Cartas Esquecidas",
          pages: [
            {
              number: 1,
              content: generateParagraphs(18, "Cap1-Pag1")
            },
            {
              number: 2,
              content: generateParagraphs(15, "Cap1-Pag2")
            },
            {
              number: 3,
              content: generateParagraphs(20, "Cap1-Pag3")
            }
          ]
        },
        {
          number: 2,
          title: "O Chamado das Sete",
          pages: [
            {
              number: 1,
              content: generateParagraphs(16, "Cap2-Pag1")
            },
            {
              number: 2,
              content: generateParagraphs(19, "Cap2-Pag2")
            },
            {
              number: 3,
              content: generateParagraphs(17, "Cap2-Pag3")
            },
            {
              number: 4,
              content: generateParagraphs(21, "Cap2-Pag4")
            }
          ]
        },
        {
          number: 3,
          title: "O Despertar dos Dons",
          pages: [
            {
              number: 1,
              content: generateParagraphs(14, "Cap3-Pag1")
            },
            {
              number: 2,
              content: generateParagraphs(22, "Cap3-Pag2")
            },
            {
              number: 3,
              content: generateParagraphs(18, "Cap3-Pag3")
            }
          ]
        },
        {
          number: 4,
          title: "Segredos nas Sombras",
          pages: [
            {
              number: 1,
              content: generateParagraphs(20, "Cap4-Pag1")
            },
            {
              number: 2,
              content: generateParagraphs(16, "Cap4-Pag2")
            },
            {
              number: 3,
              content: generateParagraphs(19, "Cap4-Pag3")
            },
            {
              number: 4,
              content: generateParagraphs(17, "Cap4-Pag4")
            },
            {
              number: 5,
              content: generateParagraphs(21, "Cap4-Pag5")
            }
          ]
        },
        {
          number: 5,
          title: "A Sétima Herdeira",
          pages: [
            {
              number: 1,
              content: generateParagraphs(15, "Cap5-Pag1")
            },
            {
              number: 2,
              content: generateParagraphs(18, "Cap5-Pag2")
            },
            {
              number: 3,
              content: generateParagraphs(20, "Cap5-Pag3")
            },
            {
              number: 4,
              content: generateParagraphs(16, "Cap5-Pag4")
            }
          ]
        }
      ],
      audioUrl: "/audio/book-1.mp3",
      progress: {
        currentChapter: 0,
        currentPage: 0
      }
    }

    setBook(mockBook)
  }, [bookId])

  // Efeito para scrollar para o parágrafo atual quando ele mudar
  useEffect(() => {
    if (currentParagraphRef.current) {
      currentParagraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [currentParagraphIndex, currentPageIndex, book?.progress.currentChapter])

  if (!book) return null

  const currentChapter = book.chapters[book.progress.currentChapter]
  const currentPage = currentChapter.pages[currentPageIndex]
  const totalPages = currentChapter.pages.length

  const getCurrentPageParagraphs = () => {
    return currentPage.content
  }

  const handleParagraphNavigation = (direction: 'next' | 'prev') => {
    const currentPageContent = currentPage.content;

    if (direction === 'next') {
      // Verifica se é o último parágrafo da página atual
      if (currentParagraphIndex === currentPageContent.length - 1) {
        // Se for a última página do capítulo atual
        if (currentPageIndex === currentChapter.pages.length - 1) {
          // Se não for o último capítulo, vai para o próximo
          if (book.progress.currentChapter < book.chapters.length - 1) {
            handleChapterChange(book.progress.currentChapter + 1)
          }
        } else {
          // Se não for a última página, vai para a próxima
          setCurrentPageIndex(prev => prev + 1)
          setCurrentParagraphIndex(0)
        }
      } else {
        // Se não for o último parágrafo, apenas avança o parágrafo
        setCurrentParagraphIndex(prev => prev + 1)
      }
    } else if (direction === 'prev') {
      // Verifica se é o primeiro parágrafo da página atual
      if (currentParagraphIndex === 0) {
        // Se for a primeira página do capítulo atual
        if (currentPageIndex === 0) {
          // Se não for o primeiro capítulo, volta para o anterior
          if (book.progress.currentChapter > 0) {
            const previousChapter = book.chapters[book.progress.currentChapter - 1]
            const lastPageIndex = previousChapter.pages.length - 1
            const lastPage = previousChapter.pages[lastPageIndex]
            
            handleChapterChange(book.progress.currentChapter - 1)
            setCurrentPageIndex(lastPageIndex)
            setCurrentParagraphIndex(lastPage.content.length - 1)
          }
        } else {
          // Se não for a primeira página, volta para a anterior
          setCurrentPageIndex(prev => prev - 1)
          const previousPage = currentChapter.pages[currentPageIndex - 1]
          setCurrentParagraphIndex(previousPage.content.length - 1)
        }
      } else {
        // Se não for o primeiro parágrafo, apenas volta o parágrafo
        setCurrentParagraphIndex(prev => prev - 1)
      }
    }
  }

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      // Se é a última página do capítulo atual
      if (currentPageIndex === currentChapter.pages.length - 1) {
        // Se não é o último capítulo, vai para o próximo
        if (book.progress.currentChapter < book.chapters.length - 1) {
          handleChapterChange(book.progress.currentChapter + 1)
          setCurrentPageIndex(0)
          setCurrentParagraphIndex(0)
        }
      } else {
        // Se não é a última página, apenas avança
        setCurrentPageIndex(prev => prev + 1)
        setCurrentParagraphIndex(0)
      }
    } else if (direction === 'prev') {
      // Se é a primeira página do capítulo atual
      if (currentPageIndex === 0) {
        // Se não é o primeiro capítulo, volta para o anterior
        if (book.progress.currentChapter > 0) {
          const previousChapter = book.chapters[book.progress.currentChapter - 1]
          handleChapterChange(book.progress.currentChapter - 1)
          setCurrentPageIndex(previousChapter.pages.length - 1)
          setCurrentParagraphIndex(0)
        }
      } else {
        // Se não é a primeira página, apenas volta
        setCurrentPageIndex(prev => prev - 1)
        setCurrentParagraphIndex(0)
      }
    }
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

  const handleChapterChange = (chapterIndex: number) => {
    if (chapterIndex >= 0 && chapterIndex < book.chapters.length) {
      setBook(prev => {
        if (!prev) return null
        return {
          ...prev,
          progress: {
            ...prev.progress,
            currentChapter: chapterIndex,
          }
        }
      })
      setCurrentPageIndex(0)
      setCurrentParagraphIndex(0)
    }
  }

  const calculateProgress = () => {
    // Conta total de parágrafos até o capítulo atual
    let totalParagraphsUntilCurrentChapter = 0
    let currentProgress = 0

    // Soma parágrafos dos capítulos anteriores
    for (let i = 0; i < book.progress.currentChapter; i++) {
      const chapter = book.chapters[i]
      chapter.pages.forEach(page => {
        totalParagraphsUntilCurrentChapter += page.content.length
      })
    }

    // Soma parágrafos das páginas anteriores do capítulo atual
    for (let i = 0; i < currentPageIndex; i++) {
      totalParagraphsUntilCurrentChapter += currentChapter.pages[i].content.length
    }

    // Adiciona parágrafos da página atual
    currentProgress = totalParagraphsUntilCurrentChapter + currentParagraphIndex + 1

    // Calcula total de parágrafos do livro
    let totalParagraphs = 0
    book.chapters.forEach(chapter => {
      chapter.pages.forEach(page => {
        totalParagraphs += page.content.length
      })
    })

    return (currentProgress / totalParagraphs) * 100
  }

  return (
    <TooltipProvider>
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <BookHeader 
          book={book}
          currentChapter={currentChapter}
          currentPage={currentPage}
          totalPages={totalPages}
          currentParagraphIndex={currentParagraphIndex}
          calculateProgress={calculateProgress}
          onBack={() => router.back()}
        />

        <div className="flex justify-between gap-4 my-4">
          <AudioControls 
            isPlaying={isPlaying}
            onPrevParagraph={() => handleParagraphNavigation('prev')}
            onTogglePlay={togglePlay}
            onNextParagraph={() => handleParagraphNavigation('next')}
            disablePrev={currentParagraphIndex === 0 && currentPageIndex === 0 && book.progress.currentChapter === 0}
            disableNext={
              currentParagraphIndex === currentPage.content.length - 1 && 
              currentPageIndex === currentChapter.pages.length - 1 && 
              book.progress.currentChapter === book.chapters.length - 1
            }
          />

          <PageControls 
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={() => handlePageChange('prev')}
            onNextPage={() => handlePageChange('next')}
            disablePrev={currentPageIndex === 0 && book.progress.currentChapter === 0}
            disableNext={
              currentPageIndex === currentChapter.pages.length - 1 && 
              book.progress.currentChapter === book.chapters.length - 1
            }
          />
        </div>

        <ScrollArea className="h-[calc(100vh-400px)] rounded-lg border p-8 bg-card">
          <div className="max-w-2xl mx-auto prose dark:prose-invert">
            <h2 className="text-xl font-semibold mb-6">
              {currentChapter.title}
            </h2>
            
            {getCurrentPageParagraphs().map((paragraph: string, index: number) => (
              <p 
                key={`${currentPage.number}-${index}`}
                ref={index === currentParagraphIndex ? currentParagraphRef : null}
                className={index === currentParagraphIndex 
                  ? "bg-accent/20 p-2 rounded transition-colors mb-4" 
                  : "transition-colors mb-4"
                }
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 text-center text-sm text-muted-foreground">
              Página {currentPage.number} de {totalPages}
            </div>
          </div>
        </ScrollArea>

        <audio 
          ref={audioRef} 
          src={book.audioUrl}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => handleChapterChange(book.progress.currentChapter - 1)}
            disabled={book.progress.currentChapter === 0}
          >
            Capítulo Anterior
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Capítulo {currentChapter.number} de {book.chapters.length}
          </span>
          
          <Button
            variant="outline"
            onClick={() => handleChapterChange(book.progress.currentChapter + 1)}
            disabled={book.progress.currentChapter === book.chapters.length - 1}
          >
            Próximo Capítulo
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
} 