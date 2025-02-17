import axios from 'axios';
import { useState } from 'react';
import type { 
  UpdateProjectData, 
  UpdateProjectHookReturn, 
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  ProjectVersion 
} from '@/types/types';

export function useUpdateProject(projectId: string): UpdateProjectHookReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProject = async (data: UpdateProjectData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Primeiro, buscar o projeto atual
      const currentProject = await axios.get(`http://localhost:3001/projects/${projectId}`);
      
      // Mesclar os dados existentes com as atualizações
      const updatedData = {
        ...currentProject.data,
        ...data,
        updatedAt: new Date().toISOString()
      };

      const response = await axios.patch(`http://localhost:3001/projects/${projectId}`, updatedData);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateName = async (name: string) => {
    return updateProject({ name });
  };

  const updateDescription = async (description: string) => {
    return updateProject({ description });
  };

  const updateContent = async (content: any) => {
    return updateProject({ content });
  };

  const addVersion = async (newVersion: ProjectVersion) => {
    const response = await axios.get(`http://localhost:3001/projects/${projectId}`);
    const currentVersions = response.data.version || [];
    
    return updateProject({
      version: [...currentVersions, newVersion]
    });
  };

  const updateLogo = async (logo: string) => {
    return updateProject({ logo });
  };

  const updateBanner = async (banner: string) => {
    return updateProject({ banner });
  };

  const updateWordCount = async (wordCount: number) => {
    return updateProject({ wordCount });
  };

  const updateCitations = async (citations: string[]) => {
    return updateProject({ citations });
  };

  const updateModel = async (model: ProjectModel) => {
    return updateProject({ model });
  };

  const updateVisibility = async (visibility: ProjectVisibility) => {
    return updateProject({ visibility });
  };

  const updateProgress = async (progress: number) => {
    return updateProject({ progress });
  };

  const updateType = async (type: ProjectType) => {
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
    isLoading,
    error
  };
} 