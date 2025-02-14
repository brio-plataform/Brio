"use client"

import { Card, CardContent } from "../ui/card";

import Editor from "../Editor/editor";
import { ProjectBanner } from "./ProjectBanner/ProjectBanner";
import { ProjectInfo } from "./ProjectInfo/ProjectInfo";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetProject } from '@/hooks/useGetProjectByID';

import UnauthorizedPage from "../Error/Unauthorized/unauthorized";
import LoadingEditor from "../Loading/loading-editor";

interface ProjectProps {
  editable?: boolean
  projectId?: string
}

export function Project({ editable = true, projectId: propProjectId }: ProjectProps) {
  const params = useParams();
  // Usar o projectId da prop se fornecido, senão usar o da URL
  const projectId = propProjectId || (params?.id as string);
  const [userId] = useState("1");
  
  // Se não houver projectId, mostrar erro
  if (!projectId) {
    return <div>Erro: ID do projeto não fornecido</div>;
  }

  const { 
    isLoading, 
    error,
    content,
    project 
  } = useGetProject(projectId);

  // Verificação de autorização
  if (project && project.userId !== userId) {
    return <UnauthorizedPage />;
  }

  if (isLoading) {
    return <LoadingEditor />;
  }

  if (error) {
    return <div>Erro ao carregar projeto: {error.message}</div>;
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
      <ProjectBanner editable={editable} />

      <div className="mb-6">
        <ProjectInfo editable={editable} />
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