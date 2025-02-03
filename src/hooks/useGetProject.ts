import axios from 'axios';
import { useState, useEffect } from 'react';

interface Version {
  version: string;
  updatedAt: string;
}

interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  wordCount: number;
  citations: string[];
  model: 'article' | 'thesis' | 'book' | 'research';
  visibility: 'private' | 'public' | 'institutional';
  progress: number;
  type: string;
  version: Version[];
  content: any;
  updatedAt: string;
  createdAt: string;
}

export function useGetProject(projectId: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        const response = await axios.get(`http://localhost:3001/projects/${projectId}`);
        console.log('Fetched project:', response.data); // Debug log
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err); // Debug log
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return {
    project,
    isLoading,
    error,
    name: project?.name,
    description: project?.description,
    content: project?.content,
    versions: project?.version,
    lastVersion: project?.version?.[project.version?.length - 1],
    updatedAt: project?.updatedAt,
    userId: project?.userId,
    logo: project?.logo,
    banner: project?.banner,
    createdAt: project?.createdAt,
    wordCount: project?.wordCount,
    citations: project?.citations,
    model: project?.model,
    visibility: project?.visibility,
    progress: project?.progress,
    type: project?.type
  };
} 