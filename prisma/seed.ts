import { PrismaClient } from '@prisma/client';
import dbData from '../db.json';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário
  const user = await prisma.user.create({
    data: {
      id: dbData.users[0].id,
      name: dbData.users[0].name,
      email: dbData.users[0].email,
      password: dbData.users[0].password,
    },
  });

  console.log('User created:', user);

  // Criar projetos
  for (const project of dbData.projects) {
    const createdProject = await prisma.project.create({
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        logo: project.logo,
        banner: project.banner,
        wordCount: project.wordCount,
        model: project.model,
        visibility: project.visibility,
        progress: project.progress,
        status: project.status,
        citations: project.citations || [],
        tags: project.tags || [],
        userId: user.id,
        // Criar autor
        author: {
          create: {
            name: project.author.name,
            avatar: project.author.avatar,
            institution: project.author.institution,
          }
        },
        // Criar estatísticas
        stats: {
          create: {
            views: project.stats.views,
            stars: project.stats.stars,
            forks: project.stats.forks,
            comments: project.stats.comments,
            shares: project.stats.shares,
          }
        },
        // Criar versões
        versions: {
          create: project.version.map(v => ({
            version: v.version,
            updatedAt: new Date(v.updatedAt),
          }))
        },
        // Criar colaboradores
        collaborators: {
          createMany: {
            data: (project.collaborators || []).map(c => ({
              name: c.name,
              avatar: c.avatar,
            }))
          }
        },
        // Criar blocos de conteúdo
        content: {
          create: (project.content || []).map(c => ({
            type: c.type,
            props: c.props,
            content: c.content || [],
            children: c.children || [],
          }))
        }
      },
    });

    console.log('Project created:', createdProject);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 