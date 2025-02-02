"use client"

import { Card, CardContent } from "../ui/card";
import Editor from "../Editor/editor";
import { ProjectBanner } from "./ProjectBanner";
import { ProjectInfo } from "./ProjectInfo";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetProject } from '@/hooks/useGetProject';

export function NewProject() {
  const params = useParams();
  const projectId = params.id as string;
  const [userId] = useState("1");
  
  const { 
    isLoading, 
    error,
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
    <div className="p-6 w-full">
      <ProjectBanner />

      <div className="mb-6">
        <ProjectInfo/>
      </div>

      <div className="flex justify-center items-center pb-5 w-full">
        <Card className="w-full">
          <CardContent className="p-4 min-h-[300px] w-full">
            <Editor initialContent={content ? JSON.stringify(content) : undefined} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}