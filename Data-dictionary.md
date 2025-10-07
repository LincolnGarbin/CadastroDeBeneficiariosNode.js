# Data Dictionary — Cadastro de Beneficiários

## Tabela: planos
| Campo                 | Tipo SQL         | Restrição                    | Descrição |
|-----------------------|------------------|------------------------------|----------|
| id                    | CHAR(36)         | PK, NOT NULL, DEFAULT UUID() | Identificador único do plano (UUID) |
| nome                  | VARCHAR(255)     | NOT NULL, UNIQUE             | Nome do plano (ex: "Plano Ouro") |
| codigo_registro_ans   | VARCHAR(20)      | NOT NULL, UNIQUE             | Código de registro na ANS (formato livre) |
| created_at            | TIMESTAMP        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data/hora de criação |
| updated_at            | TIMESTAMP        | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Data/hora da última atualização |
| deleted_at            | TIMESTAMP NULL   | NULL por padrão              | Timestamp da exclusão lógica (soft delete) opcional |

## Tabela: beneficiarios
| Campo                 | Tipo SQL         | Restrição                    | Descrição |
|-----------------------|------------------|------------------------------|----------|
| id                    | CHAR(36)         | PK, NOT NULL, DEFAULT UUID() | Identificador único do beneficiário (UUID) |
| nome_completo         | VARCHAR(255)     | NOT NULL                     | Nome completo do beneficiário |
| cpf                   | CHAR(11)         | NOT NULL, UNIQUE             | CPF (apenas dígitos, 11 caracteres) |
| data_nascimento       | DATE             | NOT NULL                     | Data de nascimento |
| status                | VARCHAR(10)      | NOT NULL, DEFAULT 'ATIVO'    | Status: 'ATIVO' ou 'INATIVO' |
| plano_id              | CHAR(36)         | NOT NULL, FK -> planos(id)   | FK para o plano (obrigatório) |
| data_cadastro         | TIMESTAMP        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data/hora do cadastro |
| created_at            | TIMESTAMP        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data/hora de criação |
| updated_at            | TIMESTAMP        | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Data/hora da última atualização |
| deleted_at            | TIMESTAMP NULL   | NULL por padrão              | Timestamp da exclusão lógica (soft delete) opcional |

### Observações
- `uuid` implmentação: armazenamos como `CHAR(36)` com valor gerado por `UUID()` no MySQL (formato textual `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
- `cpf` armazenado sem pontuação (somente dígitos). Validar na API (regex `^\d{11}$`) antes de inserir.
- `deleted_at` deixado como `NULL` para registros ativos; `NOT NULL` indica soft-deleted.
- Indices recomendados: `beneficiarios(cpf) UNIQUE`, `beneficiarios(plano_id)`, `beneficiarios(status)`, `beneficiarios(deleted_at)`.
