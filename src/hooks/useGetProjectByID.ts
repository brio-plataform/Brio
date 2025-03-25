import { trpc } from '@/utils/trpc';
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
  const { data: project, isLoading, error } = trpc.project.getById.useQuery(projectId);

  // Create a memoized object with the project data
  const projectData: ProjectHookReturn = {
    project: project ? {
      ...project,
      title: project.name,
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
      content: []
    } : null,
    isLoading,
    error: error as Error | null,
    // Basic project info
    name: project?.name,
    description: project?.description || undefined,
    type: project?.model as ProjectType,
    // Content and versions
    content: [],
    versions: [],
    lastVersion: undefined,
    // Metadata
    updatedAt: project?.updatedAt?.toISOString(),
    createdAt: project?.createdAt?.toISOString(),
    userId: project?.userId,
    // Media
    logo: project?.logo || undefined,
    banner: project?.banner || undefined,
    // Stats and metrics
    wordCount: project?.wordCount || 0,
    citations: [],
    progress: project?.progress || 0,
    // Settings
    model: project?.model as ProjectModel,
    visibility: project?.visibility as ProjectVisibility,
    // Author and stats
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
    }
  };

  return projectData;
}