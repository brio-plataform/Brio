"use client"

import { Main } from "@/components/Main";
import { RightSidebar } from "@/components/Right-SideBar/right-sidebar";
import { useParams } from 'next/navigation';
import { useGetProject } from '@/hooks/useGetProjectByID';
import UnauthorizedPage from "@/components/Error/Unauthorized/unauthorized";
import ErrorPage from "@/components/Error/NotFound/notFound";
import LoadingProject from "@/components/Loading/loading-project";
import { Project } from "@/components/project/Project";
import { Header } from "@/components/Header/CreateHeader/header";
import { MOCK_REVIEWS, MOCK_SECTIONS } from "@/components/Right-SideBar/mockData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProjectPage() {
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
    if (project && session?.user) {
      const currentUserId = session.user.id;
      
      // Verifica se o usuário é o proprietário do projeto
      const isOwner = project.userId === currentUserId;
      
      // Se estamos na rota de projetos do usuário, ele deve poder ver todos os seus projetos
      // independente da visibilidade
      
      // Para projetos que não são do usuário, verificamos se ele é colaborador
      const isCollaborator = !isOwner && project.collaborators?.some(
        (collaborator) => collaborator.userId === currentUserId
      );
      
      console.log("Verificação de autorização:", {
        currentUserId,
        projectUserId: project.userId,
        isOwner,
        isCollaborator,
        visibility: project.visibility,
      });
      
      // Na rota de projetos do usuário, o próprio usuário tem acesso a todos os seus projetos
      // independentemente da visibilidade
      const userHasAccess = isOwner || isCollaborator;
      console.log("Usuário tem acesso:", userHasAccess);
      
      setIsAuthorized(userHasAccess);
    }
  }, [project, session]);

  console.log("Status da sessão:", status);
  console.log("Dados da sessão:", session);
  console.log("Dados do projeto:", project);
  console.log("Autorização:", isAuthorized);

  // Debug de carregamento
  if (status === "loading" || isLoading) {
    console.log("Carregando projeto ou sessão...");
    return <LoadingProject />;
  }

  // Verificar se o usuário está autenticado
  if (status === "unauthenticated") {
    console.log("Usuário não autenticado");
    return <UnauthorizedPage />;
  }

  // Debug de erro
  if (error) {
    console.log("Erro ao carregar projeto:", error);
    return <ErrorPage error={error} />;
  }

  // Debug se o projeto existe
  if (!project) {
    console.log("Projeto não encontrado");
    return <ErrorPage error={new Error("Projeto não encontrado")} />;
  }

  // Verificação de autorização após confirmar que o projeto existe
  if (!isAuthorized) {
    console.log("Acesso não autorizado");
    return <UnauthorizedPage />;
  }

  // Se chegou até aqui, temos um projeto válido e autorizado
  console.log("Projeto carregado com sucesso e autorizado");

  return (
    <>
      <div className="flex-1 transition-all duration-300">
        <Main>
          <Header />
          <Project editable={true} projectId={projectId} />
        </Main>
      </div>

      <div className="sticky top-0 h-screen">
        <RightSidebar reviews={MOCK_REVIEWS} sections={MOCK_SECTIONS} />
      </div>
    </>
  );
}