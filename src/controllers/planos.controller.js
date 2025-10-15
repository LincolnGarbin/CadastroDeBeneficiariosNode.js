// Controller para gerenciar planos
// Define as rotas e chama os serviços apropriados

import express from 'express';
import * as service from '../services/planos.services.js';

// Roteador Express
const router = express.Router();

// POST /api/planos
// Cria um novo plano
router.post('/', async (req, res, next) => {
  try {
    // Payload: { nome, codigoRegistroAns}
    // Cria constante que recebe o corpo da requisição
    const payload = req.body;
    // Chama o serviço para criar o plano no BD
    const created = await service.createPlano(payload);
     // Retorna 201 Created com o objeto criado
    return res.status(201).json(created);
  } catch (err) {
    // delega para o middleware de erro central (next)
    return next(err);
  }
});

// GET /api/planos
// Lista planos com filtros opcionais
router.get('/', async (req, res, next) => {
  try {
    const rows = await service.listPlanos(); // Chama o serviço para listar planos
    return res.json(rows); // Retorna a lista como JSON
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const item = await service.getPlanoById(req.params.id);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
});

// GET /api/planos/:id
// Busca plano por ID
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await service.updatePlano(req.params.id, req.body);
    return res.json(updated); // Retorna o plano atualizado
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

// DELETE /api/planos/:id
// Remove plano por ID (soft delete por padrão)
router.delete('/:id', async (req, res, next) => {
  try {
    // se precisar forçar hard delete: /api/planos/:id?hard=true
    const hard = req.query.hard === 'true';
    await service.deletePlano(req.params.id, { soft: !hard });
    return res.status(204).send(); // Retorna 204 No Content, indicando sucesso
  } catch (err) {
    return next(err); // Passa erro para middleware
  }
});

export default router;
