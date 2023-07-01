/*
  Warnings:

  - You are about to drop the `_UserPages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserPages" DROP CONSTRAINT "_UserPages_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserPages" DROP CONSTRAINT "_UserPages_B_fkey";

-- DropTable
DROP TABLE "_UserPages";

-- CreateTable
CREATE TABLE "_PagesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PagesToUser_AB_unique" ON "_PagesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PagesToUser_B_index" ON "_PagesToUser"("B");

-- AddForeignKey
ALTER TABLE "_PagesToUser" ADD CONSTRAINT "_PagesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PagesToUser" ADD CONSTRAINT "_PagesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
