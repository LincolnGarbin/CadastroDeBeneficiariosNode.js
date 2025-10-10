-- CreateTable
CREATE TABLE `Plano` (
    `id` CHAR(36) NOT NULL,
    `nome` VARCHAR(40) NOT NULL,
    `codigo_registro_ans` VARCHAR(20) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Plano_nome_key`(`nome`),
    UNIQUE INDEX `Plano_codigo_registro_ans_key`(`codigo_registro_ans`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Beneficiario` (
    `id` CHAR(36) NOT NULL,
    `fk_id_plano` CHAR(36) NOT NULL,
    `nome_completo` VARCHAR(100) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(10) NOT NULL DEFAULT 'ATIVO',
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Beneficiario_cpf_key`(`cpf`),
    INDEX `Beneficiario_fk_id_plano_idx`(`fk_id_plano`),
    INDEX `Beneficiario_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Beneficiario` ADD CONSTRAINT `Beneficiario_fk_id_plano_fkey` FOREIGN KEY (`fk_id_plano`) REFERENCES `Plano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
