-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'article',
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Em Andamento',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public',
ADD COLUMN     "wordCount" INTEGER NOT NULL DEFAULT 0;
