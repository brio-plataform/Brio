import { trpc } from '@/utils/trpc';
import type { 
  UpdateProjectData, 
  UpdateProjectHookReturn, 
  Project,
  ProjectVisibility,
  ProjectType,
  ProjectVersion,
  ProjectModel,
  ContentBlock,
  ProjectStats
} from '@/types/types';

interface Collaborator {
  name: string;
  avatar: string;
}

interface Author {
  name: string;
  avatar: string;
  institution: string;
}

interface Stats {
  views: number;
  stars: number;
  forks: number;
  citations: number;
  comments: number;
}

interface Version {
  version: string;
  updatedAt: string;
}

export function useUpdateProject(projectId: string): UpdateProjectHookReturn {
  const utils = trpc.useUtils();
  const { mutateAsync: updateProjectMutation, isPending, error } = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate(projectId);
      utils.project.getAll.invalidate();
    }
  });

  const updateProject = async (data: UpdateProjectData): Promise<Project> => {
    console.log('Updating project with data:', data);
    const project = await updateProjectMutation({ id: projectId, ...data });
    console.log('Received updated project:', project);

    // Ensure content is properly handled
    const content = typeof project.content === 'string' 
      ? JSON.parse(project.content) 
      : project.content || [];

    // Ensure other fields are properly typed
    const collaborators = Array.isArray(project.collaborators) 
      ? project.collaborators.map(c => {
          const collaborator = c as unknown as Collaborator;
          return {
            name: collaborator?.name || '',
            avatar: collaborator?.avatar || ''
          };
        })
      : [];

    const author = typeof project.author === 'object' && project.author !== null
      ? {
          name: String((project.author as unknown as Author)?.name || ''),
          avatar: String((project.author as unknown as Author)?.avatar || ''),
          institution: String((project.author as unknown as Author)?.institution || '')
        }
      : {
          name: '',
          avatar: '',
          institution: ''
        };

    const stats = typeof project.stats === 'object' && project.stats !== null
      ? {
          views: Number((project.stats as unknown as Stats)?.views || 0),
          stars: Number((project.stats as unknown as Stats)?.stars || 0),
          forks: Number((project.stats as unknown as Stats)?.forks || 0),
          citations: Number((project.stats as unknown as Stats)?.citations || 0),
          comments: Number((project.stats as unknown as Stats)?.comments || 0)
        }
      : {
          views: 0,
          stars: 0,
          forks: 0,
          citations: 0,
          comments: 0
        };

    const version = Array.isArray(project.version)
      ? project.version.map(v => {
          const versionObj = v as unknown as Version;
          return {
            version: versionObj?.version || '',
            updatedAt: versionObj?.updatedAt || ''
          };
        })
      : [];

    return {
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
      citations: project.citations || [],
      collaborators,
      author,
      stats,
      version,
      content
    };
  };

  const updateName = async (name: string): Promise<Project> => {
    return updateProject({ name });
  };

  const updateDescription = async (description: string): Promise<Project> => {
    return updateProject({ description });
  };

  const updateContent = async (content: ContentBlock[]): Promise<Project> => {
    console.log('Updating content:', content);
    return updateProject({ content });
  };

  const addVersion = async (newVersion: ProjectVersion): Promise<Project> => {
    const currentProject = await utils.project.getById.fetch(projectId);
    const currentVersions = (currentProject as any)?.version || [];
    
    return updateProject({
      version: [...currentVersions, newVersion]
    });
  };

  const updateLogo = async (logo: string): Promise<Project> => {
    return updateProject({ logo });
  };

  const updateBanner = async (banner: string): Promise<Project> => {
    return updateProject({ banner });
  };

  const updateWordCount = async (wordCount: number): Promise<Project> => {
    return updateProject({ wordCount });
  };

  const updateCitations = async (citations: string[]): Promise<Project> => {
    return updateProject({ citations });
  };

  const updateModel = async (model: ProjectModel): Promise<Project> => {
    return updateProject({ model });
  };

  const updateVisibility = async (visibility: ProjectVisibility): Promise<Project> => {
    return updateProject({ visibility });
  };

  const updateProgress = async (progress: number): Promise<Project> => {
    return updateProject({ progress });
  };

  const updateType = async (type: ProjectType): Promise<Project> => {
    return updateProject({ type });
  };

  return {
    updateProject,
    updateName,
    updateDescription,
    updateContent,
    addVersion,
    updateLogo,
    updateBanner,
    updateWordCount,
    updateCitations,
    updateModel,
    updateVisibility,
    updateProgress,
    updateType,
    isLoading: isPending,
    error: error as Error | null
  };
}