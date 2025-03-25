import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default user
  const defaultUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '$2b$10$NZRFPp2vQ9mv0p2aablhN.4OjXApCMXlzZmgRBjv6nmkm5EX8Xi5.'
    }
  });

  // Create first project
  const firstProject = await prisma.project.upsert({
    where: { id: '1' },
    update: {},
    create: {
      userId: defaultUser.id,
      name: 'Projeto Brio',
      description: 'Descrição do Teste Brio',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1920px-Andromeda_Galaxy_h-alpha%29.jpg',
      banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1920px-Andromeda_Galaxy_h-alpha%29.jpg',
      wordCount: 0,
      model: 'article',
      visibility: 'public',
      progress: 40,
      status: 'Em Andamento',
      tags: [],
      citations: [],
      author: {
        name: 'John Doe',
        avatar: '/path/to/avatar.jpg',
        institution: 'Universidade de São Paulo'
      } as any,
      collaborators: [],
      stats: {
        views: 150,
        stars: 45,
        forks: 8,
        comments: 23,
        shares: 12
      } as any,
      version: [{
        version: '1.0.0',
        updatedAt: '2025-01-31T23:47:47.093Z'
      }] as any[],
      content: [{
        id: '1e3436fa-0da9-407c-9b45-844b6b420dda',
        type: 'heading',
        props: {
          textColor: 'default',
          backgroundColor: 'default',
          textAlignment: 'left',
          level: 1
        },
        content: [
          {
            type: 'text',
            text: 'v 1.1.0 Período de Criação da UI e UX aaa',
            styles: {}
          }
        ],
        children: []
      }] as any[]
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 