"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Edit3, Share2, Trash2, BookOpen, Star, 
  MessageSquare, Grid, List, Plus, MoreVertical,
  Book, FileText, ExternalLink, X, Headphones,
  Lock, Globe, Building2, Download,
  Users, Heart
} from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Modal } from "@/components/Modal/modal"

// Types
type BookType = "ebook" | "audiobook" | "academic" | "community";
type BookVisibility = "private" | "public" | "institutional";
type BookStatus = "Em Andamento" | "Concluído" | "Não Iniciado";

interface Author {
    id: string;
    name: string;
    avatar: string;
    institution?: string;
}

interface Book {
    id: string;
    title: string;
    author: Author;
    coverUrl: string;
    description: string;
    progress?: number;
    type: BookType;
    visibility: BookVisibility;
    status: BookStatus;
    institutional: boolean;
    institution?: {
        name: string;
        avatar: string;
    };
    stats: {
        views: number;
        likes: number;
        downloads: number;
        comments: number;
        shares: number;
    };
    tags: string[];
    collaborators?: Array<{
        name: string;
        avatar: string;
    }>;
}

// Constants
const BOOK_TYPES = {
    EBOOK: "ebook",
    AUDIOBOOK: "audiobook",
    ACADEMIC: "academic",
    COMMUNITY: "community"
} as const;

const BOOK_VISIBILITY = {
    PRIVATE: "private",
    PUBLIC: "public",
    INSTITUTIONAL: "institutional"
} as const;

const TYPE_BADGE_STYLES = {
    ebook: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    audiobook: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    academic: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    community: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
};

const VISIBILITY_BADGE_STYLES = {
    private: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    public: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    institutional: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
};

const STATUS_BADGE_STYLES: Record<BookStatus, string> = {
    "Em Andamento": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "Concluído": "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    "Não Iniciado": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
};

// Mock Data
const MOCK_BOOKS: Book[] = [
    {
        id: "1",
        title: "The Witches of Willow Cove",
        author: {
            id: "a1",
            name: "John Roberts",
            avatar: "/avatars/john.jpg"
        },
        coverUrl: "/books/witches.jpg",
        description: "A magical adventure about friendship and discovery in a small town where nothing is quite as it seems.",
        progress: 82,
        type: "ebook",
        visibility: "public",
        status: "Em Andamento",
        institutional: false,
        stats: {
            views: 1200,
            likes: 340,
            downloads: 89,
            comments: 56,
            shares: 23
        },
        tags: ["Fantasy", "Young Adult", "Magic"],
        collaborators: [
            { name: "Sarah Smith", avatar: "/avatars/sarah.jpg" },
            { name: "Mike Johnson", avatar: "/avatars/mike.jpg" }
        ]
    },
    // Add more mock books...
];

function generateTagColor(tag: string) {
    const hashString = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    const colorPairs = [
        { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
        { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
        { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-300" },
        { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300" },
        { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" }
    ];

    const colorIndex = hashString(tag) % colorPairs.length;
    return `${colorPairs[colorIndex].bg} ${colorPairs[colorIndex].text}`;
}

export function Books() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const router = useRouter()

    const filteredBooks = MOCK_BOOKS.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === "all" || book.type === filterType
        return matchesSearch && matchesType
    })

    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
                          animate-in slide-in-from-top-4 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Biblioteca</h1>
                    <p className="text-muted-foreground mt-1">
                        Explore e contribua com nossa biblioteca colaborativa
                    </p>
                </div>
                <Button 
                    className="gap-2"
                    onClick={() => {/* Handle new book */}}
                >
                    <Plus className="w-4 h-4" />
                    Novo Livro
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Input
                        placeholder="Pesquisar livros..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os tipos</SelectItem>
                            <SelectItem value="ebook">E-books</SelectItem>
                            <SelectItem value="audiobook">Audiobooks</SelectItem>
                            <SelectItem value="academic">Acadêmicos</SelectItem>
                            <SelectItem value="community">Comunidade</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant={viewMode === "grid" ? "default" : "outline"} 
                        size="icon" 
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant={viewMode === "list" ? "default" : "outline"} 
                        size="icon" 
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Books Grid/List */}
            <div className={`grid gap-4 transition-all duration-300 ${
                viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
            }`}>
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        </div>
    )
}

interface BookCardProps {
    book: Book;
    viewMode: "grid" | "list";
}

function BookCard({ book, viewMode }: BookCardProps) {
    const router = useRouter()

    if (viewMode === "list") {
        return (
            <Card className="group hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                    <div className="flex gap-6">
                        {/* Cover Image */}
                        <div className="relative w-[120px] h-[150px] rounded-lg overflow-hidden bg-muted">
                            <Avatar className="w-full h-full rounded-lg">
                                <AvatarImage src={book.coverUrl} alt={book.title} className="object-cover" />
                                <AvatarFallback>
                                    <Book className="w-8 h-8 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                                        {book.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Avatar className="w-5 h-5">
                                            <AvatarImage src={book.author.avatar} />
                                            <AvatarFallback>{book.author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>{book.author.name}</span>
                                        {book.institutional && (
                                            <>
                                                <span>•</span>
                                                <Building2 className="w-4 h-4" />
                                                <span>{book.institution?.name}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit3 className="w-4 h-4 mr-2" /> Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Download className="w-4 h-4 mr-2" /> Download
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="w-4 h-4 mr-2" /> Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {book.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className={TYPE_BADGE_STYLES[book.type]}>
                                    {book.type === "ebook" && <Book className="w-3 h-3 mr-1" />}
                                    {book.type === "audiobook" && <Headphones className="w-3 h-3 mr-1" />}
                                    {book.type === "academic" && <FileText className="w-3 h-3 mr-1" />}
                                    {book.type}
                                </Badge>
                                <Badge variant="secondary" className={VISIBILITY_BADGE_STYLES[book.visibility]}>
                                    {book.visibility === "private" && <Lock className="w-3 h-3 mr-1" />}
                                    {book.visibility === "public" && <Globe className="w-3 h-3 mr-1" />}
                                    {book.visibility === "institutional" && <Building2 className="w-3 h-3 mr-1" />}
                                    {book.visibility}
                                </Badge>
                                <Badge variant="secondary" className={STATUS_BADGE_STYLES[book.status]}>
                                    {book.status}
                                </Badge>
                                {book.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className={generateTagColor(tag)}>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{book.stats.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{book.stats.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{book.stats.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Share2 className="w-4 h-4" />
                                    <span>{book.stats.shares}</span>
                                </div>
                                {book.collaborators && (
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <div className="flex -space-x-2">
                                            {book.collaborators.map((collaborator, index) => (
                                                <Avatar key={index} className="w-6 h-6 border-2 border-background">
                                                    <AvatarImage src={collaborator.avatar} />
                                                    <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="group hover:shadow-md transition-shadow duration-200 w-[240px]">
            <CardContent className="p-4">
                {/* Cover Image */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-3">
                    <Avatar className="w-full h-full rounded-lg">
                        <AvatarImage src={book.coverUrl} alt={book.title} className="object-cover" />
                        <AvatarFallback>
                            <Book className="w-6 h-6 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Content */}
                <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">
                            {book.title}
                        </h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Edit3 className="w-4 h-4 mr-2" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" /> Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" /> Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <Avatar className="w-4 h-4">
                            <AvatarImage src={book.author.avatar} />
                            <AvatarFallback>{book.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="line-clamp-1">{book.author.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="secondary" className={`${TYPE_BADGE_STYLES[book.type]} text-xs px-2 py-0.5`}>
                            {book.type === "ebook" && <Book className="w-3 h-3 mr-1" />}
                            {book.type === "audiobook" && <Headphones className="w-3 h-3 mr-1" />}
                            {book.type === "academic" && <FileText className="w-3 h-3 mr-1" />}
                            {book.type}
                        </Badge>
                        <Badge variant="secondary" className={`${STATUS_BADGE_STYLES[book.status]} text-xs px-2 py-0.5`}>
                            {book.status}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" />
                                <span>{book.stats.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{book.stats.comments}</span>
                            </div>
                        </div>
                        {book.collaborators && (
                            <div className="flex -space-x-1.5">
                                {book.collaborators.map((collaborator, index) => (
                                    <Avatar key={index} className="w-5 h-5 border-2 border-background">
                                        <AvatarImage src={collaborator.avatar} />
                                        <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}