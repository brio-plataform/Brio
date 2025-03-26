"use client"

import { Card, CardContent } from "../ui/card";

import Editor from "../Editor/editor";

import { useParams } from 'next/navigation';
import { useGetProject } from '@/hooks/useGetProjectByID';

import LoadingEditor from "../Loading/loading-editor";
import { ProjectBanner } from "./ProjectBanner/ProjectBanner";
import { ProjectInfo } from "./ProjectInfo/ProjectInfo";

interface ProjectProps {
  editable?: boolean
  projectId?: string
}

export function Project({ editable = true, projectId: propProjectId }: ProjectProps) {
  const params = useParams();
  // Usar o projectId da prop se fornecido, senão usar o da URL
  const projectId = propProjectId || (params?.id as string);
  
  // Se não houver projectId, mostrar erro
  if (!projectId) {
    return <div>Erro: ID do projeto não fornecido</div>;
  }

  const { 
    isLoading, 
    error,
    content,
    project, // Dados completos do projeto
    banner,
    logo,
    name,
    description
  } = useGetProject(projectId);

  // Não renderizar nada até que os dados estejam carregados
  if (isLoading) {
    return <LoadingEditor />;
  }

  if (error) {
    return <div>Erro ao carregar projeto: {error.message}</div>;
  }

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  // Garantir que sempre temos um conteúdo válido
  const initialContent = project?.content 
    ? JSON.stringify(project.content)
    : JSON.stringify([{
        id: crypto.randomUUID(),
        type: "paragraph",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left"
        },
        content: [
          {
            type: "text",
            text: "Comece a escrever seu projeto aqui...",
            styles: {}
          }
        ],
        children: []
      }]);

  return (
    <div className="p-6 w-full">
      <ProjectBanner 
        editable={editable} 
        projectId={projectId}
        initialBanner={project.banner}
      />

      <div className="mb-6">
        <ProjectInfo 
          editable={editable}
          projectId={projectId}
          initialData={{
            logo: project.logo,
            name: project.name,
            description: project.description
          }}
        />
      </div>

      <div className="flex justify-center items-center pb-5 w-full">
        <Card className="w-full">
          <CardContent className="p-4 min-h-[300px] w-full">
            <Editor 
              initialContent={initialContent}
              editable={editable}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}