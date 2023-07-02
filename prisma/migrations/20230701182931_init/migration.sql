-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pageState" TEXT,
    "pageCity" TEXT,
    "sport" TEXT,
    "homeVenue" TEXT,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PagesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PagesToUser_AB_unique" ON "_PagesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PagesToUser_B_index" ON "_PagesToUser"("B");

-- AddForeignKey
ALTER TABLE "_PagesToUser" ADD CONSTRAINT "_PagesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PagesToUser" ADD CONSTRAINT "_PagesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
