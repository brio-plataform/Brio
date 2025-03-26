import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { projectApi } from '@/services/api';
import type { 
  ProjectHookReturn, 
  ContentBlock,
  ProjectVersion,
  ProjectStats,
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  Project as ImportedProject,
  ProjectCollaborator,
  ProjectAuthor
} from '@/types/project';

// Interface temporária para mapear a resposta da API
interface APIProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  wordCount: number;
  citations: string[];
  model: ProjectModel;
  visibility: ProjectVisibility;
  progress: number;
  type: string;
  author: any; // Pode ser qualquer formato já que é um campo JSON
  stats: ProjectStats;
  version: ProjectVersion[];
  content: ContentBlock[];
  updatedAt: string;
  createdAt: string;
  collaborators?: any; // Agora pode ser qualquer tipo já que é um campo JSON
  tags?: string[];
}

// Estendendo a interface ProjectAuthor para incluir os campos necessários
interface ExtendedProjectAuthor extends ProjectAuthor {
  name?: string;
  avatar?: string;
}

export function useGetProjectByID(id: string) {
  const { currentProject, setCurrentProject, loading, error } = useProjectStore();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await projectApi.getProjectById(id);
        setCurrentProject(project);
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, setCurrentProject]);

  return {
    project: currentProject,
    loading,
    error,
  };
}

export function useGetProject(projectId: string): ProjectHookReturn {
  const [project, setProject] = useState<ImportedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        const project = await projectApi.getProjectById(projectId);
        console.log("Dados do projeto recebidos:", project);
        
        // Verificar e processar os campos que agora são JSON
        let processedCollaborators: ProjectCollaborator[] = [];
        if (project.collaborators) {
          // Verificar se collaborators é um array
          if (Array.isArray(project.collaborators)) {
            processedCollaborators = project.collaborators.map((c: any) => ({
              userId: c.userId || ""
            }));
          } else {
            // Verificar formatos de Prisma - estruturas comuns para relações
            const collabObj = project.collaborators as any;
            
            // Formato createMany (usado pelo Prisma)
            if (collabObj.createMany && collabObj.createMany.data) {
              processedCollaborators = collabObj.createMany.data.map((c: any) => ({
                userId: c.userId || ""
              }));
            } 
            // Formato create (outro formato possível do Prisma)
            else if (collabObj.create && Array.isArray(collabObj.create)) {
              processedCollaborators = collabObj.create.map((c: any) => ({
                userId: c.userId || ""
              }));
            }
            // Formato connect (outro formato possível do Prisma)
            else if (collabObj.connect && Array.isArray(collabObj.connect)) {
              processedCollaborators = collabObj.connect.map((c: any) => ({
                userId: c.userId || c.id || ""
              }));
            }
            // Nenhum formato reconhecido, cria array vazio 
            else {
              processedCollaborators = [];
            }
          }
        }

        let processedAuthor: ExtendedProjectAuthor = { 
          userId: "", 
          name: "Usuário Desconhecido", 
          avatar: "/default-avatar.jpg" 
        };
        
        if (project.author) {
          // Verificar diferentes formatos possíveis do autor
          if (typeof project.author === 'object') {
            const authorObj = project.author as any;
            if (authorObj.userId) {
              // Formato clássico: { userId: '...' }
              processedAuthor = { 
                userId: authorObj.userId,
                name: authorObj.name || "Usuário",
                avatar: authorObj.avatar || "/default-avatar.jpg"
              };
            } else if (authorObj.create && authorObj.create.userId) {
              // Formato Prisma: { create: { userId: '...' } }
              processedAuthor = { 
                userId: authorObj.create.userId,
                name: authorObj.create.name || "Usuário",
                avatar: authorObj.create.avatar || "/default-avatar.jpg"
              };
            } else if (authorObj.connect && authorObj.connect.userId) {
              // Formato Prisma connect: { connect: { userId: '...' } }
              processedAuthor = { 
                userId: authorObj.connect.userId,
                name: "Usuário",
                avatar: "/default-avatar.jpg"
              };
            }
          }
        }

        let processedContent: ContentBlock[] = [];
        if (project.content) {
          // Verificar se content é um array
          if (Array.isArray(project.content)) {
            processedContent = project.content.map((item: ContentBlock) => ({
              ...item,
              type: item.type
            }));
          } else if (project.content && typeof project.content === 'object') {
            // Se content for um objeto, verificar se tem a propriedade create que é um array
            const contentObj = project.content as any;
            if (contentObj.create && Array.isArray(contentObj.create)) {
              processedContent = contentObj.create.map((item: ContentBlock) => ({
                ...item,
                type: item.type
              }));
            } else {
              // Gerar um conteúdo padrão
              processedContent = [{
                id: crypto.randomUUID(),
                type: "paragraph",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                  textAlignment: "left"
                },
                content: [
                  {
                    type: "text",
                    text: "Comece a escrever seu projeto aqui...",
                    styles: {}
                  }
                ],
                children: []
              }];
            }
          } else {
            // Gerar um conteúdo padrão
            processedContent = [{
              id: crypto.randomUUID(),
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left"
              },
              content: [
                {
                  type: "text",
                  text: "Comece a escrever seu projeto aqui...",
                  styles: {}
                }
              ],
              children: []
            }];
          }
        } else {
          // Se não houver conteúdo, usar um padrão
          processedContent = [{
            id: crypto.randomUUID(),
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left"
            },
            content: [
              {
                type: "text",
                text: "Comece a escrever seu projeto aqui...",
                styles: {}
              }
            ],
            children: []
          }];
        }

        const convertedProject: ImportedProject = {
          ...project,
          title: project.name,
          type: project.type as ProjectType,
          collaborators: processedCollaborators,
          author: processedAuthor as ProjectAuthor,
          tags: project.tags || [],
          logo: project.logo || "",
          banner: project.banner || "",
          content: processedContent
        };
        
        setProject(convertedProject);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Create a memoized object with the project data
  const projectData: ProjectHookReturn = {
    project,
    isLoading,
    error,
    // Basic project info
    name: project?.name,
    description: project?.description,
    type: project?.type,
    // Content and versions
    content: project?.content,
    versions: project?.version,
    lastVersion: project?.version?.[project?.version?.length - 1],
    // Metadata
    updatedAt: project?.updatedAt,
    createdAt: project?.createdAt,
    userId: project?.userId,
    // Media
    logo: project?.logo,
    banner: project?.banner,
    // Stats and metrics
    wordCount: project?.wordCount,
    citations: project?.citations,
    progress: project?.progress,
    // Settings
    model: project?.model,
    visibility: project?.visibility,
    // Author and stats
    author: project?.author,
    stats: project?.stats
  };

  return projectData;
}