/*
  Warnings:

  - You are about to drop the column `teamCity` on the `Pages` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `Pages` table. All the data in the column will be lost.
  - You are about to drop the column `teamState` on the `Pages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pages" DROP COLUMN "teamCity",
DROP COLUMN "teamName",
DROP COLUMN "teamState",
ADD COLUMN     "homeVenue" TEXT,
ADD COLUMN     "pageCity" TEXT,
ADD COLUMN     "pageState" TEXT,
ADD COLUMN     "sport" TEXT;
