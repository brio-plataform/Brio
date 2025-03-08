"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Comment } from "@/components/Comment/comment"
import { MOCK_COMMENTS } from "@/components/Comment/mockData"
import { Bookmark, Share2, Download, MoreHorizontal, ThumbsUp, MessageSquare, Book, ChevronLeft } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface BookDetails {
  id: string
  title: string
  author: string
  coverUrl: string
  description: string
  shortDescription: string
  editors: string[]
  language: string
  paperback: {
    pages: number
    texture: string
    isbn: string
  }
  reviews: Array<{
    author: {
      name: string
      avatar: string
    }
    content: string
  }>
}

// Componentes internos reutilizáveis
const BookCover = ({ coverUrl, title }: { coverUrl: string; title: string }) => (
  <div className="w-full lg:w-[400px] flex flex-col items-center">
    <div className="relative w-[300px] h-[450px] shadow-2xl rounded-lg overflow-hidden bg-muted">
      <Avatar className="w-full h-full rounded-lg">
        <AvatarImage src={coverUrl} alt={title} className="object-cover" />
        <AvatarFallback>
          <Book className="w-16 h-16 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
)

const ActionButtons = ({ bookId }: { bookId: string }) => (
  <div className="flex items-center gap-4">
    <Button asChild>
      <Link href={`/library/${bookId}/read?id=${bookId}`}>
        Read Book
      </Link>
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full">
      <Bookmark className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full">
      <Share2 className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full">
      <Download className="w-4 h-4" />
    </Button>
  </div>
)

const BookReview = ({ review, formatTimestamp }: { 
  review: BookDetails['reviews'][0],
  formatTimestamp: (date: Date) => string 
}) => (
  <div className="flex gap-4 p-6 rounded-lg bg-muted/30">
    <Avatar className="w-10 h-10">
      <AvatarImage src={review.author.avatar} />
      <AvatarFallback>{review.author.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{review.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatTimestamp(new Date())}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report Review</DropdownMenuItem>
            <DropdownMenuItem>Share Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-muted-foreground">{review.content}</p>
      <div className="flex items-center gap-4 pt-2">
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <ThumbsUp className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Helpful</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <MessageSquare className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Reply</span>
        </Button>
      </div>
    </div>
  </div>
)

const BookMetadata = ({ book }: { book: BookDetails }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <h2 className="text-lg font-semibold mb-4">Description</h2>
      <p className="text-muted-foreground">{book.description}</p>
    </div>
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-2">Editors</h3>
        <p className="text-muted-foreground">{book.editors.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Language</h3>
        <p className="text-muted-foreground">{book.language}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Paperback</h3>
        <div className="space-y-1 text-muted-foreground">
          <p>{book.paperback.texture}</p>
          <p>{book.paperback.pages} pages</p>
          <p>ISBN: {book.paperback.isbn}</p>
        </div>
      </div>
    </div>
  </div>
)

export function BookDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Efeito para marcar quando estamos no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock data - substituir por chamada API real
  const book: BookDetails = {
    id: "1",
    title: "Harry Potter: Half Blood Prince",
    author: "JK Rowling",
    coverUrl: "/books/half-blood-prince.jpg",
    description: "The story takes place during Harry's sixth year at Hogwarts School of Witchcraft and Wizardry, where he discovers more about Lord Voldemort's past and the prophecy that foretells his defeat.",
    shortDescription: "Get ready to uncover the dark secrets and betrayals in the book. A thrilling adventure awaits you.",
    editors: ["J.K. Rowling (author)", "Christopher Reath", "Alena Gestabon", "Steve Korg"],
    language: "Standard English (USA & UK)",
    paperback: {
      pages: 345,
      texture: "paper textured, full colour",
      isbn: "987 3 32564 455 B"
    },
    reviews: [
      {
        author: {
          name: "Roberto Jordan",
          avatar: "/avatars/roberto.jpg"
        },
        content: "What a delightful and magical book it is! It indeed transports readers to the wizarding world."
      }
    ]
  }

  // Função para formatar timestamp
  const formatTimestamp = (date: Date) => {
    if (!isClient) return "" // Retorna string vazia no servidor
    return formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header com botão de voltar */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-accent/50"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Book Details Section */}
      <div className="flex gap-16 w-full mb-16">
        <BookCover coverUrl={book.coverUrl} title={book.title} />
        
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
            <p className="text-muted-foreground">{book.shortDescription}</p>
          </div>

          <ActionButtons bookId={book.id} />
          <BookMetadata book={book} />
        </div>
      </div>

      {/* Reviews & Comments Section - Full Width */}
      <div className="w-full space-y-12">
        {/* Reviews */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <Button variant="outline" size="sm">
              Write a review
            </Button>
          </div>
          
          <div className="grid gap-6">
            {book.reviews.map((review, index) => (
              <BookReview 
                key={index} 
                review={review} 
                formatTimestamp={formatTimestamp} 
              />
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-6 pt-12 border-t">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Discussion</h2>
            <Button variant="outline" size="sm">
              Start a discussion
            </Button>
          </div>
          
          <div className="grid gap-6">
            {MOCK_COMMENTS.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
