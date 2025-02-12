"use client"

import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";
import { RightSidebar } from "@/components/Right-SideBar/right-sidebar";
import { Main } from "@/components/Main";
import { Header } from "@/components/Header/CreateHeader/header";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetProject } from '@/hooks/useGetProject';

import UnauthorizedPage from "@/components/Error/Unauthorized/unauthorized";
import LoadingProject from "@/components/Loading/loading-project";
import { Project } from "@/components/Project/Project";


import { MOCK_REVIEWS, MOCK_SECTIONS } from "@/components/Right-SideBar/mockData";
import NotFound from "@/components/Error/NotFound/notFound";

export default function ProjectPage() {

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
    return <NotFound error={error} />;
  }



  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 transition-all duration-300">
        <Main>
          <Header/>
          <Project />
        </Main>
      </div>

      <div className="sticky top-0 h-screen">
        <RightSidebar reviews={MOCK_REVIEWS} sections={MOCK_SECTIONS} />
      </div>
    </div>

  );
}