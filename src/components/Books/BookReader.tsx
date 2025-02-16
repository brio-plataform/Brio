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

export function BookReader({ bookId }: { bookId: string }) {
  const router = useRouter()
  const [book, setBook] = useState<BookData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Simula carregamento do livro - substituir por chamada API real
  useEffect(() => {
    // Mock data
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
              content: [
                "O sótão da antiga casa colonial permanecia intocado há décadas, seus segredos trancados sob camadas de poeira e memórias esquecidas. Helena Mendes estava parada na entrada, o feixe de sua lanterna cortando a escuridão empoeirada, iluminando partículas que dançavam no ar.",
                "A morte de sua avó havia deixado mais do que apenas esta casa ancestral; deixara também perguntas que assombravam sua família por gerações. O assoalho de madeira rangia sob seus pés enquanto ela se aproximava de um baú desgastado no canto do cômodo."
              ]
            },
            {
              number: 2,
              content: [
                "Dentro dele, encontrou maços de cartas amareladas pelo tempo, amarradas com fitas desbotadas. As datas nas cartas iam de 1892 a 1895, cada envelope endereçado à sua tataravó, Dona Amélia Mendes.",
                "Suas mãos tremiam ao abrir a primeira carta, o papel crepitando suavemente no silêncio. A caligrafia era elegante mas apressada, como se o escritor estivesse em estado de urgência. 'Minha querida Amélia,' começava, 'preciso alertá-la sobre o que descobri em Vila das Sombras.'"
              ]
            },
            {
              number: 3,
              content: [
                "Enquanto lia, Helena sentiu o coração acelerar. A carta falava de acontecimentos estranhos na pequena cidade litorânea, de mulheres que podiam comandar os elementos da natureza, e de uma sociedade secreta que as observava há séculos.",
                "Uma súbita rajada de vento sacudiu a janela do sótão, fazendo Helena sobressaltar-se. Ela ergueu os olhos, quase esperando ver alguém a observando, mas havia apenas escuridão além do vidro. A carta em suas mãos parecia pulsar com uma energia própria."
              ]
            }
          ]
        },
        {
          number: 2,
          title: "O Chamado das Sete",
          pages: [
            {
              number: 1,
              content: [
                "Na manhã seguinte, Helena acordou com o som da chuva batendo suavemente contra sua janela. O medalhão que encontrara repousava sobre sua mesa de cabeceira, brilhando tenuemente na luz difusa do amanhecer.",
                "Decidida a descobrir mais sobre o mistério das sete famílias, ela começou a pesquisar nos antigos registros da cidade."
              ]
            },
            {
              number: 2,
              content: [
                "A biblioteca municipal de Vila das Sombras era um prédio imponente de pedra, com arquivos que remontavam à fundação da cidade.",
                "Os arquivos revelavam segredos antigos da cidade..."
              ]
            }
          ]
        },
        {
          number: 3,
          title: "O Despertar dos Dons",
          pages: [
            {
              number: 1,
              content: [
                "A escuridão da biblioteca durou apenas alguns segundos antes que velas se acendessem espontaneamente ao redor delas. Helena olhou espantada para as chamas que dançavam sem que ninguém as tivesse acendido.",
                "'Mariana Oliveira', explicou Dona Clara com um sorriso, apontando para uma jovem que emergiu das sombras entre as estantes."
              ]
            },
            {
              number: 2,
              content: [
                "Mariana, uma moça de cabelos vermelhos e olhos dourados, se aproximou da mesa onde estavam. As chamas das velas pareciam se inclinar em sua direção, como se a reconhecessem como sua mestra.",
                "Helena observou fascinada enquanto mais quatro mulheres surgiam das sombras da biblioteca."
              ]
            },
            {
              number: 3,
              content: [
                "'Falta apenas uma', disse Dona Clara, contando as presentes. 'A herdeira dos Ribeiro ainda não despertou para seu dom. Mas o círculo já está quase completo.'"
              ]
            },
            {
              number: 4,
              content: [
                "Uma das mulheres, que se apresentou como Beatriz Santos, tocou uma planta murcha que decorava a mesa. Sob seus dedos, a planta reviveu instantaneamente, suas folhas se tornando verdes e viçosas novamente."
              ]
            },
            {
              number: 5,
              content: [
                "'Os dons estão ficando mais fortes', observou Beatriz. 'É como se a própria Vila das Sombras estivesse despertando de um longo sono. Podemos sentir nas raízes da terra, no sussurro do vento, no calor do fogo...'"
              ]
            },
            {
              number: 6,
              content: [
                "Helena olhou para suas próprias mãos, lembrando-se de todas as vezes que a chuva pareceu atender seus desejos inconscientes. 'Por que agora?', perguntou. 'Por que os dons estão retornando depois de tanto tempo?'"
              ]
            },
            {
              number: 7,
              content: [
                "Dona Clara abriu o livro em uma página específica, revelando uma antiga profecia escrita em uma caligrafia delicada. 'Quando as sombras antigas ameaçarem retornar, as Sete deverão despertar. O equilíbrio dos elementos dependerá da união das linhagens.'"
              ]
            },
            {
              number: 8,
              content: [
                "'Algo está vindo', disse Mariana, suas palavras fazendo as chamas das velas tremularem. 'Algo que nossos antepassados selaram há muito tempo está tentando voltar. Podemos sentir sua presença crescendo nas sombras da cidade.'"
              ]
            },
            {
              number: 9,
              content: [
                "Um vento frio soprou através da biblioteca, fazendo as páginas do livro virarem rapidamente. Helena sentiu o medalhão em seu pescoço aquecer, e a tempestade lá fora respondeu com um trovão ensurdecedor."
              ]
            },
            {
              number: 10,
              content: [
                "'Agora você entende por que sua avó deixou as cartas para você encontrar?', perguntou Dona Clara. 'O destino de Vila das Sombras sempre esteve nas mãos das Sete. E agora, mais do que nunca, precisamos estar unidas.'"
              ]
            },
            {
              number: 11,
              content: [
                "O círculo de mulheres se fechou ao redor da mesa central..."
              ]
            },
            {
              number: 12,
              content: [
                "Cada medalhão começou a brilhar com uma cor diferente, criando um espetáculo de luzes..."
              ]
            },
            {
              number: 13,
              content: [
                "As palavras da profecia ecoavam nas paredes antigas da biblioteca..."
              ]
            },
            {
              number: 14,
              content: [
                "Helena sentiu o poder crescer dentro dela, como uma tempestade prestes a ser libertada..."
              ]
            }
          ]
        },
        {
          number: 4,
          title: "Segredos nas Sombras",
          pages: [
            {
              number: 1,
              content: [
                "A noite caiu sobre Vila das Sombras como um manto de mistério..."
              ]
            },
            {
              number: 2,
              content: [
                "As ruas antigas guardavam mais segredos do que Helena imaginava..."
              ]
            },
            {
              number: 3,
              content: [
                "Em cada esquina, símbolos antigos brilhavam tenuemente sob a luz da lua..."
              ]
            },
            {
              number: 4,
              content: [
                "O medalhão a guiava como uma bússola mágica através da cidade adormecida..."
              ]
            }
          ]
        },
        {
          number: 5,
          title: "A Sétima Herdeira",
          pages: [
            {
              number: 1,
              content: [
                "A busca pela última herdeira dos Ribeiro se intensificava..."
              ]
            },
            {
              number: 2,
              content: [
                "Os ventos da cidade sopravam com mais força, ansiosos por sua mestra..."
              ]
            },
            {
              number: 3,
              content: [
                "Antigas profecias começavam a fazer sentido sob a nova luz dos acontecimentos..."
              ]
            },
            {
              number: 4,
              content: [
                "O tempo estava se esgotando, e as sombras cresciam mais a cada dia..."
              ]
            }
          ]
        },
        {
          number: 6,
          title: "O Ritual das Sete",
          pages: [
            {
              number: 1,
              content: [
                "A lua cheia iluminava o círculo de pedras..."
              ]
            },
            {
              number: 2,
              content: [
                "As sete mulheres se posicionaram em seus lugares..."
              ]
            },
            {
              number: 3,
              content: [
                "Os elementos respondiam ao chamado de suas mestras..."
              ]
            },
            {
              number: 4,
              content: [
                "A terra tremeu sob seus pés quando o ritual começou..."
              ]
            },
            {
              number: 5,
              content: [
                "As sombras antigas tentavam resistir ao poder das sete..."
              ]
            },
            {
              number: 6,
              content: [
                "Helena sentiu o poder ancestral fluir através dela..."
              ]
            }
          ]
        }
      ],
      audioUrl: "/audio/book-1.mp3",
      progress: {
        currentChapter: 0,
        currentPage: 1
      }
    }

    setBook(mockBook)
  }, [bookId])

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
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
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

            <Progress 
              value={calculateProgress()} 
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Página {currentPage.number} de {totalPages} • 
                Parágrafo {currentParagraphIndex + 1} de {currentPage.content.length}
              </span>
              <span>{Math.round(calculateProgress())}% concluído</span>
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
              <div className="mt-4 space-y-2">
                {book.chapters.map((chapter, index) => (
                  <Button
                    key={chapter.number}
                    variant={index === book.progress.currentChapter ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleChapterChange(index)}
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
        </div>

        {/* Controles de Áudio e Navegação */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Controles de Página */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange('prev')}
              disabled={currentPageIndex === 0 && book.progress.currentChapter === 0}
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
              onClick={() => handlePageChange('next')}
              disabled={
                currentPageIndex === currentChapter.pages.length - 1 && 
                book.progress.currentChapter === book.chapters.length - 1
              }
              className="flex items-center gap-2"
            >
              Próxima Página
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Controles de Áudio e Parágrafos */}
          <div className="flex items-center justify-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleParagraphNavigation('prev')}
                  disabled={currentParagraphIndex === 0 && currentPageIndex === 0 && book.progress.currentChapter === 0}
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
                  onClick={togglePlay}
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
                  onClick={() => handleParagraphNavigation('next')}
                  disabled={
                    currentParagraphIndex === currentPage.content.length - 1 && 
                    currentPageIndex === currentChapter.pages.length - 1 && 
                    book.progress.currentChapter === book.chapters.length - 1
                  }
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Próximo Parágrafo</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Área de Leitura */}
        <ScrollArea className="h-[calc(100vh-400px)] rounded-lg border p-8 bg-card">
          <div className="max-w-2xl mx-auto prose dark:prose-invert">
            <h2 className="text-xl font-semibold mb-6">
              {currentChapter.title}
            </h2>
            
            {getCurrentPageParagraphs().map((paragraph: string, index: number) => (
              <p 
                key={`${currentPage.number}-${index}`}
                className={index === currentParagraphIndex 
                  ? "bg-accent/20 p-2 rounded transition-colors" 
                  : "transition-colors"
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

        {/* Audio Element */}
        <audio 
          ref={audioRef} 
          src={book.audioUrl}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Adicionar navegação entre capítulos */}
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