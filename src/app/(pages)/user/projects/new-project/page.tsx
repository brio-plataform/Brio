import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import placeholder from "../../../../../../public/images/placeholder.svg"
import { LeftSidebar } from "@/components/left-sidebar"
import { Header } from "@/components/header"
import { RightSidebar } from "@/components/right-sidebar"


export  function NewProject() {
  return (
    <div className="p-6">
      <div className="relative w-full h-60 mb-6 overflow-hidden rounded-3xl">
        <Image src={placeholder} alt="Brio Platform Banner" layout="fill" objectFit="cover" />
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4 mt-4 bg-red">
          <Image src={placeholder} alt="Brio Platform Logo" width={64} height={64} className="rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold">Brio Platform</h1>
            <p className="text-muted-foreground">Estrutura Ampliada do Brio</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">1. Fóruns Oficiais e Comunidades</h2>
              <p className="text-muted-foreground mb-2">
                Fóruns Oficiais: Criados pela equipe do Brio, abrangendo áreas fundamentais:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Filosofia, Biologia, Física, Matemática, Política, Literatura, História e outros</li>
                <li>Comunidades específicas (ex: Engenharia Aeroespacial, IA, Neurociência)</li>
                <li>Moderação por usuários, com supervisão da plataforma</li>
                <li>Destaque para comunidades mais engajadas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">2. Colaborações e Parcerias</h2>
              <p className="text-muted-foreground mb-2">Com Instituições de Ensino e Governo:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Concursos, bolsas de estudo e cursos acessíveis</li>
                <li>Eventos educacionais presenciais e online</li>
                <li>Oficinas, hackathons e desafios acadêmicos</li>
                <li>Espaço para divulgação de oportunidades acadêmicas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex">
    <LeftSidebar />
    <div className="flex-1">
      <Header />
      <NewProject />
    </div>
    <RightSidebar />
    
    </div>
  )
}