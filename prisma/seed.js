// 🌱 prisma/seed.mjs
// -----------------------------------------
// Este script serve para popular o banco de dados
// com dados iniciais ("seeds") usando o Prisma ORM.
// -----------------------------------------

// Importa o cliente Prisma (classe que dá acesso ao banco)
import { PrismaClient } from '@prisma/client';

// Cria uma instância do cliente para realizar queries
const prisma = new PrismaClient();

// Função principal que executa o processo de seed
async function main() {
  console.log('🌱 Iniciando seeds...');

  // -------------------------------
  // 1️⃣ Lista de Planos de Saúde
  // -------------------------------
  // Array com objetos que representam os planos iniciais
  // Esses campos correspondem aos nomes definidos no schema.prisma
  const planos = [
    { nome: 'Plano Bronze', codigoRegistroAns: 'ANS-100001' },
    { nome: 'Plano Prata',  codigoRegistroAns: 'ANS-100002' },
    { nome: 'Plano Ouro',   codigoRegistroAns: 'ANS-100003' },
    { nome: 'Plano Diamante', codigoRegistroAns: 'ANS-100004' },
    { nome: 'Plano Executivo', codigoRegistroAns: 'ANS-100005' }
  ];

  // Itera sobre cada plano e insere no banco de forma idempotente (sem duplicar)
  for (const p of planos) {
    await prisma.plano.upsert({
      // Localiza o plano pelo campo único codigoRegistroAns
      where: { codigoRegistroAns: p.codigoRegistroAns },
      // update vazio → se já existir, não altera nada
      update: {},
      // se não existir, cria com os dados do objeto p
      create: p
    });
  }

  console.log('✅ Planos inseridos/atualizados com sucesso.');

  // -------------------------------
  // 2️⃣ Lista de Beneficiários
  // -------------------------------
  // Array com beneficiários de exemplo
  // Observe que alguns campos têm nomes diferentes (snake_case),
  // e depois faremos o mapeamento correto pro modelo Prisma.
  const beneficiarios = [
    { nome_completo: 'João Pereira', cpf: '11144477735', data_nascimento: new Date('1988-01-10'), planoCodigo: 'ANS-100002', status: 'ATIVO' },
    { nome_completo: 'Maria Silva', cpf: '22233344456', data_nascimento: new Date('1990-03-15'), planoCodigo: 'ANS-100001', status: 'ATIVO' },
  ];

  // Itera sobre os beneficiários e cria (ou atualiza) cada um
  for (const b of beneficiarios) {
    // Busca o plano correspondente usando o código do plano
    const plano = await prisma.plano.findUnique({
      where: { codigoRegistroAns: b.planoCodigo }
    });

    // Se não encontrar o plano, pula o beneficiário
    if (!plano) continue;

    // Upsert → atualiza se o CPF já existe, senão cria novo
    await prisma.beneficiario.upsert({
      where: { cpf: b.cpf }, // localiza pelo CPF (único)
      update: {
        // Mapeia os campos pro formato do Prisma (camelCase)
        nomeCompleto: b.nome_completo,
        dataNascimento: b.data_nascimento,
        status: b.status,
        planoId: plano.id // associa o beneficiário ao plano correto
      },
      create: {
        nomeCompleto: b.nome_completo,
        cpf: b.cpf,
        dataNascimento: b.data_nascimento,
        status: b.status,
        planoId: plano.id
      }
    });
  }

  console.log('✅ Beneficiários inseridos/atualizados com sucesso.');
  console.log('🌱 Seeds concluídas.');
}

// Execução da função principal com tratamento de erros
main()
  .catch(e => {
    console.error('❌ Erro ao executar seeds:', e);
    // Define código de saída como erro sem encerrar imediatamente o processo
    process.exitCode = 1;
  })
  .finally(async () => {
    // Fecha a conexão com o banco (muito importante!)
    await prisma.$disconnect();
  });
