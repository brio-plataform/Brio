import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ColumnFeedSection } from "@/types/types"

export function ColumnFeed() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Bem-vindo ao Brio</CardTitle>
          <CardDescription>A nova Ágora Digital para o Conhecimento Colaborativo</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Compartilhe conhecimento, participe de debates construtivos e colabore em projetos acadêmicos.</p>
          <Button className="w-full">Comece a Explorar</Button>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Estudos em Destaque</CardTitle>
          <CardDescription>Trabalhos mais relevantes da comunidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Impacto da IA na Educação Superior</p>
              <p className="text-sm text-gray-500">Por USP - 328 citações</p>
            </div>
            <div>
              <p className="font-medium">Sustentabilidade em Centros Urbanos</p>
              <p className="text-sm text-gray-500">Projeto Colaborativo - 156 contribuidores</p>
            </div>
            <div>
              <p className="font-medium">Filosofia da Ciência Moderna</p>
              <p className="text-sm text-gray-500">Estudo Coletivo - 89 revisões</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Fóruns Ativos</CardTitle>
          <CardDescription>Debates em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Física Quântica: Interpretação de Copenhagen</p>
              <p className="text-sm text-gray-500">42 especialistas participando</p>
            </div>
            <div>
              <p className="font-medium">Literatura Brasileira Contemporânea</p>
              <p className="text-sm text-gray-500">18 contribuições recentes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Eventos Acadêmicos</CardTitle>
          <CardDescription>Próximas atividades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Hackathon: Soluções para Educação</p>
              <p className="text-sm text-gray-500">Início em 3 dias - 234 inscritos</p>
            </div>
            <div>
              <p className="font-medium">Workshop: Metodologia Científica</p>
              <p className="text-sm text-gray-500">Próxima semana - Online</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}