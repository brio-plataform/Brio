"use client"

import { Main } from "@/components/Main";
import { AISideBar } from "@/components/AI-SideBar/ai-sidebar";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetProject } from '@/hooks/useGetProjectByID';

import UnauthorizedPage from "@/components/Error/Unauthorized/unauthorized";
import ErrorPage from "@/components/Error/NotFound/notFound";
import LoadingProject from "@/components/Loading/loading-project";
import { Project } from "@/components/Project/Project";
import { ProjectViewerHeader } from "@/components/Header/ViewHeader/ViewHeader";

export default function ViewProjectPage() {

  const params = useParams();
  const projectId = params.id as string;
  const [userId] = useState("1");
  
  const { 
    isLoading, 
    error,
    project 
  } = useGetProject(projectId);

  // Verificação de autorização
  if (project && project.userId !== userId) {
    return (
      <UnauthorizedPage />
    );
  }

  if (isLoading) {
    return <LoadingProject />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }


  return (
      <>
      <div className="flex-1 transition-all duration-300">
        <Main>
          <ProjectViewerHeader projectId={projectId} />
          <Project editable={false} />
        </Main>
      </div>

      <div className="sticky top-0 h-screen flex">
        <AISideBar 
          context={project?.name} 
          onSendMessage={async (message) => {
            // Implementar lógica de envio
            console.log("Enviando mensagem:", message)
          }}
          onSuggestionClick={(suggestion) => {
            // Implementar lógica de sugestão
            console.log("Sugestão clicada:", suggestion)
          }}
        />
      </div>
      </>
  );
}