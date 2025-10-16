# 🩺 Cadastro de Beneficiários — API REST (Desafio Técnico)

API RESTful desenvolvida como parte de um desafio técnico para backend júnior.  
O objetivo é gerenciar **planos** e **beneficiários**, permitindo realizar operações de CRUD, associar beneficiários a planos e expor uma documentação interativa via **Swagger/OpenAPI**.

---

## 🚀 Tecnologias utilizadas

- **Node.js** — ambiente de execução  
- **Express** — framework para criação de rotas e middlewares  
- **Prisma ORM** — acesso e manipulação do banco de dados  
- **MySQL** — banco de dados relacional  
- **Swagger UI + OpenAPI** — documentação interativa da API  

---

## 🧱 Estrutura de Pastas

```
CADASTRO DE BENEFICIARIOS/
│
├── prisma/                      # Configurações do Prisma ORM
│   ├── migrations/              # Histórico de migrações do banco de dados
│   ├── schema.prisma            # Definição do modelo de dados
│   └── seed.js                  # Script para popular o banco com dados iniciais
│
├── src/                         # Código fonte da aplicação
│   ├── controllers/             # Camada responsável por lidar com as requisições HTTP
│   │   ├── beneficiarios.controller.js
│   │   └── planos.controller.js
│   │
│   ├── db/                      # Conexão e inicialização do banco de dados
│   │   └── prismaClient.js
│   │
│   ├── middleware/              # Middlewares globais (tratamento de erros, logs, etc.)
│   │   └── errorHandler.js
│   │
│   ├── repositories/            # Acesso direto ao banco (camada de persistência)
│   │   ├── beneficiario.repository.js
│   │   └── plano.repository.js
│   │
│   ├── services/                # Regras de negócio e lógica de aplicação
│   │   ├── beneficiarios.service.js
│   │   └── planos.services.js
│   │
│   └── utils/                   # Funções utilitárias e auxiliares
│       └── errors.js
│
├── .env                         # Variáveis de ambiente (como URL do banco)
├── .gitignore                   # Arquivos ignorados pelo Git
├── data-dictionary.md           # Dicionário de dados do banco
├── decisions.md                 # Decisões de projeto e arquitetura
├── openapi.yaml                 # Especificação OpenAPI / Swagger da API
├── package.json                 # Dependências e scripts do projeto
├── package-lock.json            # Lockfile de dependências
├── README.md                    # Documentação principal do projeto
├── server.js                    # Ponto de entrada da aplicação (inicializa o servidor Express)
└── swagger.js                   # Configuração do Swagger para documentação interativa

```

### 📁 Organização:
- **controllers/** → recebem as requisições e enviam as respostas HTTP.  
- **services/** → contêm a lógica de negócio e interagem com o Prisma.  
- **repositories/** → definem as operações de acesso a dados.  
- **prisma/** → configuração,  schema do banco de dados e seed.  
- **middleware/** → contém middlewares para tratamento de requisições.  
- **utils/** → funções utilitárias e helpers.
- **openapi.yaml** → arquivo de especificação **OpenAPI** (Swagger).  
- **swagger.js** → configuração da documentação Swagger.  
- **server.js** → ponto de entrada da aplicação.
- **data-dictionary.md** → dicionário de dados com definições das entidades.
- **decisions.md** → decisões arquiteturais e tecnológicas do projeto.

---

## 🧩 Modelagem do Banco de Dados

**Prisma Schema (`schema.prisma`)**

```prisma
model Plano {
  id             String           @id @default(uuid())
  nome           String
  registroAns    String
  deletedAt     DateTime?        @default(null)
  beneficiarios  Beneficiario[]
}

model Beneficiario {
  id              String   @id @default(uuid())
  nomeCompleto    String
  cpf             String   @unique
  dataNascimento  DateTime
  deletedAt      DateTime? @default(null)
  planoId         String   @foreignKey
  plano           Plano    @relation(fields: [planoId], references: [id])
}
```

---

## ⚙️ Instalação e execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/LincolnGarbin/CadastroDeBeneficiariosNode.js
cd CadastroDeBeneficiariosNode.js
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar o banco de dados
Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL="file:./dev.db"
example: DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 4️⃣ Rodar as migrações
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Rodar as seeds (dados iniciais)
```bash
npx prisma db seed
```

### 6️⃣ Iniciar o servidor
```bash
node server.js
```

> O servidor estará disponível em:  
> 👉 **http://localhost:3001**

---

## 📘 Documentação da API (Swagger)

Após iniciar o servidor, acesse:

📍 **http://localhost:3001/docs**

Lá você encontrará a documentação **interativa** gerada a partir do arquivo `openapi.yaml`, onde é possível testar endpoints diretamente no navegador.

---

## 🧠 Endpoints principais

### 🩺 Planos
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/planos` | Cria um novo plano |
| `GET` | `/planos` | Lista todos os planos |
| `GET` | `/planos/:id` | Retorna um plano específico |
| `PUT` | `/planos/:id` | Atualiza um plano existente |
| `DELETE` | `/planos/:id` | Exclui um plano |

### 👥 Beneficiários
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/beneficiarios` | Cadastra um novo beneficiário |
| `GET` | `/beneficiarios` | Lista todos os beneficiários |
| `GET` | `/beneficiarios/:id` | Retorna um beneficiário específico |
| `PUT` | `/beneficiarios/:id` | Atualiza dados do beneficiário |
| `DELETE` | `/beneficiarios/:id` | Remove um beneficiário |

---

## 🧩 Exemplo de JSON para criação de Beneficiário

```json
{
  "nomeCompleto": "Maria da Silva",
  "cpf": "11144477735",
  "dataNascimento": "1988-01-10T00:00:00.000Z",
  "planoId": "c63da5f1-6335-4897-8f26-ab77262cffec"
}
```

> ⚠️ O campo `dataNascimento` deve seguir o formato **ISO-8601** (com “T” e fuso horário).

---

## 👨‍💻 Autor

**Lincoln Souza Garbin**  
Desenvolvedor Backend Júnior  
💼 Projeto desenvolvido como parte de desafio técnico.

---

## 📝 Licença
Este projeto é de uso livre para fins de estudo e demonstração técnica.
