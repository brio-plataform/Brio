import { create } from 'zustand'
import { projectApi } from '../services/api'
import type { Project, ProjectCreate, ProjectUpdate } from '../types/project'

interface ProjectStoreState {
  // Estado
  currentProject: Project | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  editorContent: string | null;

  // Ações
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

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  currentProject: null,
  projects: [],
  loading: false,
  error: null,
  editorContent: null,

  /**
   * Set the current project
   */
  setCurrentProject: (project: Project | null) => {
    set({ currentProject: project })
  },

  /**
   * Fetch all projects
   */
  fetchProjects: async () => {
    set({ loading: true, error: null })
    try {
      const projects = await projectApi.getAll()
      set({ projects, loading: false })
    } catch (error) {
      set({ error: 'Erro ao buscar projetos', loading: false })
    }
  },

  /**
   * Create a new project
   */
  createProject: async (data: ProjectCreate): Promise<Project> => {
    set({ loading: true, error: null })
    try {
      const newProject = await projectApi.create(data)
      set((state) => ({
        projects: [...state.projects, newProject],
        currentProject: newProject,
        loading: false
      }))
      return newProject
    } catch (error) {
      set({ error: 'Erro ao criar projeto', loading: false })
      throw error
    }
  },

  /**
   * Update the current project
   */
  updateProject: async (data: ProjectUpdate): Promise<Project> => {
    const currentProject = get().currentProject
    if (!currentProject) {
      throw new Error('No project selected')
    }

    set({ loading: true, error: null })
    try {
      const updatedProject = await projectApi.update(currentProject.id, data)
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        ),
        loading: false
      }))
      return updatedProject
    } catch (error) {
      set({ error: 'Erro ao atualizar projeto', loading: false })
      throw error
    }
  },

  /**
   * Delete a project
   */
  deleteProject: async (id: string): Promise<void> => {
    set({ loading: true, error: null })
    try {
      await projectApi.delete(id)
      set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        loading: false
      }))
    } catch (error) {
      set({ error: 'Erro ao deletar projeto', loading: false })
      throw error
    }
  },

  /**
   * Update project content
   */
  updateProjectContent: async (content: any): Promise<Project> => {
    const currentProject = get().currentProject
    if (!currentProject) {
      throw new Error('Nenhum projeto selecionado')
    }

    set({ loading: true, error: null })
    try {
      const updatedProject = await projectApi.updateContent(currentProject.id, content)
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        ),
        loading: false
      }))
      return updatedProject
    } catch (error) {
      set({ error: 'Erro ao atualizar conteúdo do projeto', loading: false })
      throw error
    }
  },

  /**
   * Set editor content
   */
  setEditorContent: (content: string | null) => {
    set({ editorContent: content })
  },

  /**
   * Save editor content
   */
  saveEditorContent: async (): Promise<Project> => {
    const { currentProject, editorContent } = get()
    if (!currentProject || !editorContent) {
      throw new Error('Nenhum conteúdo para salvar')
    }

    set({ loading: true, error: null })
    try {
      const updatedProject = await projectApi.updateContent(
        currentProject.id,
        JSON.parse(editorContent)
      )
      
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        ),
        editorContent: null,
        loading: false
      }))
      return updatedProject
    } catch (error) {
      set({ error: 'Erro ao salvar conteúdo', loading: false })
      throw error
    }
  },

  /**
   * Update a specific project field
   */
  updateProjectField: async <T extends keyof Project>(
    field: T,
    value: Project[T]
  ): Promise<Project> => {
    const currentProject = get().currentProject
    if (!currentProject) {
      throw new Error('Nenhum projeto selecionado')
    }

    set({ loading: true, error: null })
    try {
      const updatedProject = await projectApi.updateField(
        currentProject.id,
        field,
        value
      )
      
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        ),
        loading: false
      }))
      return updatedProject
    } catch (error) {
      set({ error: 'Erro ao atualizar campo do projeto', loading: false })
      throw error
    }
  }
})) 