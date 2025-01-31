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
  Book,
  Users,
  Trophy,
  Building2,
  Globe,
  Phone,
  School,
  Library,
} from "lucide-react"

import placeholder from "../../public/images/placeholder.svg"

export default function InstitutionalProfile() {
  return (
    <div className="max-h-screen p-4 sm:p-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          {/* Banner Card */}
          <Card className="w-full h-48 relative mb-12">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />
            </div>
            {/* Institution Logo */}
            <Avatar className="absolute -bottom-8 left-8 w-32 h-32 border-4 border-background">
              <AvatarImage src={placeholder} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </Card>

          {/* Institution Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">Universidade Internacional</h1>
              <p className="text-xl text-muted-foreground">Centro de Excelência em Pesquisa e Educação</p>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>São Paulo, Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>www.universidade.edu</span>
                </div>
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
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">15k</p>
                <p className="text-muted-foreground">Estudantes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <School className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-muted-foreground">Professores</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">250+</p>
                <p className="text-muted-foreground">Prêmios</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Book className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-muted-foreground">Programas</p>
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
                <CardTitle>Sobre a Instituição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A Universidade Internacional é uma instituição de ensino superior comprometida com a excelência
                  acadêmica e inovação em pesquisa. Com mais de 50 anos de história, nossa instituição tem formado
                  líderes e contribuído significativamente para o avanço do conhecimento em diversas áreas.
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="departments" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="departments">Departamentos</TabsTrigger>
                <TabsTrigger value="research">Centros de Pesquisa</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
              </TabsList>

              <TabsContent value="departments" className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-2">Departamento de Ciências da Computação</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Centro de excelência em pesquisa e ensino em Computação, com foco em Inteligência
                            Artificial...
                          </p>
                          <div className="flex gap-2">
                            <Badge>Graduação</Badge>
                            <Badge>Mestrado</Badge>
                            <Badge>Doutorado</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="text-sm">120 Professores</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Book className="w-4 h-4 mr-1" />
                          <span className="text-sm">15 Laboratórios</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="research" className="mt-6 space-y-4">
                {[1, 2].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-2">Centro de Pesquisa em Tecnologias Emergentes</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Dedicado à pesquisa em tecnologias emergentes e suas aplicações na sociedade...
                          </p>
                          <div className="flex gap-2">
                            <Badge>IA</Badge>
                            <Badge>IoT</Badge>
                            <Badge>Blockchain</Badge>
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

            {/* Repositório Institucional */}
            <Card>
              <CardHeader>
                <CardTitle>Repositório Institucional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-2">Título do Trabalho</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Descrição breve do trabalho publicado.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Versão 1.0</Badge>
                          <Badge>Atualizado em 2024</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eventos e Oportunidades */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos e Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-2">Hackathon de Inovação 2024</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Participe do maior evento de inovação da região.
                        </p>
                        <div className="flex gap-2">
                          <Badge>Inscrições Abertas</Badge>
                          <Badge>Premiação: R$ 50.000</Badge>
                        </div>
                      </div>
                      <Button variant="outline">
                        Saiba Mais
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
                <CardTitle>Áreas de Atuação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Engenharia</Badge>
                  <Badge variant="secondary">Medicina</Badge>
                  <Badge variant="secondary">Computação</Badge>
                  <Badge variant="secondary">Direito</Badge>
                  <Badge variant="secondary">Administração</Badge>
                  <Badge variant="secondary">Ciências Sociais</Badge>
                  <Badge variant="secondary">Artes</Badge>
                  <Badge variant="secondary">Educação</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infraestrutura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Building2 className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">5 Campi</p>
                    <p className="text-sm text-muted-foreground">Distribuídos pela cidade</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Library className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Biblioteca Central</p>
                    <p className="text-sm text-muted-foreground">+500.000 volumes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contato Institucional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contato@universidade.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+55 (11) 1234-5678</span>
                </div>
                <Button variant="outline" className="w-full">
                  Solicitar Informações
                </Button>
              </CardContent>
            </Card>

            {/* Ranking e Reconhecimento */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking e Reconhecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Top 10 em Inovação</Badge>
                  <Badge variant="secondary">Universidade Sustentável</Badge>
                  <Badge variant="secondary">+1000 Citações em 2023</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Biblioteca do Brio */}
            <Card>
              <CardHeader>
                <CardTitle>Biblioteca do Brio</CardTitle>
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

            {/* Moderação e Transparência */}
            <Card>
              <CardHeader>
                <CardTitle>Moderação e Transparência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nossa instituição segue as diretrizes do Brio para manter um ambiente seguro e produtivo. Qualquer conteúdo impróprio pode ser denunciado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}