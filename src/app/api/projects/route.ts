import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const projectInclude = {
  author: true,
  stats: true,
  versions: true,
  collaborators: true,
  content: true,
  user: true,
} satisfies Prisma.ProjectInclude;

// GET /api/projects - Listar todos os projetos do usuário
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Buscar projetos onde o usuário é dono ou colaborador
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          // Projetos onde o usuário é dono
          { userId: user.id },
          // Projetos onde o usuário é colaborador
          {
            collaborators: {
              some: {
                userId: user.id
              }
            }
          }
        ]
      },
      include: projectInclude,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Criar novo projeto
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Log dos dados recebidos
    const data = await request.json();
    console.log('Dados recebidos na API:', data);
    
    try {
      // Extrair o content para criar separadamente
      const contentData = data.content || [];
      
      // Garantir que os dados mínimos obrigatórios estejam presentes
      const projectData = {
        name: data.name || 'Novo Projeto',
        description: data.description || '',
        logo: data.logo || '/placeholder.svg',
        banner: data.banner || '/placeholder.svg',
        model: data.model || 'article',
        visibility: data.visibility || 'private',
        type: data.type || 'document',
        tags: Array.isArray(data.tags) ? data.tags : [],
        status: data.status || 'Em Andamento',
        wordCount: data.wordCount || 0,
        progress: data.progress || 0,
        citations: Array.isArray(data.citations) ? data.citations : [],
        userId: user.id,
      };
      
      // Criar o projeto primeiro, sem o content
      const project = await prisma.project.create({
        data: {
          ...projectData,
          author: {
            create: {
              userId: user.id
            }
          },
          stats: {
            create: {
              views: 0,
              stars: 0,
              forks: 0,
              comments: 0,
              shares: 0,
            }
          },
          versions: {
            create: [{
              version: '1.0.0',
              updatedAt: new Date(),
            }]
          },
        },
        include: projectInclude,
      });

      // Se tiver conteúdo, criar os blocos de conteúdo separadamente
      if (contentData.length > 0) {
        for (const block of contentData) {
          await prisma.contentBlock.create({
            data: {
              type: block.type,
              props: block.props,
              content: block.content,
              children: block.children || [],
              projectId: project.id
            }
          });
        }
        
        // Buscar o projeto novamente com o conteúdo atualizado
        const updatedProject = await prisma.project.findUnique({
          where: { id: project.id },
          include: projectInclude
        });
        
        return NextResponse.json(updatedProject);
      }

      return NextResponse.json(project);
    } catch (createError) {
      console.error('Erro específico ao criar projeto:', createError);
      return NextResponse.json(
        { error: 'Erro ao criar projeto', details: String(createError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro geral ao criar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar projeto', details: String(error) },
      { status: 500 }
    );
  }
} 