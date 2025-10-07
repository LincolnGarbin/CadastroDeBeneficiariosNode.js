# Data Dictionary — Cadastro de Beneficiários

## Tabela: Plano
| Campo                 | Tipo SQL         | Restrição                    | Descrição |
|-----------------------|------------------|------------------------------|----------|
| id_plano                   | CHAR(36)         | PK, NOT NULL, DEFAULT UUID() | Identificador único do plano (UUID) |
| nome                  | VARCHAR(40)     | NOT NULL, UNIQUE             | Nome do plano (ex: "Plano Ouro") |
| codigo_registro_ans   | VARCHAR(20)      | NOT NULL, UNIQUE             | Código de registro na ANS (formato livre) |
| deleted_at            | TIMESTAMP NULL   | NULL por padrão              | Timestamp da exclusão lógica (soft delete) |

## Tabela: Beneficiario
| Campo                 | Tipo SQL         | Restrição                    | Descrição |
|-----------------------|------------------|------------------------------|----------|
| id_beneficiario       | CHAR(36)         | PK, NOT NULL, DEFAULT UUID() | Identificador único do beneficiário (UUID) |
| fk_id_plano           | CHAR(36)         | NOT NULL, FK -> planos(id)   | FK para o plano (obrigatório) |
| nome_completo         | VARCHAR(100)     | NOT NULL                     | Nome completo do beneficiário |
| cpf                   | CHAR(11)         | NOT NULL, UNIQUE             | CPF (apenas dígitos, 11 caracteres) |
| data_nascimento       | DATE             | NOT NULL                     | Data de nascimento |
| status                | VARCHAR(10)      | NOT NULL, DEFAULT 'ATIVO'    | Status: 'ATIVO' ou 'INATIVO' |
| data_cadastro         | TIMESTAMP       | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data/hora do cadastro |
| deleted_at            | TIMESTAMP NULL    | NULL por padrão              | Timestamp da exclusão lógica (soft delete) |

### Observações
- `uuid` implementação: armazenamos como `CHAR(36)` com valor gerado por `UUID()` no MySQL (formato textual `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
- `cpf` armazenado sem pontuação (somente dígitos). Validar antes de inserir.
- `deleted_at` deixado como `NULL` para registros ativos; `NOT NULL` indica soft-deleted.
