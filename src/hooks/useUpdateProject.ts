import axios from 'axios';
import { useState } from 'react';

interface Version {
  version: string;
  updatedAt: string;
}

interface UpdateProjectData {
  name?: string;
  description?: string;
  content?: any;
  version?: Version[];
  logo?: string;
  banner?: string;
  wordCount?: number;
  citations?: string[];
  model?: 'article' | 'thesis' | 'book' | 'research';
  visibility?: 'private' | 'public' | 'institutional';
  progress?: number;
  type?: string;
}

export function useUpdateProject(projectId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProject = async (data: UpdateProjectData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`http://localhost:3001/projects/${projectId}`, {
        ...data,
        updatedAt: new Date().toISOString()
      });
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

  const addVersion = async (newVersion: Version) => {
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

  const updateModel = async (model: 'article' | 'thesis' | 'book' | 'research') => {
    return updateProject({ model });
  };

  const updateVisibility = async (visibility: 'private' | 'public' | 'institutional') => {
    return updateProject({ visibility });
  };

  const updateProgress = async (progress: number) => {
    return updateProject({ progress });
  };

  const updateType = async (type: string) => {
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