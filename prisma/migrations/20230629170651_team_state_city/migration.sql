/*
  Warnings:

  - Added the required column `teamCity` to the `Pages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamState` to the `Pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pages" ADD COLUMN     "teamCity" TEXT NOT NULL,
ADD COLUMN     "teamState" TEXT NOT NULL;
