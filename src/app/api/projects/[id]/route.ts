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

    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: projectInclude,
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
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

    const data = await request.json();
    
    const project = await prisma.project.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        ...data,
        versions: {
          create: [{
            version: '1.0.0',
            updatedAt: new Date(),
          }]
        },
      },
      include: projectInclude,
    });

    return NextResponse.json(project);
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

    const data = await request.json();
    
    // Se estiver atualizando o conteúdo, precisamos primeiro deletar o conteúdo existente
    // e depois criar o novo conteúdo
    if (data.content) {
      // Primeiro, deleta todo o conteúdo existente
      await prisma.contentBlock.deleteMany({
        where: { projectId: params.id }
      });

      // Depois, cria o novo conteúdo
      await prisma.project.update({
        where: {
          id: params.id,
          userId: user.id,
        },
        data: {
          content: {
            create: data.content.map((block: any) => ({
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
        },
        include: projectInclude,
      });
    } else {
      // Para outros campos, faz a atualização normal
      const project = await prisma.project.update({
        where: {
          id: params.id,
          userId: user.id,
        },
        data: {
          ...data,
          versions: {
            create: [{
              version: '1.0.0',
              updatedAt: new Date(),
            }]
          },
        },
        include: projectInclude,
      });

      return NextResponse.json(project);
    }

    // Retorna o projeto atualizado após a atualização do conteúdo
    const updatedProject = await prisma.project.findUnique({
      where: {
        id: params.id,
        userId: user.id,
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

    await prisma.project.delete({
      where: {
        id: params.id,
        userId: user.id,
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