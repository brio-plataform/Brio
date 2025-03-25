import { useProjectStore } from '../store/useProjectStore';
import type { 
  Project,
  ProjectUpdate,
  ProjectVersion,
  ProjectModel,
  ProjectVisibility,
  ProjectType
} from '../types/project';

interface UpdateProjectHookReturn {
  updateProject: ((data: ProjectUpdate) => Promise<Project>) | null;
  updateName: ((name: string) => Promise<Project>) | null;
  updateDescription: ((description: string) => Promise<Project>) | null;
  updateContent: ((content: any) => Promise<Project>) | null;
  addVersion: ((version: ProjectVersion) => Promise<Project>) | null;
  updateLogo: ((logo: string) => Promise<Project>) | null;
  updateBanner: ((banner: string) => Promise<Project>) | null;
  updateWordCount: ((wordCount: number) => Promise<Project>) | null;
  updateCitations: ((citations: string[]) => Promise<Project>) | null;
  updateModel: ((model: ProjectModel) => Promise<Project>) | null;
  updateVisibility: ((visibility: ProjectVisibility) => Promise<Project>) | null;
  updateProgress: ((progress: number) => Promise<Project>) | null;
  updateType: ((type: ProjectType) => Promise<Project>) | null;
  isLoading: boolean;
  error: string | null;
  hasProject: boolean;
}

/**
 * Hook to update project data
 * Uses the project store for state management
 */
export function useUpdateProject(): UpdateProjectHookReturn {
  const { 
    currentProject,
    loading,
    error,
    updateProject: storeUpdateProject,
    updateProjectField
  } = useProjectStore();

  const hasProject = !!currentProject;

  if (!hasProject) {
    return {
      updateProject: null,
      updateName: null,
      updateDescription: null,
      updateContent: null,
      addVersion: null,
      updateLogo: null,
      updateBanner: null,
      updateWordCount: null,
      updateCitations: null,
      updateModel: null,
      updateVisibility: null,
      updateProgress: null,
      updateType: null,
      isLoading: loading,
      error: 'No project selected',
      hasProject: false
    };
  }

  const updateProject = async (data: ProjectUpdate) => {
    return storeUpdateProject(data);
  };

  const updateName = async (name: string) => {
    return updateProjectField('name', name);
  };

  const updateDescription = async (description: string) => {
    return updateProjectField('description', description);
  };

  const updateContent = async (content: any) => {
    return updateProjectField('content', content);
  };

  const addVersion = async (version: ProjectVersion) => {
    const currentVersions = currentProject.version || [];
    return updateProjectField('version', [...currentVersions, version]);
  };

  const updateLogo = async (logo: string) => {
    return updateProjectField('logo', logo);
  };

  const updateBanner = async (banner: string) => {
    return updateProjectField('banner', banner);
  };

  const updateWordCount = async (wordCount: number) => {
    return updateProjectField('wordCount', wordCount);
  };

  const updateCitations = async (citations: string[]) => {
    return updateProjectField('citations', citations);
  };

  const updateModel = async (model: ProjectModel) => {
    return updateProjectField('model', model);
  };

  const updateVisibility = async (visibility: ProjectVisibility) => {
    return updateProjectField('visibility', visibility);
  };

  const updateProgress = async (progress: number) => {
    return updateProjectField('progress', progress);
  };

  const updateType = async (type: ProjectType) => {
    return updateProjectField('type', type);
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
    isLoading: loading,
    error,
    hasProject: true
  };
}