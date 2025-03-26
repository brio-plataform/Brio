"use client"

import { Main } from "@/components/Main";
import { AISideBar } from "@/components/AI-SideBar/ai-sidebar";

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useGetProject } from '@/hooks/useGetProjectByID';

import UnauthorizedPage from "@/components/Error/Unauthorized/unauthorized";
import ErrorPage from "@/components/Error/NotFound/notFound";
import LoadingProject from "@/components/Loading/loading-project";
import { Project } from "@/components/project/Project";
import { ProjectViewerHeader } from "@/components/Header/ViewHeader/ViewHeader";

export default function ViewProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  // Usando o hook useSession do Next Auth
  const { data: session, status } = useSession();
  
  const { 
    isLoading, 
    error,
    project 
  } = useGetProject(projectId);

  const [isAuthorized, setIsAuthorized] = useState(false);

  // Verificação de autorização quando o projeto e a sessão estiverem disponíveis
  useEffect(() => {
    if (project) {
      const currentUserId = session?.user?.id;
      
      // Verifica se o usuário é o proprietário (embora não seja o caso principal aqui)
      const isOwner = currentUserId ? project.userId === currentUserId : false;
      
      // Verifica se o usuário é colaborador
      const isCollaborator = currentUserId ? project.collaborators?.some(
        (collaborator) => collaborator.userId === currentUserId
      ) : false;
      
      // Verifica se o projeto é público ou institucional
      const isPublic = project.visibility === 'public';
      const isInstitutional = project.visibility === 'shared';
      
      console.log("Verificação de autorização (view):", {
        currentUserId,
        projectUserId: project.userId,
        isOwner,
        isCollaborator,
        visibility: project.visibility,
        isPublic,
        isInstitutional
      });
      
      // Na rota de visualização, o usuário só pode ver projetos públicos/institucionais
      // ou se for proprietário/colaborador
      const userHasAccess = isPublic || isInstitutional || isOwner || isCollaborator;
      console.log("Usuário tem acesso (view):", userHasAccess);
      
      setIsAuthorized(Boolean(userHasAccess));
    }
  }, [project, session]);

  // Debug de carregamento
  if (status === "loading" || isLoading) {
    return <LoadingProject />;
  }

    // Se não tiver projeto ou acesso não autorizado
    if (!project || !isAuthorized || (error && error.message?.includes('403'))) {
      return <UnauthorizedPage />;
    }

  // Debug de erro
  if (error) {
    return <ErrorPage error={error} />;
  }



  // Extrair o nome do projeto de forma segura
  const projectName = project?.name || "";

  return (
    <>
      <div className="flex-1 transition-all duration-300">
        <Main>
          <ProjectViewerHeader projectId={projectId} />
          <Project editable={false} projectId={projectId} />
        </Main>
      </div>

      <div className="sticky top-0 h-screen flex">
        <AISideBar 
          context={projectName} 
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