import { useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import type { Project } from '../types/project';

interface ProjectsHookReturn {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage all projects
 * Uses the project store for state management
 */
export function useGetProjectsAll(): ProjectsHookReturn {
  const { projects, loading, error, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading: loading,
    error,
    refetch: fetchProjects
  };
}