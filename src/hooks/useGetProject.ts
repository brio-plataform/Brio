import axios from 'axios';
import { useState, useEffect } from 'react';

interface Version {
  version: string;
  updatedAt: string;
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
  comments: number;
}

interface ContentProps {
  textColor: string;
  backgroundColor: string;
  textAlignment: string;
}

interface Content {
  id: string;
  type: string;
  props: ContentProps;
  content: any[];
  children: any[];
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
  author: Author;
  stats: Stats;
  version: Version[];
  content: Content[];
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
        const response = await axios.get<Project>(`http://localhost:3001/projects/${projectId}`);
        console.log('Project data received:', response.data); // Debug log
        console.log('Author:', response.data.author); // Debug author
        console.log('Stats:', response.data.stats); // Debug stats
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Create a memoized object with the project data
  const projectData = {
    project,
    isLoading,
    error,
    // Basic project info
    name: project?.name,
    description: project?.description,
    type: project?.type,
    // Content and versions
    content: project?.content,
    versions: project?.version,
    lastVersion: project?.version?.[project?.version?.length - 1],
    // Metadata
    updatedAt: project?.updatedAt,
    createdAt: project?.createdAt,
    userId: project?.userId,
    // Media
    logo: project?.logo,
    banner: project?.banner,
    // Stats and metrics
    wordCount: project?.wordCount,
    citations: project?.citations,
    progress: project?.progress,
    // Settings
    model: project?.model,
    visibility: project?.visibility,
    // Author and stats
    author: project?.author,
    stats: project?.stats
  };

  console.log('Returned project data:', projectData); // Debug log
  return projectData;
} 