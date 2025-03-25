import { trpc } from '@/utils/trpc';
import type { 
  ProjectHookReturn, 
  ContentBlock,
  ProjectVersion,
  ProjectStats,
  ProjectModel,
  ProjectVisibility,
  ProjectType,
  Project as ImportedProject,
  ContentText,
  ContentProps
} from '@/types/types';

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
  author: {
    name: string;
    avatar: string;
    institution: string;
  };
  stats: ProjectStats;
  version: ProjectVersion[];
  content: ContentBlock[];
  updatedAt: string;
  createdAt: string;
  collaborators?: {
    name: string;
    avatar: string;
  }[];
  tags?: string[];
}

export function useGetProject(projectId: string): ProjectHookReturn {
  const { data: project, isLoading, error } = trpc.project.getById.useQuery(projectId);

  // Create a memoized object with the project data
  const projectData: ProjectHookReturn = {
    project: project ? {
      ...project,
      title: project.name,
      type: project.model as ProjectType,
      model: project.model as ProjectModel,
      visibility: project.visibility as ProjectVisibility,
      description: project.description || '',
      logo: project.logo || '',
      banner: project.banner || '',
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      citations: project.citations || [],
      collaborators: (project.collaborators || []).map(c => ({
        name: typeof c === 'object' && c !== null ? String((c as { name?: string }).name || '') : '',
        avatar: typeof c === 'object' && c !== null ? String((c as { avatar?: string }).avatar || '') : ''
      })),
      author: {
        name: typeof project.author === 'object' && project.author !== null ? String((project.author as { name?: string }).name || '') : '',
        avatar: typeof project.author === 'object' && project.author !== null ? String((project.author as { avatar?: string }).avatar || '') : '',
        institution: typeof project.author === 'object' && project.author !== null ? String((project.author as { institution?: string }).institution || '') : ''
      },
      stats: {
        views: typeof project.stats === 'object' && project.stats !== null ? Number((project.stats as { views?: number }).views || 0) : 0,
        stars: typeof project.stats === 'object' && project.stats !== null ? Number((project.stats as { stars?: number }).stars || 0) : 0,
        forks: typeof project.stats === 'object' && project.stats !== null ? Number((project.stats as { forks?: number }).forks || 0) : 0,
        citations: typeof project.stats === 'object' && project.stats !== null ? Number((project.stats as { citations?: number }).citations || 0) : 0,
        comments: typeof project.stats === 'object' && project.stats !== null ? Number((project.stats as { comments?: number }).comments || 0) : 0
      },
      version: (project.version || []).map(v => {
        const version = typeof v === 'object' && v !== null ? v as { version?: string; updatedAt?: string } : {};
        return {
          version: String(version.version || ''),
          updatedAt: String(version.updatedAt || '')
        };
      }),
      content: (project.content || []).map(c => {
        const content = typeof c === 'object' && c !== null ? c as {
          id?: string;
          type?: string;
          props?: {
            textColor?: string;
            backgroundColor?: string;
            textAlignment?: string;
            level?: number;
          };
          content?: Array<{
            type?: string;
            text?: string;
            styles?: {
              bold?: boolean;
              italic?: boolean;
              underline?: boolean;
              strikethrough?: boolean;
              code?: boolean;
              textColor?: string;
            };
          }>;
          children?: any[];
        } : {};

        const contentBlock: ContentBlock = {
          id: String(content.id || ''),
          type: (content.type as "heading" | "paragraph" | "image" | "bulletListItem") || "paragraph",
          props: {
            textColor: (content.props?.textColor as "default" | string) || "default",
            backgroundColor: (content.props?.backgroundColor as "default" | string) || "default",
            textAlignment: (content.props?.textAlignment as "left" | "center" | "right") || "left",
            level: Number(content.props?.level || 1)
          },
          content: (content.content || []).map(cont => ({
            type: "text",
            text: String(cont?.text || ''),
            styles: {
              bold: Boolean(cont?.styles?.bold),
              italic: Boolean(cont?.styles?.italic),
              underline: Boolean(cont?.styles?.underline),
              strikethrough: Boolean(cont?.styles?.strikethrough),
              code: Boolean(cont?.styles?.code),
              textColor: String(cont?.styles?.textColor || 'default')
            }
          })),
          children: (content.children || []).map(child => {
            const childContent = typeof child === 'object' && child !== null ? child as {
              id?: string;
              type?: string;
              props?: {
                textColor?: string;
                backgroundColor?: string;
                textAlignment?: string;
                level?: number;
              };
              content?: Array<{
                type?: string;
                text?: string;
                styles?: {
                  bold?: boolean;
                  italic?: boolean;
                  underline?: boolean;
                  strikethrough?: boolean;
                  code?: boolean;
                  textColor?: string;
                };
              }>;
            } : {};

            return {
              id: String(childContent.id || ''),
              type: (childContent.type as "heading" | "paragraph" | "image" | "bulletListItem") || "paragraph",
              props: {
                textColor: (childContent.props?.textColor as "default" | string) || "default",
                backgroundColor: (childContent.props?.backgroundColor as "default" | string) || "default",
                textAlignment: (childContent.props?.textAlignment as "left" | "center" | "right") || "left",
                level: Number(childContent.props?.level || 1)
              },
              content: (childContent.content || []).map(cont => ({
                type: "text",
                text: String(cont?.text || ''),
                styles: {
                  bold: Boolean(cont?.styles?.bold),
                  italic: Boolean(cont?.styles?.italic),
                  underline: Boolean(cont?.styles?.underline),
                  strikethrough: Boolean(cont?.styles?.strikethrough),
                  code: Boolean(cont?.styles?.code),
                  textColor: String(cont?.styles?.textColor || 'default')
                }
              })),
              children: []
            };
          })
        };
        return contentBlock;
      })
    } : null,
    isLoading,
    error: error as Error | null,
    // Basic project info
    name: project?.name,
    description: project?.description || undefined,
    type: project?.model as ProjectType,
    // Content and versions
    content: (project?.content || []).map(c => {
      const content = typeof c === 'object' && c !== null ? c as {
        id?: string;
        type?: string;
        props?: {
          textColor?: string;
          backgroundColor?: string;
          textAlignment?: string;
          level?: number;
        };
        content?: Array<{
          type?: string;
          text?: string;
          styles?: {
            bold?: boolean;
            italic?: boolean;
            underline?: boolean;
            strikethrough?: boolean;
            code?: boolean;
            textColor?: string;
          };
        }>;
        children?: any[];
      } : {};

      const contentBlock: ContentBlock = {
        id: String(content.id || ''),
        type: (content.type as "heading" | "paragraph" | "image" | "bulletListItem") || "paragraph",
        props: {
          textColor: (content.props?.textColor as "default" | string) || "default",
          backgroundColor: (content.props?.backgroundColor as "default" | string) || "default",
          textAlignment: (content.props?.textAlignment as "left" | "center" | "right") || "left",
          level: Number(content.props?.level || 1)
        },
        content: (content.content || []).map(cont => ({
          type: "text",
          text: String(cont?.text || ''),
          styles: {
            bold: Boolean(cont?.styles?.bold),
            italic: Boolean(cont?.styles?.italic),
            underline: Boolean(cont?.styles?.underline),
            strikethrough: Boolean(cont?.styles?.strikethrough),
            code: Boolean(cont?.styles?.code),
            textColor: String(cont?.styles?.textColor || 'default')
          }
        })),
        children: (content.children || []).map(child => {
          const childContent = typeof child === 'object' && child !== null ? child as {
            id?: string;
            type?: string;
            props?: {
              textColor?: string;
              backgroundColor?: string;
              textAlignment?: string;
              level?: number;
            };
            content?: Array<{
              type?: string;
              text?: string;
              styles?: {
                bold?: boolean;
                italic?: boolean;
                underline?: boolean;
                strikethrough?: boolean;
                code?: boolean;
                textColor?: string;
              };
            }>;
          } : {};

          return {
            id: String(childContent.id || ''),
            type: (childContent.type as "heading" | "paragraph" | "image" | "bulletListItem") || "paragraph",
            props: {
              textColor: (childContent.props?.textColor as "default" | string) || "default",
              backgroundColor: (childContent.props?.backgroundColor as "default" | string) || "default",
              textAlignment: (childContent.props?.textAlignment as "left" | "center" | "right") || "left",
              level: Number(childContent.props?.level || 1)
            },
            content: (childContent.content || []).map(cont => ({
              type: "text",
              text: String(cont?.text || ''),
              styles: {
                bold: Boolean(cont?.styles?.bold),
                italic: Boolean(cont?.styles?.italic),
                underline: Boolean(cont?.styles?.underline),
                strikethrough: Boolean(cont?.styles?.strikethrough),
                code: Boolean(cont?.styles?.code),
                textColor: String(cont?.styles?.textColor || 'default')
              }
            })),
            children: []
          };
        })
      };
      return contentBlock;
    }),
    versions: (project?.version || []).map(v => {
      const version = typeof v === 'object' && v !== null ? v as { version?: string; updatedAt?: string } : {};
      return {
        version: String(version.version || ''),
        updatedAt: String(version.updatedAt || '')
      };
    }),
    lastVersion: project?.version?.[project.version.length - 1] ? {
      version: String((project.version[project.version.length - 1] as { version?: string }).version || ''),
      updatedAt: String((project.version[project.version.length - 1] as { updatedAt?: string }).updatedAt || '')
    } : undefined,
    // Metadata
    updatedAt: project?.updatedAt?.toISOString(),
    createdAt: project?.createdAt?.toISOString(),
    userId: project?.userId,
    // Media
    logo: project?.logo || undefined,
    banner: project?.banner || undefined,
    // Stats and metrics
    wordCount: project?.wordCount || 0,
    citations: project?.citations || [],
    progress: project?.progress || 0,
    // Settings
    model: project?.model as ProjectModel,
    visibility: project?.visibility as ProjectVisibility,
    // Author and stats
    author: {
      name: typeof project?.author === 'object' && project?.author !== null ? String((project.author as { name?: string }).name || '') : '',
      avatar: typeof project?.author === 'object' && project?.author !== null ? String((project.author as { avatar?: string }).avatar || '') : '',
      institution: typeof project?.author === 'object' && project?.author !== null ? String((project.author as { institution?: string }).institution || '') : ''
    },
    stats: {
      views: typeof project?.stats === 'object' && project?.stats !== null ? Number((project.stats as { views?: number }).views || 0) : 0,
      stars: typeof project?.stats === 'object' && project?.stats !== null ? Number((project.stats as { stars?: number }).stars || 0) : 0,
      forks: typeof project?.stats === 'object' && project?.stats !== null ? Number((project.stats as { forks?: number }).forks || 0) : 0,
      citations: typeof project?.stats === 'object' && project?.stats !== null ? Number((project.stats as { citations?: number }).citations || 0) : 0,
      comments: typeof project?.stats === 'object' && project?.stats !== null ? Number((project.stats as { comments?: number }).comments || 0) : 0
    }
  };

  console.log('Project data from hook:', projectData);

  return projectData;
}