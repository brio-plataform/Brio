import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: 'Usuário Teste 2',
      email: 'test2@example.com',
      password: '123456', // Em produção, isso deveria ser hasheado
    },
  });

  console.log('Usuário criado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 