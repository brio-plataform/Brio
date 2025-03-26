import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Verificar se o usuário é o dono ou colaborador do projeto
    const isOwner = project.userId === user.id;
    
    // Verificar colaboradores usando o campo JSON
    // @ts-ignore - Os tipos do Prisma não sabem que project.collaborators é um array
    const collaborators = project.collaborators ? project.collaborators : [];
    let isCollaborator = false;
    
    // Se collaborators for um array, verificamos se o usuário está nele
    if (Array.isArray(collaborators)) {
      isCollaborator = collaborators.some((collab: any) => collab.userId === user.id);
    }

    // Verificamos se o projeto é público ou compartilhado para permitir acesso
    const isPublic = project.visibility === 'public';
    const isShared = project.visibility === 'shared';

    if (!isOwner && !isCollaborator && !isPublic && !isShared) {
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
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Apenas o proprietário pode fazer atualizações completas
    if (existingProject.userId !== user.id) {
      return NextResponse.json({ error: 'Apenas o proprietário pode atualizar este projeto' }, { status: 403 });
    }

    const data = await request.json();
    
    // Fazer a atualização, incluindo o campo versions para adicionar uma nova versão
    const updatedData = {
      ...data,
      versions: data.versions || [{ 
        version: '1.0.0', 
        updatedAt: new Date().toISOString()
      }]
    };
    
    // Atualizar o projeto com todos os dados
    const project = await prisma.project.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: updatedData as any
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

    // Verificar se o projeto existe
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Verificar permissões
    const isOwner = existingProject.userId === user.id;
    
    // Verificar colaboradores usando o campo JSON
    // @ts-ignore - Os tipos do Prisma não sabem que existingProject.collaborators é um array
    const collaborators = existingProject.collaborators ? existingProject.collaborators : [];
    let isCollaborator = false;
    
    if (Array.isArray(collaborators)) {
      isCollaborator = collaborators.some((collab: any) => collab.userId === user.id);
    }

    if (!isOwner && !isCollaborator) {
      return NextResponse.json({ error: 'Não autorizado para modificar este projeto' }, { status: 403 });
    }

    // Obter os dados enviados para atualização
    const data = await request.json();
    
    // Atualizar o projeto
    const updatedProject = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: data as any, // Cast para resolver problemas de tipagem
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

// DELETE /api/projects/[id] - Excluir projeto
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

    // Verificar se o projeto existe e se o usuário é o dono
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    if (project.userId !== user.id) {
      return NextResponse.json({ error: 'Apenas o proprietário pode excluir este projeto' }, { status: 403 });
    }

    // Excluir o projeto
    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir projeto' },
      { status: 500 }
    );
  }
} 