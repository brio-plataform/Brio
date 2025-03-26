import { create } from 'zustand'
import api from '@/utils/axios'
import { MockProject, ProjectsStore } from '@/types/types'

export const useGetAllProjects = create<ProjectsStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/projects')
      const apiProjects = response.data.map((project: any) => ({
        id: project.id.toString(),
        title: project.name,
        description: project.description || "",
        model: project.model || "article",
        visibility: project.visibility || "private",
        progress: project.progress || 0,
        institutional: true,
        institution: {
          name: "Instituição", // Informação padrão
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
          userId: c.userId || "1"
        })) || [],
        author: {
          userId: project.author?.userId || "1"
        }
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
      await api.delete(`/projects/${id}`)
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