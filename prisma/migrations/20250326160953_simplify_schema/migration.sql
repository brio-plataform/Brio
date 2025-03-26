/*
  Warnings:

  - You are about to drop the `ContentBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCollaborator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectVersion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentBlock" DROP CONSTRAINT "ContentBlock_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectAuthor" DROP CONSTRAINT "ProjectAuthor_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCollaborator" DROP CONSTRAINT "ProjectCollaborator_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStats" DROP CONSTRAINT "ProjectStats_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectVersion" DROP CONSTRAINT "ProjectVersion_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "author" JSONB,
ADD COLUMN     "collaborators" JSONB,
ADD COLUMN     "content" JSONB,
ADD COLUMN     "stats" JSONB,
ADD COLUMN     "versions" JSONB;

-- DropTable
DROP TABLE "ContentBlock";

-- DropTable
DROP TABLE "ProjectAuthor";

-- DropTable
DROP TABLE "ProjectCollaborator";

-- DropTable
DROP TABLE "ProjectStats";

-- DropTable
DROP TABLE "ProjectVersion";
