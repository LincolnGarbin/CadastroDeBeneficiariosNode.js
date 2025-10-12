// Centraliza a instância do PrismaClient para ser reutilizada em repositórios.
// Ajuda a evitar múltiplas conexões e facilita mocks nos testes.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
});

export default prisma;
