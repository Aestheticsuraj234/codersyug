-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    UNIQUE INDEX `Profile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `thumbnail` LONGTEXT NULL,
    `likes` INTEGER NULL DEFAULT 0,
    `Comments` INTEGER NULL DEFAULT 0,
    `content` LONGTEXT NULL,
    `readTime` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `category` VARCHAR(191) NULL,
    `subCategory` VARCHAR(191) NULL,
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `Blog_slug_key`(`slug`),
    INDEX `Blog_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitedBlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitorId` INTEGER NOT NULL,
    `blogId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `VisitedBlog_visitorId_blogId_idx`(`visitorId`, `blogId`),
    INDEX `VisitedBlog_blogId_idx`(`blogId`),
    UNIQUE INDEX `VisitedBlog_visitorId_blogId_key`(`visitorId`, `blogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `commenterId` INTEGER NOT NULL,
    `blogId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Comment_commenterId_idx`(`commenterId`),
    INDEX `Comment_blogId_idx`(`blogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `blogId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Likes_userId_blogId_idx`(`userId`, `blogId`),
    INDEX `Likes_blogId_idx`(`blogId`),
    UNIQUE INDEX `Likes_userId_blogId_key`(`userId`, `blogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('EBOOK', 'NOTES', 'VIDEO', 'CHEATSHEETS') NULL DEFAULT 'EBOOK',
    `Title` VARCHAR(191) NOT NULL,
    `Slug` VARCHAR(191) NOT NULL,
    `Description` LONGTEXT NULL,
    `Thumbnail` LONGTEXT NULL,
    `DownloadLink` LONGTEXT NULL,
    `Views` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `category` ENUM('Frontend', 'Backend', 'DevOps', 'Mobile', 'Design', 'React', 'Vue', 'DSA', 'Android', 'iOS', 'Flutter', 'Kotlin', 'CodingTips', 'JavaScript', 'TypeScript', 'Database', 'MachineLearning', 'Python', 'ArtificialIntelligence', 'Node', 'Go', 'Rust', 'Swift', 'Java', 'CSharp', 'CPlusPlus', 'C', 'WebDevelopment', 'ProgrammingTips', 'Git', 'GitHub') NULL,
    `subCategory` VARCHAR(191) NULL,
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `Resources_Slug_key`(`Slug`),
    INDEX `Resources_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SavedBlogs` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SavedBlogs_AB_unique`(`A`, `B`),
    INDEX `_SavedBlogs_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

