-- CreateTable
CREATE TABLE `FuelCheck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gasoline` DOUBLE NOT NULL,
    `ethanol` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
