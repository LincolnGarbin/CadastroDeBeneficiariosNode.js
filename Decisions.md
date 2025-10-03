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
- **Decisão:** Começar com `id` autoincrement (INT).
- **Alternativas consideradas:** UUID como chave primária.
- **Motivo:** Mais simples de implementar no MVP. UUID dificulta adivinhação de dados, mas adiciona complexidade.
- **Possível evolução:** Adicionar coluna `public_id` (UUID) como identificador público e gradualmente migrar a API.

---

## Exclusão de dados
- **Decisão:** Implementar inicialmente **hard delete** (DELETE no banco).
- **Alternativas consideradas:** Soft delete.
- **Motivo:** Simplicidade. Soft delete exige alterar queries e maior controle.
- **Possível evolução:** Migrar para soft delete futuramente para maior segurança de dados e rastreamento.

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
