import { trpc } from '@/utils/trpc';
import type { 
  UpdateProjectData, 
  UpdateProjectHookReturn, 
  Project,
  ProjectVisibility,
  ProjectType,
  ProjectVersion,
  ProjectModel,
  ContentBlock
} from '@/types/types';

export function useUpdateProject(projectId: string): UpdateProjectHookReturn {
  const utils = trpc.useUtils();
  const { mutateAsync: updateProjectMutation, isPending, error } = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.getById.invalidate(projectId);
      utils.project.getAll.invalidate();
    }
  });

  const updateProject = async (data: UpdateProjectData): Promise<Project> => {
    const project = await updateProjectMutation({ id: projectId, ...data });
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
    };
  };

  const updateName = async (name: string): Promise<Project> => {
    return updateProject({ name });
  };

  const updateDescription = async (description: string): Promise<Project> => {
    return updateProject({ description });
  };

  const updateContent = async (content: ContentBlock[]): Promise<Project> => {
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