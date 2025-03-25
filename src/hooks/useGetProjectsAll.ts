import { trpc } from '@/utils/trpc';
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

export function useGetProjectsAll(): ProjectsHookReturn {
  const { data: projects, isLoading, error, refetch } = trpc.project.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: 1
  });

  const convertedProjects = projects?.map(project => ({
    id: project.id,
    title: project.name,
    name: project.name,
    type: project.model as ProjectType,
    model: project.model as ProjectModel,
    visibility: project.visibility as ProjectVisibility,
    description: project.description || '',
    logo: project.logo || '',
    banner: project.banner || '',
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    citations: [],
    collaborators: [],
    author: {
      name: '',
      avatar: '',
      institution: ''
    },
    stats: {
      views: 0,
      stars: 0,
      forks: 0,
      citations: 0,
      comments: 0
    },
    version: [],
    content: [],
    tags: project.tags || [],
    status: project.status || 'Em Andamento',
    progress: project.progress || 0,
    wordCount: project.wordCount || 0,
    userId: project.userId
  })) || [];

  return {
    projects: convertedProjects,
    isLoading,
    error: error as Error | null,
    refetch: async () => {
      await refetch();
    }
  };
}