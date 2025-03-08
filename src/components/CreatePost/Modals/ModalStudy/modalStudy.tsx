"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  MAX_TITLE_LENGTH,
} from '../../types'

export default function ModalStudy() {

  const [title, setTitle] = useState('')

  return (
    <div>
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
              </div>
  )
}
