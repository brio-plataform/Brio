import { create } from 'zustand'
import type { ProjectState, Project } from '@/types/types'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { type AppRouter } from '@/server/api/root'
import superjson from 'superjson'

// Create a tRPC client
const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      transformer: superjson,
    }),
  ],
})

// Helper function to convert Prisma project to our Project type
const mapPrismaToProject = (prismaProject: any): Project => {
  console.log('Mapping Prisma project:', prismaProject);
  
  // Ensure content is properly parsed if it's a string
  const content = typeof prismaProject.content === 'string' 
    ? JSON.parse(prismaProject.content) 
    : prismaProject.content || [];

  return {
    id: prismaProject.id,
    userId: prismaProject.userId,
    name: prismaProject.name,
    title: prismaProject.name,
    description: prismaProject.description || '',
    logo: prismaProject.logo || '',
    banner: prismaProject.banner || '',
    wordCount: prismaProject.wordCount,
    citations: prismaProject.citations || [],
    model: prismaProject.model as Project['model'],
    visibility: prismaProject.visibility as Project['visibility'],
    progress: prismaProject.progress,
    type: prismaProject.model as Project['type'],
    status: prismaProject.status,
    collaborators: prismaProject.collaborators || [],
    tags: prismaProject.tags || [],
    author: prismaProject.author || {
      name: '',
      avatar: '',
      institution: ''
    },
    stats: prismaProject.stats || {
      views: 0,
      stars: 0,
      forks: 0,
      citations: 0,
      comments: 0
    },
    version: prismaProject.version || [],
    content: content,
    createdAt: prismaProject.createdAt.toISOString(),
    updatedAt: prismaProject.updatedAt.toISOString()
  }
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
    if (!currentProject) return;

    try {
      const updatedProject = await trpcClient.project.update.mutate({
        id: currentProject.id,
        name: projectData.name,
        description: projectData.description,
        logo: projectData.logo,
        banner: projectData.banner,
        model: projectData.model,
        visibility: projectData.visibility,
        progress: projectData.progress,
        status: projectData.status,
        tags: projectData.tags
      });

      const mappedProject = mapPrismaToProject(updatedProject);
      set((state) => ({
        currentProject: {
          ...mappedProject,
          logo: projectData.logo || mappedProject.logo,
          banner: projectData.banner || mappedProject.banner,
        }
      }));
    } catch (error) {
      set({ error: 'Failed to save project' });
    }
  },

  updateProjectContent: async (content) => {
    const currentProject = get().currentProject;
    if (!currentProject) return;

    try {
      console.log('Updating project content:', content);
      const updatedProject = await trpcClient.project.update.mutate({
        id: currentProject.id,
        content: content,
        updatedAt: new Date().toISOString()
      });

      const mappedProject = mapPrismaToProject(updatedProject);
      console.log('Mapped project after content update:', mappedProject);
      
      set((state) => ({
        currentProject: state.currentProject ? {
          ...mappedProject,
          content,
          updatedAt: new Date().toISOString()
        } : null
      }));
    } catch (error) {
      console.error('Error updating project content:', error);
      set({ error: 'Failed to update project content' });
    }
  },

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const projects = await trpcClient.project.getAll.query();
      console.log('Fetched projects:', projects);
      const mappedProjects = projects.map(mapPrismaToProject);
      console.log('Mapped projects:', mappedProjects);
      set({ projects: mappedProjects, loading: false });
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true });
    try {
      await trpcClient.project.delete.mutate(id);
      set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete project', loading: false });
    }
  },

  setEditorContent: (content) => {
    set({ editorContent: content });
  },

  saveEditorContent: async () => {
    const { currentProject, editorContent } = get();
    if (!currentProject || !editorContent) return;

    try {
      set({ loading: true });
      
      const parsedContent = JSON.parse(editorContent);
      console.log('Saving editor content:', parsedContent);
      
      const updatedProject = await trpcClient.project.update.mutate({
        id: currentProject.id,
        content: parsedContent,
        updatedAt: new Date().toISOString()
      });
      
      const mappedProject = mapPrismaToProject(updatedProject);
      console.log('Mapped project after editor content save:', mappedProject);
      
      set((state) => ({
        currentProject: mappedProject,
        projects: state.projects.map(p => 
          p.id === mappedProject.id ? mappedProject : p
        ),
        loading: false
      }));
    } catch (error) {
      console.error('Error saving editor content:', error);
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