import api from '@/utils/axios';
import { useState, useEffect } from 'react';
import type { 
  ProjectHookReturn, 
  ContentBlock,
  ProjectVersion,
  ProjectStats,
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  Project as ImportedProject
} from '@/types/types';

// Interface temporária para mapear a resposta da API
interface APIProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  wordCount: number;
  citations: string[];
  model: ProjectModel;
  visibility: ProjectVisibility;
  progress: number;
  type: string; // API retorna string, precisamos converter para ProjectType
  author: {
    name: string;
    avatar: string;
    institution: string;
  };
  stats: ProjectStats;
  version: ProjectVersion[];
  content: {
    id: string;
    type: string;
    props: {
      textColor: string;
      backgroundColor: string;
      textAlignment: string;
      level?: number;
    };
    content: any[];
    children: any[];
  }[];
  updatedAt: string;
  createdAt: string;
  collaborators?: {
    name: string;
    avatar: string;
  }[];
  tags?: string[];
}

export function useGetProject(projectId: string): ProjectHookReturn {
  const [project, setProject] = useState<ImportedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        const response = await api.get<APIProject>(`/projects/${projectId}`);
        const apiProject = response.data;
        
        // Preservar os dados existentes
        const convertedProject: ImportedProject = {
          ...apiProject,
          title: apiProject.name,
          type: apiProject.type as ProjectType,
          collaborators: apiProject.collaborators || [],
          tags: apiProject.tags || [],
          logo: apiProject.logo || "",
          banner: apiProject.banner || "",
          content: apiProject.content.map(item => ({
            ...item,
            type: item.type as "heading" | "paragraph" | "image" | "bulletListItem"
          })) as ContentBlock[]
        };
        
        setProject(convertedProject);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Create a memoized object with the project data
  const projectData: ProjectHookReturn = {
    project,
    isLoading,
    error,
    // Basic project info
    name: project?.name,
    description: project?.description,
    type: project?.type,
    // Content and versions
    content: project?.content,
    versions: project?.version,
    lastVersion: project?.version?.[project?.version?.length - 1],
    // Metadata
    updatedAt: project?.updatedAt,
    createdAt: project?.createdAt,
    userId: project?.userId,
    // Media
    logo: project?.logo,
    banner: project?.banner,
    // Stats and metrics
    wordCount: project?.wordCount,
    citations: project?.citations,
    progress: project?.progress,
    // Settings
    model: project?.model,
    visibility: project?.visibility,
    // Author and stats
    author: project?.author,
    stats: project?.stats
  };

  return projectData;
}