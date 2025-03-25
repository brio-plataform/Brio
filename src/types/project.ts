/**
 * Project Types
 * This file contains all type definitions related to projects
 */

export type ProjectModel = 'article' | 'research' | 'thesis';
export type ProjectVisibility = 'public' | 'private' | 'institutional';
export type ProjectType = 'document' | 'presentation' | 'spreadsheet';

export interface ProjectAuthor {
  name: string;
  avatar: string;
  institution: string;
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
  name: string;
  avatar: string;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'bulletListItem';
  props: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
    level?: number;
    name?: string;
    url?: string;
    caption?: string;
    showPreview?: boolean;
    previewWidth?: number;
  };
  content: {
    type: string;
    text: string;
    styles: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
  }[];
  children: ContentBlock[];
}

/**
 * Main Project interface
 */
export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  banner: string;
  wordCount: number;
  citations: string[];
  model: ProjectModel;
  visibility: ProjectVisibility;
  progress: number;
  type: ProjectType;
  author: ProjectAuthor;
  collaborators: ProjectCollaborator[];
  stats: ProjectStats;
  version: ProjectVersion[];
  content: ContentBlock[];
  tags: string[];
}

/**
 * Type for creating a new project
 */
export type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'version'>;

/**
 * Type for updating a project
 */
export type ProjectUpdate = Partial<ProjectCreate> & {
  updatedAt?: string;
};

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