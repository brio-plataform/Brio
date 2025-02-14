"use client"

import { useState } from "react"

import { FeedItem } from "../../FeedItem/feedItem"

import { ColumnFeed } from "../../ColumnFeed/columnFeed"

import type { FeedItemProps } from "../../FeedItem/types"

import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

import { Search, Filter } from "lucide-react"

import { UserProfileSmall } from "../../SmallProfile/UserProfileSmall/userProfileSmall"
import { InstitutionalProfileSmall } from "../../SmallProfile/InstitutionalProfileSmall/institutionalProfileSmall"
import { ForumProfileSmall } from "../../SmallProfile/ForumProfileSmall/forumProfileSmall"

import { KNOWLEDGE_CATEGORIES, SORT_OPTIONS } from "./mockData"
import { MOCK_FEED_ITEMS } from '../../FeedItem/mockData'
import { MOCK_USER } from "../../SmallProfile/UserProfileSmall/mockData"
import { MOCK_INSTITUTION } from "../../SmallProfile/InstitutionalProfileSmall/mockData"
import { MOCK_FORUM } from "../../SmallProfile/ForumProfileSmall/mockData"

export function FeedExplore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('trending')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex w-full justify-center items-start px-8 py-4 gap-8">
      <div className="flex flex-col w-full justify-center items-center gap-8">
        {/* Cabeçalho do Explore */}
        <div className="w-full space-y-6">

          {/* Barra de Pesquisa */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Busque por tópicos, estudos ou autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Categorias */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              Todos
            </Button>
            {KNOWLEDGE_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>

          {/* Ordenação */}
          <div className="flex gap-2">
            {SORT_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={sortBy === option.id ? 'default' : 'outline'}
                onClick={() => setSortBy(option.id)}
                size="sm"
              >
                {option.icon}
                <span className="ml-2">{option.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Perfil de Usuário */}
        <UserProfileSmall
          user={MOCK_USER}
          onFollow={() => {}}
          onMessage={() => {}}
        />

        {/* Perfil Institucional */}
        <InstitutionalProfileSmall
          institution={MOCK_INSTITUTION}
          onFollow={() => {}}
          onJoin={() => {}}
        />

        <ForumProfileSmall
          forum={MOCK_FORUM}
          onJoin={() => {}}
        />

        {/* Feed de Conteúdo */}
        {MOCK_FEED_ITEMS.map((item: FeedItemProps, index: number) => (
          <FeedItem key={index} {...item} />
        ))}
      </div>

      {/* Coluna Lateral */}
      <ColumnFeed />
    </div>
  )
}

