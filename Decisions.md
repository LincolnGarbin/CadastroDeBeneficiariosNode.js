# DECISIONS.md

## Objetivo
Registrar as principais decisões técnicas tomadas no desenvolvimento do projeto, bem como os trade-offs entre simplicidade (MVP) e sofisticação (bônus).

---

## Banco de Dados
- **Decisão:** Usar MySQL com Prisma ORM.
- **Alternativas consideradas:** PostgreSQL.
- **Motivo:** Familiaridade e simplicidade no setup local. PostgreSQL é mais robusto, mas não essencial para o escopo atual.

---

## Identificadores (ID)
- **Decisão:** Utilizar UUID como chave primária.
- **Alternativas consideradas:** ID autoincrement (INT).
- **Motivo:** UUID melhora a segurança e facilita integração futura com sistemas externos.
- **Possível evolução:** Adicionar colunas como `created_at` e `updated_at` para maior rastreamento de mudanças.

---

## Exclusão de dados
- **Decisão:** Implementar **soft delete** usando coluna `deleted_at`.
- **Alternativas consideradas:** Hard delete.
- **Motivo:** Permite recuperação de dados.
- **Possível evolução:** Adicionar lógica para arquivamento automático de registros inativos após certo período.

---

## Validação de CPF
- **Decisão:** No MVP, apenas verificar se tem 11 dígitos numéricos e é único.
- **Alternativas consideradas:** Validação completa com algoritmo dos dígitos verificadores.
- **Motivo:** Entrega rápida.
- **Possível evolução:** Implementar validação completa como melhoria.

---

## Documentação (API)
- **Decisão:** Swagger/OpenAPI ficará para etapa posterior.
- **Motivo:** Priorizar endpoints funcionando primeiro.
- **Possível evolução:** Gerar documentação automática via Swagger UI.

---

## Testes
- **Decisão:** Iniciar com testes básicos (Jest + Supertest) para validar cenários críticos.
- **Evolução:** Ampliar para testes de integração mais completos.

---

## Infraestrutura
- **Decisão:** Rodar localmente sem Docker no início.
- **Evolução:** Adicionar Docker e docker-compose para padronizar ambiente.
