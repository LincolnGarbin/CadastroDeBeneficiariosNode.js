// Padronização de erros de resposta HTTP, para facilitar o middleware

// Error 404 - Dado não encontrado
export class NotFoundError extends Error {
  constructor(message = 'Not Found') { // Construtor recebe mensagem opcional
    super(message); // Chama o construtor da classe pai (Error) passando a mensagem
    this.name = 'NotFoundError'; // Define o nome do erro
    this.status = 404; // Código HTTP 404
  }
}

// Error 409 - Conflito de dados (ex: CPF ou código do plano já existe)
export class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
  }
}

// Error 422 - Erro de validação (dados inválidos na requisição)
export class ValidationError extends Error {
  constructor(message = 'Validation Error', details = []) {
    super(message);
    this.name = 'ValidationError';
    this.status = 422;
    this.details = details; // array com detalhes dos erros de validação
  }
}
