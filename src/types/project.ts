/**
 * Project Types
 * This file contains all type definitions related to projects
 */

export type ProjectModel = 'article' | 'document' | 'presentation';
export type ProjectVisibility = 'public' | 'private' | 'shared';
export type ProjectType = 'document' | 'presentation' | 'article';

export interface ProjectAuthor {
  userId: string;
}

export interface ProjectStats {
  views: number;
  stars: number;
  forks: number;
  comments: number;
  shares: number;
}

export interface ProjectVersion {
  version: string;
  updatedAt: string;
}

export interface ProjectCollaborator {
  userId: string;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'bulletListItem';
  props: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
    level?: number;
  };
  content: any[];
  children: any[];
}

/**
 * Main Project interface
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  wordCount: number;
  model: ProjectModel;
  visibility: ProjectVisibility;
  progress: number;
  status: string;
  type: ProjectType;
  citations: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  author: ProjectAuthor;
  stats: ProjectStats;
  version: ProjectVersion[];
  collaborators: ProjectCollaborator[];
  content: ContentBlock[];
  title?: string;
}

/**
 * Type for creating a new project
 */
export type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for updating a project
 */
export type ProjectUpdate = Partial<ProjectCreate>;

/**
 * Type for project store state and actions
 */
export interface ProjectState {
  // State
  currentProject: Project | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  editorContent: string | null;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  fetchProjects: () => Promise<void>;
  createProject: (data: ProjectCreate) => Promise<Project>;
  updateProject: (data: ProjectUpdate) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  updateProjectContent: (content: any) => Promise<Project>;
  setEditorContent: (content: string | null) => void;
  saveEditorContent: () => Promise<Project>;
  updateProjectField: <T extends keyof Project>(field: T, value: Project[T]) => Promise<Project>;
}

export interface ProjectHookReturn {
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  name?: string;
  description?: string;
  type?: ProjectType;
  content?: ContentBlock[];
  versions?: ProjectVersion[];
  lastVersion?: ProjectVersion;
  updatedAt?: string;
  createdAt?: string;
  userId?: string;
  logo?: string;
  banner?: string;
  wordCount?: number;
  citations?: string[];
  progress?: number;
  model?: ProjectModel;
  visibility?: ProjectVisibility;
  author?: ProjectAuthor;
  stats?: ProjectStats;
} 