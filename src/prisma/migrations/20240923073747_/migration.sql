/*
  Warnings:

  - Added the required column `commentText` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "commentText" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT;
