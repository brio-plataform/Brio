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
        tags: project.tags,
        userId: user.id,
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