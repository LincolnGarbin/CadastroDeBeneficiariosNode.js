// Serviço para gerenciar planos, com validações e regras de negócio

import * as repo from '../repositories/plano.repository.js';
import { ConflictError, NotFoundError, ValidationError } from '../utils/errors.js';
import prisma from '../db/prismaClient.js';

// Validação simples do payload de criação/atualização de plano
// Retorna array de detalhes (empty se válido)
function validatePlanoPayload(payload) {
  const details = []; // Array para acumular detalhes de erro

  // Verifica se payload existe e é um objeto
  if (!payload || typeof payload !== 'object') {
    details.push({ field: '_', rule: 'required', message: 'Payload ausente' });
    return details;
  }

  // Verifica se nome existe em payload, se é string e se não vazia (só espaços)
  if (!payload.nome || typeof payload.nome !== 'string' || payload.nome.trim() === '') {
    details.push({ field: 'nome', rule: 'required' });
  }

  // Mesma verificação para codigoRegistroAns
  if (!payload.codigoRegistroAns || typeof payload.codigoRegistroAns !== 'string' || payload.codigoRegistroAns.trim() === '') {
    details.push({ field: 'codigoRegistroAns', rule: 'required' });
  }

  return details;
}

// Cria um plano com validações
export const createPlano = async (payload) => {
  const errors = validatePlanoPayload(payload);
  if (errors.length) {
    throw new ValidationError('Payload inválido', errors);
  }

  try {
    // Chama plano.repository para criar plano com prisma
    const created = await repo.createPlano({
      nome: payload.nome.trim(),
      codigoRegistroAns: payload.codigoRegistroAns.trim()
    });
    return created;
  } catch (e) {
    if (e.code === 'P2002') {
      const target = e.meta?.target?.[0] ?? null;
      if (target === 'nome') {
        throw new ConflictError('Nome do plano já existe');
      } 
      // Tratar ambos os formatos possíveis, nome da coluna no DB e nome prisma
      if (target === 'codigo_registro_ans' || target === 'codigoRegistroAns') {
        throw new ConflictError('Código de registro ANS já cadastrado');
      }
      // Genérico
      throw new ConflictError('Violação de unicidade');
    }
    // Rethrow erros não esperados para middleware tratar
    throw e;
  }
};

// Lista planos ativos (não soft-deleted)
export const listPlanos = async () => {
  return repo.listPlanos();
};

// Busca um plano por ID
// Retorna NotFoundError se não existir ou estiver soft-deleted
export const getPlanoById = async (id) => {
  const p = await repo.findPlanoById(id);
  if (!p || p.deletedAt) {
    throw new NotFoundError('Plano não encontrado');
  }
  return p;
};

// Atualiza um plano com validações parciais
export const updatePlano = async (id, payload) => {
  // Checar existência
  const existing = await repo.findPlanoById(id);
  if (!existing || existing.deletedAt) {
    throw new NotFoundError('Plano não encontrado');
  }

  // Validação mínima
  // Se nome enviado, checar formato
  const toUpdate = {};
  if (payload.nome !== undefined) {
    if (typeof payload.nome !== 'string' || payload.nome.trim() === '') {
      throw new ValidationError('Nome inválido', [{ field: 'nome', rule: 'required' }]);
    }
    toUpdate.nome = payload.nome.trim();
  }
  // Se codigoRegistroAns enviado, checar formato
  if (payload.codigoRegistroAns !== undefined) {
    if (typeof payload.codigoRegistroAns !== 'string' || payload.codigoRegistroAns.trim() === '') {
      throw new ValidationError('codigoRegistroAns inválido', [{ field: 'codigoRegistroAns', rule: 'required' }]);
    }
    toUpdate.codigoRegistroAns = payload.codigoRegistroAns.trim();
  }
 // Se nada para atualizar, retornar existente
  if (Object.keys(toUpdate).length === 0) {
    return existing;
  }

  try {
    const updated = await repo.updatePlano(id, toUpdate);
    return updated;
  } catch (e) {
    if (e.code === 'P2002') {
      const target = e.meta?.target?.[0] ?? null;
      if (target === 'nome') throw new ConflictError('Nome do plano já existe');
      if (target === 'codigo_registro_ans' || target === 'codigoRegistroAns') throw new ConflictError('Código ANS já cadastrado');
      throw new ConflictError('Violação de unicidade');
    }
    throw e;
  }
};

// Deleta um plano (soft ou hard) com validações
export const deletePlano = async (id, { soft = true } = {}) => {
  // Verificar existência
  const existing = await repo.findPlanoById(id);
  if (!existing || existing.deletedAt) {
    throw new NotFoundError('Plano não encontrado');
  }

  // Verificar se há beneficiários vinculados
  const count = await prisma.beneficiario.count({
    where: { planoId: id, deletedAt: null }
  });

  // Se houver beneficiários ativos, bloquear remoção
  if (count > 0) {
    throw new ConflictError('Não é possível remover plano com beneficiários vinculados');
  }

 // Executa soft delete, preenchendo deletedAt com timestamp atual
  if (soft) {
    return repo.softDeletePlano(id);
  } else {
    // Hard delete definitivo
    return repo.deletePlano(id);
  }
};
