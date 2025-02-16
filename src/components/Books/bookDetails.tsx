"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Comment } from "@/components/Comment/comment"
import { MOCK_COMMENTS } from "@/components/Comment/mockData"
import { Bookmark, Share2, Download, ArrowRight, MoreHorizontal, ThumbsUp, MessageSquare, Book } from "lucide-react"
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

export function BookDetails() {
  const { id } = useParams()
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
      {/* Book Details Section */}
      <div className="flex gap-16 w-full mb-16">
        {/* Left Column - Book Cover */}
        <div className="w-full lg:w-[400px] flex flex-col items-center">
          <div className="relative w-[300px] h-[450px] shadow-2xl rounded-lg overflow-hidden bg-muted">
            <Avatar className="w-full h-full rounded-lg">
              <AvatarImage 
                src={book.coverUrl} 
                alt={book.title} 
                className="object-cover"
              />
              <AvatarFallback>
                <Book className="w-16 h-16 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Right Column - Book Details */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
            <p className="text-muted-foreground">{book.shortDescription}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href={`/books/${book.id}/read?id=${book.id}`}>
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
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-muted/30">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.author.avatar} />
                  <AvatarFallback>{review.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.author.name}</p>
                      {isClient && ( // Só renderiza no cliente
                        <p className="text-sm text-muted-foreground">
                          {formatTimestamp(new Date())}
                        </p>
                      )}
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
