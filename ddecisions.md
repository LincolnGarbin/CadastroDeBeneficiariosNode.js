# DECISIONS.md

## Objetivo
Registrar as principais decisões técnicas tomadas no desenvolvimento do projeto.

---

## Banco de Dados
- **Decisão:** Usar **MySQL** com **Prisma ORM**.
- **Alternativas consideradas:** PostgreSQL, SQLite.
- **Motivo:** MySQL é simples de configurar e compatível com o Prisma, ideal para ambiente local de desenvolvimento. Além da familiaridade com a tecnologia.
- **Possível evolução:** Adicionar Docker Compose com container de banco de dados.

---

## Identificadores (ID)
- **Decisão:** Utilizar **UUID (string de 36 caracteres)** como chave primária.
- **Alternativas consideradas:** ID autoincrement (INT).
- **Motivo:** Garante unicidade global e facilita integração futura com outros sistemas.
- **Possível evolução:** Implementar colunas de auditoria (`created_at`, `updated_at`).

---

## Exclusão de dados
- **Decisão:** Implementar **soft delete** usando coluna `deleted_at`.
- **Alternativas consideradas:** Hard delete.
- **Motivo:** Permite manter histórico e recuperação de registros excluídos.
- **Possível evolução:** Adicionar endpoint para restaurar beneficiários excluídos.

---

## Validação de CPF
- **Decisão:** Verificar apenas formato com 11 dígitos e unicidade no banco. 
- **Alternativas consideradas:** Implementar algoritmo de validação completa dos dígitos verificadores.
- **Motivo:** Simplificação para foco na entrega funcional.
- **Possível evolução:** Implementar validação completa posteriormente.

---

## Documentação (API)
- **Decisão:** Implementar **Swagger/OpenAPI** com arquivo `openapi.yaml` e integração via `swagger.js`.
- **Motivo:** Facilitar testes e leitura da API sem depender de ferramentas externas (Postman/Insomnia).

---

## Testes
- **Decisão:** Testes manuais com **Echo API / Postman** durante o desenvolvimento.
- **Alternativas consideradas:** Jest + Supertest.
- **Motivo:** Entrega mais rápida e foco em funcionalidade principal.
- **Possível evolução:** Adicionar Jest e Supertest para cobertura automatizada.

---

## Infraestrutura
- **Decisão:** Executar aplicação localmente, sem Docker.
- **Motivo:** Menor tempo de setup e simplificação da execução do servidor.
- **Possível evolução:** Adicionar `docker-compose.yml` com containers para aplicação e banco de dados.

---

## Organização do Projeto
- **Decisão:** Estrutura modular em camadas:
  ```
  src/
  ├── controllers/        → Lida com as rotas HTTP
  ├── services/           → Contém a lógica de negócio
  ├── repositories/       → Comunicação com o banco via Prisma
  ├── db/                 → Configuração do Prisma Client
  ├── middleware/         → Tratamento centralizado de erros
  ├── utils/              → Funções auxiliares
  ```
- **Motivo:** Separar responsabilidades e facilitar manutenção.