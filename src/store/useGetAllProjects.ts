import { create } from 'zustand'
import axios from 'axios'
import { MockProject, ProjectsStore } from '@/types/types'

export const useGetAllProjects = create<ProjectsStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get('http://localhost:3001/projects')
      const apiProjects = response.data.map((project: any) => ({
        id: project.id.toString(),
        title: project.name,
        description: project.description || "",
        type: project.type || "Research Project",
        progress: project.progress || 0,
        institutional: true,
        institution: {
          name: project.author?.institution || "",
          avatar: project.logo || "/placeholder.svg"
        },
        stats: {
          views: project.stats?.views || 0,
          stars: project.stats?.stars || 0,
          forks: project.stats?.forks || 0,
          comments: project.stats?.comments || 0,
          shares: project.stats?.shares || 0
        },
        status: project.status,
        tags: project.tags,
        collaborators: project.collaborators?.map((c: any) => ({
          name: c.name,
          avatar: c.avatar
        })) || []
      }))

      set({ projects: apiProjects, isLoading: false })
    } catch (error) {
      set({ error: 'Erro ao carregar projetos', isLoading: false })
    }
  },

  deleteProject: async (id: string) => {
    try {
      // Primeiro atualiza o estado local
      set(state => ({
        projects: state.projects.filter(p => p.id !== id)
      }))

      // Depois faz a requisição para a API
      await axios.delete(`http://localhost:3001/projects/${id}`)
    } catch (error) {
      // Se houver erro, reverte a deleção local
      await get().fetchProjects()
      set({ error: 'Erro ao deletar projeto' })
    }
  },

  addProject: (project: MockProject) => {
    set(state => ({
      projects: [...state.projects, project]
    }))
  }
})) 