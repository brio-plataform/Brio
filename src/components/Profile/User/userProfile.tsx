import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Mail,
  Bookmark,
  Share2,
  BookmarkPlus,
  GraduationCap,
  Book,
  Users,
  Star,
  GitFork,
  MessageSquare,
} from "lucide-react"

import placeholder from "../../../../public/images/placeholder.svg"

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 w-full">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          {/* Banner Card */}
          <Card className="w-full h-48 relative mb-12">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
            </div>
            {/* Profile Avatar */}
            <Avatar className="absolute -bottom-8 left-8 w-32 h-32 border-4 border-background">
              <AvatarImage src={placeholder} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Card>

          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dr. Maria Silva</h1>
              <p className="text-xl text-muted-foreground">Pesquisadora em Ciência de Dados | Professora</p>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Universidade de São Paulo</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button>
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Seguir
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Book className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-muted-foreground">Publicações</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-muted-foreground">Seguidores</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Star className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">3.4k</p>
                <p className="text-muted-foreground">Citações</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <GitFork className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-muted-foreground">Contribuições</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pesquisadora e professora com foco em Machine Learning e Análise de Dados. Contribuo ativamente para
                  projetos open-source e compartilho conhecimento através de artigos e tutoriais. Minha missão é tornar
                  a ciência de dados mais acessível para todos.
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="publications" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="publications">Publicações</TabsTrigger>
                <TabsTrigger value="studies">Estudos</TabsTrigger>
                <TabsTrigger value="contributions">Contribuições</TabsTrigger>
              </TabsList>

              <TabsContent value="publications" className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-2">
                            Análise Comparativa de Algoritmos de Machine Learning em Dados Educacionais
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Um estudo sobre a aplicação de diferentes algoritmos de ML em dados educacionais...
                          </p>
                          <div className="flex gap-2">
                            <Badge>Machine Learning</Badge>
                            <Badge>Educação</Badge>
                            <Badge>Análise de Dados</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center text-muted-foreground">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm">234 citações</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span className="text-sm">18 comentários</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="studies" className="mt-6 space-y-4">
                {[1, 2].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-2">Guia Completo: Python para Análise de Dados</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Material didático abrangente sobre Python e suas aplicações em análise de dados...
                          </p>
                          <div className="flex gap-2">
                            <Badge>Python</Badge>
                            <Badge>Data Science</Badge>
                            <Badge>Tutorial</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Recompensas e Reconhecimento */}
            <Card>
              <CardHeader>
                <CardTitle>Recompensas e Reconhecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Top Contribuidor 2023</Badge>
                  <Badge variant="secondary">Estudo Mais Referenciado</Badge>
                  <Badge variant="secondary">Pensador do Mês</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Eventos Participados */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos Participados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-2">Conferência Internacional de Ciência de Dados 2023</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Palestra sobre "Aplicações de Machine Learning em Saúde".
                        </p>
                        <div className="flex gap-2">
                          <Badge>Palestrante</Badge>
                          <Badge>Saúde</Badge>
                        </div>
                      </div>
                      <Button variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Conhecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Machine Learning</Badge>
                  <Badge variant="secondary">Deep Learning</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">R</Badge>
                  <Badge variant="secondary">Estatística</Badge>
                  <Badge variant="secondary">Big Data</Badge>
                  <Badge variant="secondary">Data Visualization</Badge>
                  <Badge variant="secondary">NLP</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formação Acadêmica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <GraduationCap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Doutorado em Ciência da Computação</p>
                    <p className="text-sm text-muted-foreground">USP • 2018-2022</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <GraduationCap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Mestrado em Ciência da Computação</p>
                    <p className="text-sm text-muted-foreground">UNICAMP • 2016-2018</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>maria.silva@universidade.edu</span>
                </div>
                <Button variant="outline" className="w-full">
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>

            {/* Biblioteca Pessoal */}
            <Card>
              <CardHeader>
                <CardTitle>Biblioteca Pessoal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-2">Dom Quixote</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Clássico da literatura espanhola.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Literatura</Badge>
                          <Badge>Clássico</Badge>
                        </div>
                      </div>
                      <Button variant="outline">
                        Ler Agora
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}