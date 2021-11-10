-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PairToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PairToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PairToTeam_AB_unique" ON "_PairToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PairToTeam_B_index" ON "_PairToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PairToUser_AB_unique" ON "_PairToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PairToUser_B_index" ON "_PairToUser"("B");

-- AddForeignKey
ALTER TABLE "_PairToTeam" ADD FOREIGN KEY ("A") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PairToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PairToUser" ADD FOREIGN KEY ("A") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PairToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
