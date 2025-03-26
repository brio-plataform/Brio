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

    const data = await request.json();
    
    const project = await prisma.project.create({
      data: {
        ...data,
        userId: user.id,
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

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar projeto' },
      { status: 500 }
    );
  }
} 