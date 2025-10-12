// Repositório responsável apenas por operações CRUD na tabela "beneficiarios"

// Por padrão, os "find" ignoram registros soft-deleted (deletedAt != null).

import prisma from '../db/prismaClient.js';

export const createBeneficiario = async (data) => {
  // data: { nomeCompleto, cpf, dataNascimento (Date), status, planoId }
  return prisma.beneficiario.create({ data });
};

// Busca beneficiario por id (se ativo)
export const findBeneficiarioById = async (id) => {
  return prisma.beneficiario.findFirst({ where: { id, deletedAt: null } });
};

// Busca beneficiario por cpf (se ativo)
export const findBeneficiarioByCpf = async (cpf) => {
  return prisma.beneficiario.findFirst({ where: { cpf, deletedAt: null } });
};

// Lista beneficiarios com filtros opcionais de status, planoId e paginação
// page = 1, limit = 20 (paginação padrão)
// {} = se função for chamada sem argumentos
export const listBeneficiarios = async ({ status, planoId, page = 1, limit = 20 } = {}) => {
  const where = { deletedAt: null };
  if (status) where.status = status; // filtra por status se fornecido
  if (planoId) where.planoId = planoId; // filtra por planoId se fornecido

  const skip = (page - 1) * limit;

  // Consulta com filtros, paginação e ordenação por nome
  return prisma.beneficiario.findMany({
    where,
    skip,
    take: limit,
    orderBy: { nomeCompleto: 'asc' }
  });
};

// Atualiza dados do beneficiario
export const updateBeneficiario = async (id, data) => {
  return prisma.beneficiario.update({ where: { id }, data });
};

// Hard delete de beneficiario
export const hardDeleteBeneficiario = async (id) => {
  return prisma.beneficiario.delete({ where: { id } });
};

// Soft delete de beneficiario
export const softDeleteBeneficiario = async (id) => {
  return prisma.beneficiario.update({ where: { id }, data: { deletedAt: new Date() } });
};
