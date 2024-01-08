/*
  Warnings:

  - You are about to drop the column `categoryName` on the `products` table. All the data in the column will be lost.
  - Made the column `checked` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryName_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `categoryName`,
    ADD COLUMN `amountSimbolId` VARCHAR(191) NULL,
    ADD COLUMN `categoryId` VARCHAR(191) NULL,
    MODIFY `checked` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `amountSimbols` (
    `name` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `amountSimbols_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_amountSimbolId_fkey` FOREIGN KEY (`amountSimbolId`) REFERENCES `amountSimbols`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
