import { create } from 'zustand'
import type { ProjectState } from '@/types/types'

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

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  projects: [],
  loading: false,
  error: null,
  editorContent: null,

  setCurrentProject: (project) => {
    console.log('Setting current project:', project);
    set({ currentProject: project });
  },

  saveProject: async (projectData) => {
    const currentProject = get().currentProject;
    set((state) => ({
      currentProject: currentProject ? {
        ...currentProject,
        ...projectData,
        logo: projectData.logo || currentProject.logo,
        banner: projectData.banner || currentProject.banner,
      } : null,
    }));
  },

  updateProjectContent: async (content) => {
    const currentProject = get().currentProject
    if (!currentProject) return

    try {
      await get().saveProject({
        ...currentProject,
        content,
        updatedAt: new Date().toISOString()
      })
    } catch (error) {
      set({ error: 'Failed to update project content' })
    }
  },

  fetchProjects: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/projects')
      const projects = await response.json()
      set({ projects, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch projects', loading: false })
    }
  },

  deleteProject: async (id) => {
    set({ loading: true })
    try {
      await fetch(`http://localhost:3001/projects/${id}`, {
        method: 'DELETE'
      })
      set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to delete project', loading: false })
    }
  },

  setEditorContent: (content) => {
    set({ editorContent: content });
    // Opcionalmente, podemos implementar um debounce aqui para auto-save
  },

  saveEditorContent: async () => {
    const { currentProject, editorContent } = get();
    if (!currentProject || !editorContent) return;

    try {
      set({ loading: true });
      
      const updatedProject = {
        ...currentProject,
        content: JSON.parse(editorContent),
        updatedAt: new Date().toISOString(),
        version: currentProject.version || []
      };

      const response = await fetch(`http://localhost:3001/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      const savedProject = await response.json();
      
      set((state) => ({
        currentProject: savedProject,
        projects: state.projects.map(p => 
          p.id === savedProject.id ? savedProject : p
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to save editor content', loading: false });
    }
  },

  updateProjectField: (field, value) => set((state) => ({
    currentProject: state.currentProject ? {
      ...state.currentProject,
      [field]: value
    } : null
  })),
})) 