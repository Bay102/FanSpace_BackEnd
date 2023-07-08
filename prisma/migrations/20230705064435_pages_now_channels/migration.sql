/*
  Warnings:

  - You are about to drop the `Pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PagesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PagesToUser" DROP CONSTRAINT "_PagesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PagesToUser" DROP CONSTRAINT "_PagesToUser_B_fkey";

-- DropTable
DROP TABLE "Pages";

-- DropTable
DROP TABLE "_PagesToUser";

-- CreateTable
CREATE TABLE "Channels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pageState" TEXT,
    "pageCity" TEXT,
    "sport" TEXT,
    "homeVenue" TEXT,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelsToUser_AB_unique" ON "_ChannelsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelsToUser_B_index" ON "_ChannelsToUser"("B");

-- AddForeignKey
ALTER TABLE "_ChannelsToUser" ADD CONSTRAINT "_ChannelsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelsToUser" ADD CONSTRAINT "_ChannelsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
