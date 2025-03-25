import { create } from 'zustand'
import { trpc } from '@/utils/trpc'
import { Project } from '@prisma/client'

interface ProjectStore {
  projects: Project[]
  isLoading: boolean
  error: Error | null
  fetchProjects: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addProject: (project: Project) => void
}

export const useGetAllProjects = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null })
      const { data: projects } = await trpc.project.getAll.useQuery()
      set({ projects: projects || [], isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },

  deleteProject: async (id: string) => {
    try {
      await trpc.project.delete.useMutation().mutateAsync(id)
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      }))
    } catch (error) {
      set({ error: error as Error })
    }
  },

  addProject: (project: Project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }))
  }
}))