import api from '@/utils/axios';
import { useState, useEffect } from 'react';
import type { 
  ProjectType,
  ProjectModel,
  ProjectVisibility,
  ProjectStats,
  ContentBlock,
  Project as ImportedProject
} from '@/types/types';

interface ProjectsHookReturn {
  projects: ImportedProject[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Interface para mapear a resposta da API
interface APIProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  banner: string;
  wordCount: number;
  citations: string[];
  model: ProjectModel;
  visibility: ProjectVisibility;
  progress: number;
  type: string;
  author: {
    name: string;
    avatar: string;
    institution: string;
  };
  stats: ProjectStats;
  version: {
    version: string;
    updatedAt: string;
  }[];
  content: ContentBlock[];
}

export function useGetProjectsAll(): ProjectsHookReturn {
  const [projects, setProjects] = useState<ImportedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<APIProject[]>('/projects');
      
      const convertedProjects = response.data.map(apiProject => ({
        ...apiProject,
        title: apiProject.name,
        type: apiProject.type as ProjectType,
        collaborators: [],
        tags: [],
        content: apiProject.content.map(item => ({
          ...item,
          type: item.type as "heading" | "paragraph" | "image" | "bulletListItem"
        }))
      }));
      
      setProjects(convertedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
    refetch: fetchProjects
  };
}