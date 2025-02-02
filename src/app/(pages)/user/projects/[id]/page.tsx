"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { Main } from "@/components/Main";
import { Header } from "@/components/header";
import { NewProject } from "@/components/newProject";
import { useGetProject } from '@/hooks/useGetProject';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [userId] = useState("1");
  
  const { 
    isLoading, 
    error, 
    name, 
    description, 
    content,
    project 
  } = useGetProject(projectId);

  // Verificação de autorização
  if (project && project.userId !== userId) {
    return <div>Acesso não autorizado</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar projeto: {error.message}</div>;
  }

  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 transition-all duration-300">
        <Main>
          <Header/>
          <NewProject 
            initialContent={content ? JSON.stringify(content) : undefined}
            initialName={name}
            initialDescription={description}
          />
        </Main>
      </div>

      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  );
}