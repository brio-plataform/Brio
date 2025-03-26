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

// GET /api/projects/[id] - Buscar projeto específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Verificar se o projeto existe primeiro
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
      },
      include: {
        ...projectInclude,
        collaborators: true
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Verificar se o usuário é o dono ou colaborador do projeto
    const isOwner = project.userId === user.id;
    const isCollaborator = project.collaborators.some(collab => collab.userId === user.id);

    if (!isOwner && !isCollaborator) {
      return NextResponse.json({ error: 'Não autorizado para acessar este projeto' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projeto' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Atualizar projeto completo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Verificar se o projeto existe e se o usuário é o dono
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
      include: { collaborators: true }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Apenas o proprietário pode fazer atualizações completas
    if (existingProject.userId !== user.id) {
      return NextResponse.json({ error: 'Apenas o proprietário pode atualizar este projeto' }, { status: 403 });
    }

    const data = await request.json();
    
    // Tratar os campos de author e collaborators
    const { author, collaborators, ...restData } = data;
    
    const project = await prisma.project.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        ...restData,
        ...(author && {
          author: {
            update: {
              userId: author.userId || user.id
            }
          }
        }),
        versions: {
          create: [{
            version: '1.0.0',
            updatedAt: new Date(),
          }]
        },
      },
      include: projectInclude,
    });

    // Atualizar colaboradores em uma operação separada se fornecidos
    if (collaborators && Array.isArray(collaborators)) {
      // Primeiro remover todos os colaboradores existentes
      await prisma.projectCollaborator.deleteMany({
        where: { projectId: params.id }
      });
      
      // Adicionar os novos colaboradores
      for (const collaborator of collaborators) {
        await prisma.projectCollaborator.create({
          data: {
            projectId: params.id,
            userId: collaborator.userId || user.id
          }
        });
      }
    }

    // Buscar o projeto atualizado com todos os relacionamentos
    const updatedProject = await prisma.project.findUnique({
      where: { id: params.id },
      include: projectInclude
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar projeto' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Atualizar campo específico do projeto
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Verificar se o projeto existe e se o usuário é o dono ou colaborador
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
      include: { collaborators: true }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    const isOwner = existingProject.userId === user.id;
    const isCollaborator = existingProject.collaborators.some(collab => collab.userId === user.id);

    if (!isOwner && !isCollaborator) {
      return NextResponse.json({ error: 'Não autorizado para modificar este projeto' }, { status: 403 });
    }

    // Certas operações só podem ser realizadas pelo dono do projeto
    const data = await request.json();
    const { author, collaborators } = data;

    // Colaboradores podem editar conteúdo, mas não outras propriedades sensíveis
    if (!isOwner && (author || collaborators)) {
      return NextResponse.json(
        { error: 'Apenas o proprietário pode modificar autores e colaboradores' },
        { status: 403 }
      );
    }
    
    // Tratar os campos de author e collaborators
    const { content, ...restData } = data;
    
    // Se estiver atualizando o conteúdo, precisamos primeiro deletar o conteúdo existente
    // e depois criar o novo conteúdo
    if (content) {
      // Primeiro, deleta todo o conteúdo existente
      await prisma.contentBlock.deleteMany({
        where: { projectId: params.id }
      });

      // Depois, cria o novo conteúdo
      await prisma.project.update({
        where: {
          id: params.id,
        },
        data: {
          content: {
            create: content.map((block: any) => ({
              type: block.type,
              props: block.props,
              content: block.content,
              children: block.children,
            }))
          },
          versions: {
            create: [{
              version: '1.0.0',
              updatedAt: new Date(),
            }]
          },
        }
      });
    }
    
    // Atualizar o autor se fornecido (apenas dono pode fazer isso)
    if (isOwner && author) {
      await prisma.projectAuthor.update({
        where: { projectId: params.id },
        data: {
          userId: author.userId || user.id
        }
      });
    }
    
    // Atualizar colaboradores em uma operação separada se fornecidos (apenas dono pode fazer isso)
    if (isOwner && collaborators && Array.isArray(collaborators)) {
      // Primeiro remover todos os colaboradores existentes
      await prisma.projectCollaborator.deleteMany({
        where: { projectId: params.id }
      });
      
      // Adicionar os novos colaboradores
      for (const collaborator of collaborators) {
        await prisma.projectCollaborator.create({
          data: {
            projectId: params.id,
            userId: collaborator.userId || user.id
          }
        });
      }
    }
    
    // Para outros campos, faz a atualização normal (apenas dono pode fazer isso)
    if (isOwner && Object.keys(restData).length > 0) {
      await prisma.project.update({
        where: {
          id: params.id,
        },
        data: {
          ...restData,
          versions: {
            create: [{
              version: '1.0.0',
              updatedAt: new Date(),
            }]
          },
        }
      });
    }

    // Retorna o projeto atualizado após a atualização
    const updatedProject = await prisma.project.findUnique({
      where: {
        id: params.id
      },
      include: projectInclude,
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Erro ao atualizar campo do projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar campo do projeto' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Deletar projeto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Verificar se o projeto existe
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Apenas o proprietário pode excluir o projeto
    if (existingProject.userId !== user.id) {
      return NextResponse.json({ error: 'Apenas o proprietário pode excluir este projeto' }, { status: 403 });
    }

    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar projeto' },
      { status: 500 }
    );
  }
} 