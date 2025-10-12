// Repositório responsável apenas por operações CRUD na tabela "planos"

// Responsável por isolar a lógica de acesso a dados (como se comunicar com o banco de dados) do restante da aplicação

import prisma from '../db/prismaClient.js';

// Cria um plano
export const createPlano = async (data) => {
  // data = { nome, codigoRegistroAns }
  return prisma.plano.create({ data });
  // método do Prisma Client para inserir um novo registro na tabela "plano"
};

// Busca mesmo se plano estiver soft-deleted
export const findPlanoById = async (id) => {
  return prisma.plano.findUnique({ where: { id } });
  // findUnique busca por campo único = id
};

// Buscar por codigoRegistroAns (único)
export const findPlanoByCodigo = async (codigoRegistroAns) => {
  return prisma.plano.findUnique({ where: { codigoRegistroAns } });
};

// Listar planos ativos (ignorando soft-deleted)
export const listPlanos = async () => {
  return prisma.plano.findMany({
    where: { deletedAt: null },
    orderBy: { nome: 'asc' }
  });
};

// Atualizar plano
export const updatePlano = async (id, data) => {
  return prisma.plano.update({ where: { id }, data });
};

// Hard delete
export const deletePlano = async (id) => {
  return prisma.plano.delete({ where: { id } });
};

// Soft delete 
export const softDeletePlano = async (id) => {
  return prisma.plano.update({ where: { id }, data: { deletedAt: new Date() } });
  // atualiza o campo deletedAt com a data atual
};
