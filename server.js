// Arquivo principal da aplicação Express
// Inicializa middlewares, rotas e o tratamento de erros global

import express from 'express';
import bodyParser from 'body-parser';

// Importa os controladores (routers)
import beneficiariosRouter from './src/controllers/beneficiarios.controller.js';
import planosRouter from './src/controllers/planos.controller.js';

// Importa middleware de erro centralizado
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

// Middleware para interpretar JSON e formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas principais da API
app.use('/api/beneficiarios', beneficiariosRouter);
app.use('/api/planos', planosRouter);

// Middleware final de tratamento de erros
app.use(errorHandler);

// Define a porta padrão e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
