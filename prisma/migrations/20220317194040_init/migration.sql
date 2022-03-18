/*
  Warnings:

  - Added the required column `value` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `value` DECIMAL(10, 2) NOT NULL;

-- CreateTable
CREATE TABLE `stock_caches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(16) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
