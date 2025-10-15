// Controller para gerenciar beneficiários
// Define as rotas e chama os serviços apropriados

import express from 'express';
import * as service from '../services/beneficiarios.service.js';

// Roteador Express
const router = express.Router();

// POST /api/beneficiarios
// Cria um novo beneficiário
router.post('/', async (req, res, next) => {
  try {
    // Payload: { nomeCompleto, cpf, dataNascimento, planoId }
    // Cria constante que recebe o corpo da requisição
    const payload = req.body; 
    // Chama o serviço para criar o beneficiário no BD
    const created = await service.createBeneficiario(payload);
    // Retorna 201 Created com o objeto criado
    return res.status(201).json(created);
  } catch (err) {
    // Se erro, passa para o middleware de tratamento
    return next(err);
  }
});

// GET /api/beneficiarios
// Lista beneficiários com filtros opcionais
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status, // Filtro por status
      planoId: req.query.plano_id, // Filtro por planoId
      page: req.query.page ? Number(req.query.page) : undefined, // Filtro por página
      limit: req.query.limit ? Number(req.query.limit) : undefined // Filtro por limite
    };
    // Chama o serviço para listar com os filtros
    const rows = await service.listBeneficiarios(filters);
    return res.json(rows); // Retorna a lista como JSON
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

// GET /api/beneficiarios/:id
// Busca beneficiário por ID
router.get('/:id', async (req, res, next) => {
  try {
    const item = await service.getBeneficiarioById(req.params.id);
    return res.json(item); // Retorna o beneficiário como JSON
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

// PUT /api/beneficiarios/:id
// Atualiza beneficiário por ID
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await service.updateBeneficiario(req.params.id, req.body);
    return res.json(updated); // Retorna o beneficiário atualizado
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

// DELETE /api/beneficiarios/:id
// Remove beneficiário por ID (soft delete por padrão)
router.delete('/:id', async (req, res, next) => {
  try {
    // se precisar forçar hard delete: /api/beneficiarios/:id?hard=true
    const hard = req.query.hard === 'true';
    await service.deleteBeneficiario(req.params.id, { soft: !hard });
    return res.status(204).send(); // Retorna 204 No Content, indicando sucesso
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

export default router;
