"use client"

import { Card, CardContent } from "../ui/card";

import Editor from "../Editor/editor";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetProject } from '@/hooks/useGetProjectByID';

import UnauthorizedPage from "../Error/Unauthorized/unauthorized";
import LoadingEditor from "../Loading/loading-editor";
import { ProjectBanner } from "../project/ProjectBanner/ProjectBanner";
import { ProjectInfo } from "../project/ProjectInfo/ProjectInfo";

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
    project, // Dados completos do projeto
    banner,
    logo,
    name,
    description
  } = useGetProject(projectId);

  // Verificação de autorização
  if (project && project.userId !== userId) {
    return <UnauthorizedPage />;
  }

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
  const initialContent = (() => {
    try {
      if (project.content) {
        // Se o conteúdo já é um array, converta para string
        if (Array.isArray(project.content)) {
          const content = project.content.map(block => ({
            id: String(block.id || crypto.randomUUID()),
            type: block.type || "paragraph",
            props: {
              textColor: block.props?.textColor || "default",
              backgroundColor: block.props?.backgroundColor || "default",
              textAlignment: block.props?.textAlignment || "left",
              level: block.props?.level || 1
            },
            content: Array.isArray(block.content) ? block.content.map(cont => ({
              type: cont.type || "text",
              text: String(cont.text || ''),
              styles: cont.styles || {}
            })) : [{
              type: "text",
              text: "",
              styles: {}
            }],
            children: Array.isArray(block.children) ? block.children : []
          }));
          console.log('Using array content:', content);
          return JSON.stringify(content);
        }
        // Se é uma string, use-a diretamente
        if (typeof project.content === 'string') {
          console.log('Using string content:', project.content);
          return project.content;
        }
      }
      // Se chegou aqui, use o conteúdo padrão
      const defaultContent = [{
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
      }];
      console.log('Using default content:', defaultContent);
      return JSON.stringify(defaultContent);
    } catch (error) {
      console.error('Error processing content:', error);
      return JSON.stringify([{
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
    }
  })();

  console.log('Final initial content:', initialContent);

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