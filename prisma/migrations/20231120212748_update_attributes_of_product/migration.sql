/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `categoryId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `categories`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
