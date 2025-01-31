"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { Main } from "@/components/Main";
import { Header } from "@/components/header";
import { NewProject } from "@/components/newProject";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [projectContent, setProjectContent] = useState<string | null>(null);
  const [userId] = useState("1"); // ID deve vir de um sistema de autenticação

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Buscar diretamente do endpoint de projetos
        const response = await axios.get(
          `http://localhost:3001/projects/${projectId}`
        );
        
        // Verificar se o projeto pertence ao usuário
        if (response.data.userId !== userId) {
          throw new Error('Acesso não autorizado');
        }
  
        setProjectContent(JSON.stringify(response.data.content));
        
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        setProjectContent(null);
      } finally {
        setLoading(false);
      }
    };
  
    loadProject();
  }, [projectId, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 transition-all duration-300">
        <Main>
          <Header />
          <NewProject initialContent={projectContent} />
        </Main>
      </div>

      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  );
}