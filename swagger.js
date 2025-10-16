// Aqui configuramos o Swagger para documentar a API

// Usa swagger-ui-express para servir a interface do Swagger
import swaggerUi from 'swagger-ui-express';

// Usa yamljs para carregar o arquivo YAML
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./openapi.yaml'); // path relativo à raiz do projeto

export default function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
}
