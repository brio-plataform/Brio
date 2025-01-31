import { create } from 'zustand'

interface Project {
  id: string
  title: string
  description: string
  banner?: string
  content: any // BlockNote JSON content
  authorId: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published'
  tags: string[]
}

interface ProjectStore {
  currentProject: Project | null
  projects: Project[]
  loading: boolean
  error: string | null
  
  // Actions
  setCurrentProject: (project: Project | null) => void
  saveProject: (project: Partial<Project>) => Promise<void>
  updateProjectContent: (content: any) => Promise<void>
  fetchProjects: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  currentProject: null,
  projects: [],
  loading: false,
  error: null,

  setCurrentProject: (project) => {
    set({ currentProject: project })
  },

  saveProject: async (projectData) => {
    set({ loading: true })
    try {
      const currentProject = get().currentProject
      
      if (currentProject?.id) {
        // Update existing project
        const response = await fetch(`http://localhost:3001/projects/${currentProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...projectData,
            updatedAt: new Date().toISOString()
          })
        })
        const updatedProject = await response.json()
        set((state) => ({
          currentProject: updatedProject,
          projects: state.projects.map(p => 
            p.id === updatedProject.id ? updatedProject : p
          ),
          loading: false
        }))
      } else {
        // Create new project
        const newProject = {
          ...projectData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft'
        }
        
        const response = await fetch('http://localhost:3001/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        })
        
        const savedProject = await response.json()
        set((state) => ({
          currentProject: savedProject,
          projects: [...state.projects, savedProject],
          loading: false
        }))
      }
    } catch (error) {
      set({ error: 'Failed to save project', loading: false })
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
  }
})) 