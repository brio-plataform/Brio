import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar um novo usuário de teste
    const testUser = await prisma.user.create({
      data: {
        name: 'Usuário de Teste',
        email: 'teste@example.com',
        password: '$2b$10$NZRFPp2vQ9mv0p2aablhN.4OjXApCMXlzZmgRBjv6nmkm5EX8Xi5.', // mesma senha que o usuário de seed
        image: '/placeholder.svg',
      },
    });

    console.log('Usuário de teste criado:', testUser);

    // Criar um projeto para o usuário de teste
    const testProject = await prisma.project.create({
      data: {
        name: 'Projeto do Usuário de Teste',
        description: 'Este é um projeto criado para testar as permissões de usuário',
        logo: '/placeholder.svg',
        banner: '/placeholder.svg',
        model: 'article',
        visibility: 'public',
        progress: 20,
        status: 'Em Andamento',
        tags: ['teste', 'permissões'],
        userId: testUser.id,
        // Criar autor para o projeto
        author: {
          create: {
            userId: testUser.id,
          }
        },
        // Criar estatísticas
        stats: {
          create: {
            views: 0,
            stars: 0,
            forks: 0,
            comments: 0,
            shares: 0,
          }
        },
        // Criar versão inicial
        versions: {
          create: [
            {
              version: '1.0.0',
              updatedAt: new Date(),
            }
          ]
        },
        // Criar conteúdo inicial
        content: {
          create: [
            {
              type: 'heading',
              props: {
                level: 1,
                textAlignment: 'left',
                textColor: 'default',
                backgroundColor: 'default',
              },
              content: [{ type: 'text', text: 'Projeto do Usuário de Teste', styles: {} }],
              children: [],
            },
            {
              type: 'paragraph',
              props: {
                textAlignment: 'left',
                textColor: 'default',
                backgroundColor: 'default',
              },
              content: [{ type: 'text', text: 'Este é um conteúdo inicial para o projeto de teste.', styles: {} }],
              children: [],
            }
          ]
        }
      },
    });

    console.log('Projeto de teste criado:', testProject);

    // Encontrar um projeto existente de outro usuário para adicionar como colaborador
    const existingProjects = await prisma.project.findMany({
      where: {
        NOT: {
          userId: testUser.id
        }
      },
      take: 1,
    });

    if (existingProjects.length > 0) {
      const existingProject = existingProjects[0];
      
      // Adicionar o usuário de teste como colaborador no projeto existente
      const collaborator = await prisma.projectCollaborator.create({
        data: {
          projectId: existingProject.id,
          userId: testUser.id,
        },
      });

      console.log(`Usuário de teste adicionado como colaborador no projeto "${existingProject.name}" (ID: ${existingProject.id})`);
    } else {
      console.log('Não foram encontrados projetos existentes para adicionar o usuário como colaborador.');
    }

    console.log('\nDados de acesso do usuário de teste:');
    console.log('Email: teste@example.com');
    console.log('Senha: [mesma senha do usuário principal]');
    console.log('ID: ', testUser.id);

  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 