-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "author" JSONB NOT NULL DEFAULT '{"name":"","avatar":"","institution":""}',
ADD COLUMN     "citations" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "collaborators" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "content" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "stats" JSONB NOT NULL DEFAULT '{"views":0,"stars":0,"forks":0,"comments":0,"shares":0}',
ADD COLUMN     "version" JSONB[] DEFAULT ARRAY[]::JSONB[];
