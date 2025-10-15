// Serviços aplicam validações, regras de negócio e orquestram repositórios

// Aqui mapeamos erros do Prisma (ex: P2002) para erros semânticos

import * as repo from '../repositories/beneficiario.repository.js';
import * as planoRepo from '../repositories/plano.repository.js';
import { ConflictError, ValidationError, NotFoundError } from '../utils/errors.js';
import prisma from '../db/prismaClient.js';

// Validação simples de CPF (apenas formato 11 dígitos)
const isCpfFormatValid = (cpf) => /^\d{11}$/.test(cpf);

// Cria um beneficiário com validações
export const createBeneficiario = async (payload) => {
  // payload esperado: { nomeCompleto, cpf, dataNascimento (Date), planoId, status? }

  // 1 - Validação de formato do CPF
  if (!isCpfFormatValid(payload.cpf)) {
    throw new ValidationError('CPF inválido', [{ field: 'cpf', rule: 'invalid_format' }]);
  }

  // 2 - Verificar se o plano existe
  const plano = await planoRepo.findPlanoById(payload.planoId);
  if (!plano) {
    throw new ValidationError('Plano inexistente', [{ field: 'planoId', rule: 'exists' }]);
  }

  // 3 - Tentar criar; capturar violação de unique do Prisma
  try {
    return await repo.createBeneficiario(payload);
  } catch (e) {
    // Prisma unique constraint error code
    if (e.code === 'P2002') {
      // identificar campo que causou o erro
      const target = e.meta?.target?.[0] ?? '';
      if (target === 'cpf') throw new ConflictError('CPF já cadastrado');
      throw new ConflictError('Violação de unicidade');
    }
    throw e; // rethrow para middleware tratar
  }
};

// Busca beneficiário por id com erro se não encontrar
export const getBeneficiarioById = async (id) => {
  const b = await repo.findBeneficiarioById(id);
  if (!b) throw new NotFoundError('Beneficiário não encontrado');
  return b;
};

// Lista beneficiários com filtros opcionais
export const listBeneficiarios = async (filters) => {
  return repo.listBeneficiarios(filters);
};

// Atualiza beneficiário com validações
export const updateBeneficiario = async (id, data) => {

  // Se atualizar cpf, validar formato
  if (data.cpf && !isCpfFormatValid(data.cpf)) {
    throw new ValidationError('CPF inválido', [{ field: 'cpf', rule: 'invalid_format' }]);
  }

  // Se atualizar nomeCompleto, validar se é string não vazia
  if (data.nomeCompleto !== undefined) {
    if (typeof data.nomeCompleto !== 'string' || data.nomeCompleto.trim() === '') {
      throw new ValidationError('Nome inválido', [{ field: 'nomeCompleto', rule: 'required' }]);
    }
  }

  // Se atualizar dataNascimento, validar se é uma data válida
  if (data.dataNascimento !== undefined) {
    const date = new Date(data.dataNascimento);
    if (isNaN(date.getTime())) {
      throw new ValidationError('Data de nascimento inválida', [{ field: 'dataNascimento', rule: 'invalid_date' }]);
    }
  }

  // Se atualizar planoId, verificar se o plano existe
  if (data.planoId !== undefined) {
    const plano = await planoRepo.findPlanoById(data.planoId);
    if (!plano) {
      throw new ValidationError('Plano inexistente', [{ field: 'planoId', rule: 'exists' }]);
    }
  }
  
  try {
    const updated = await repo.updateBeneficiario(id, data);
    return updated;
  } catch (e) {
    if (e.code === 'P2002') {
      const target = e.meta?.target?.[0] ?? '';
      if (target === 'cpf') throw new ConflictError('CPF já cadastrado');
      throw new ConflictError('Violação de unicidade');
    }
    throw e;
  }
};

// Deleta beneficiário (soft ou hard)
export const deleteBeneficiario = async (id, { soft = true } = {}) => {
  // soft default = true
  if (soft) {
    const b = await repo.findBeneficiarioById(id);
    if (!b) throw new NotFoundError('Beneficiário não encontrado');
    return repo.softDeleteBeneficiario(id);
  } else {
    // hard delete
    return repo.hardDeleteBeneficiario(id);
  }
};
