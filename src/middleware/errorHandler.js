// Centraliza respostas de erro e evita duplicação nos controllers

export default function errorHandler(err, req, res, next) {
  // Log para debug (em produção prefira logger com níveis)
  console.error(err);

  // Se for erro custom (tem .status definido), use esse status
  if (err && err.status) {
    return res.status(err.status).json({
      error: err.name || 'Error',
      message: err.message,
      details: err.details ?? null
    });
  }

  // Erro genérico
  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Ocorreu um erro interno no servidor'
  });
}
