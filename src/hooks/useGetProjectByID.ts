import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { projectApi } from '@/services/api';
import type { 
  ProjectHookReturn, 
  ContentBlock,
  ProjectVersion,
  ProjectStats,
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  Project as ImportedProject
} from '@/types/project';

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
  type: string;
  author: {
    userId: string;
  };
  stats: ProjectStats;
  version: ProjectVersion[];
  content: ContentBlock[];
  updatedAt: string;
  createdAt: string;
  collaborators?: {
    userId: string;
  }[];
  tags?: string[];
}

export function useGetProjectByID(id: string) {
  const { currentProject, setCurrentProject, loading, error } = useProjectStore();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await projectApi.getProjectById(id);
        setCurrentProject(project);
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, setCurrentProject]);

  return {
    project: currentProject,
    loading,
    error,
  };
}

export function useGetProject(projectId: string): ProjectHookReturn {
  const [project, setProject] = useState<ImportedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        const project = await projectApi.getProjectById(projectId);
        console.log("Dados do projeto recebidos:", project);
        
        const convertedProject: ImportedProject = {
          ...project,
          title: project.name,
          type: project.type as ProjectType,
          collaborators: project.collaborators?.map((c: any) => ({
            userId: c.userId
          })) || [],
          author: {
            userId: project.author?.userId || ""
          },
          tags: project.tags || [],
          logo: project.logo || "",
          banner: project.banner || "",
          content: project.content.map((item: ContentBlock) => ({
            ...item,
            type: item.type
          }))
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