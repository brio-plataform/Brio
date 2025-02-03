import { create } from 'zustand'

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

interface ProjectStore {
  currentProject: Project | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setCurrentProject: (project: Project | null) => void;
  saveProject: (project: Partial<Project>) => Promise<void>;
  updateProjectContent: (content: any) => Promise<void>;
  fetchProjects: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Novas actions para o editor
  editorContent: string | null;
  setEditorContent: (content: string) => void;
  saveEditorContent: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
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
    set({ loading: true });
    try {
      const currentProject = get().currentProject;
      console.log('Current project before save:', currentProject);
      
      if (!currentProject?.id) {
        throw new Error('No project selected');
      }

      const updatedProject = {
        ...currentProject,
        ...projectData,
        updatedAt: new Date().toISOString(),
        version: [
          ...(currentProject.version || []),
          {
            version: crypto.randomUUID(),
            updatedAt: new Date().toISOString()
          }
        ]
      };

      console.log('Sending updated project:', updatedProject);

      const response = await fetch(`http://localhost:3001/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const savedProject = await response.json();
      console.log('Saved project response:', savedProject);
      
      set((state) => ({
        currentProject: savedProject,
        projects: state.projects.map(p => 
          p.id === savedProject.id ? savedProject : p
        ),
        loading: false,
        error: null
      }));

      return savedProject;
    } catch (error) {
      console.error('Error in saveProject:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to save project', 
        loading: false 
      });
      throw error;
    }
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
        version: [
          ...(currentProject.version || []),
          {
            version: crypto.randomUUID(),
            updatedAt: new Date().toISOString()
          }
        ]
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
})) 