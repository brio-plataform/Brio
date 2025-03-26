import axios from 'axios';
import type { 
  Project,
  ProjectCreate,
  ProjectUpdate,
  ProjectVersion,
  ProjectModel,
  ProjectVisibility,
  ProjectType
} from '../types/project';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Project API Service
 * Handles all project-related API calls
 */
export const projectApi = {
  /**
   * Get all projects
   */
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  /**
   * Get a single project by ID
   */
  getProjectById: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  /**
   * Create a new project
   */
  create: async (data: ProjectCreate): Promise<Project> => {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  /**
   * Update a project
   */
  update: async (id: string, data: ProjectUpdate): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  /**
   * Delete a project
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  /**
   * Update project content
   */
  updateContent: async (id: string, content: any): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}`, { content });
    return response.data;
  },

  /**
   * Add a new version to a project
   */
  addVersion: async (id: string, version: ProjectVersion): Promise<Project> => {
    const project = await projectApi.getProjectById(id);
    const currentVersions = project.version || [];
    const response = await api.patch<Project>(`/projects/${id}`, {
      version: [...currentVersions, version]
    });
    return response.data;
  },

  /**
   * Update specific project fields
   */
  updateField: async <T extends keyof Project>(
    id: string, 
    field: T, 
    value: Project[T]
  ): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}`, {
      [field]: value,
      updatedAt: new Date().toISOString()
    });
    return response.data;
  },
  
  /**
   * Add a collaborator to a project
   */
  addCollaborator: async (
    projectId: string,
    userId: string
  ): Promise<Project> => {
    const response = await api.post<Project>(`/projects/${projectId}/collaborators`, {
      userId
    });
    return response.data;
  },
  
  /**
   * Remove a collaborator from a project
   */
  removeCollaborator: async (
    projectId: string,
    collaboratorId: string
  ): Promise<Project> => {
    const response = await api.delete<Project>(`/projects/${projectId}/collaborators/${collaboratorId}`);
    return response.data;
  },
  
  /**
   * Update project author
   */
  updateAuthor: async (
    projectId: string,
    userId: string
  ): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${projectId}`, {
      author: { userId }
    });
    return response.data;
  }
};

export default api; 