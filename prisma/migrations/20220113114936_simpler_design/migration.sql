/*
  Warnings:

  - You are about to drop the column `mahasiswaId` on the `Penilaian` table. All the data in the column will be lost.
  - You are about to drop the column `subkriteriaId` on the `Penilaian` table. All the data in the column will be lost.
  - You are about to drop the `Kriteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subkriteria` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[penilaianId]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `penilaianId` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pekerjaan` to the `Penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendapatanKep` to the `Penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusKeluarga` to the `Penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggungan` to the `Penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatTinggal` to the `Penilaian` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KriteriaType" AS ENUM ('RANGE', 'CATEGORIAL');

-- CreateEnum
CREATE TYPE "Pekerjaan" AS ENUM ('PETANI', 'SWASTA', 'PNS', 'LAIN');

-- CreateEnum
CREATE TYPE "StatusKeluarga" AS ENUM ('LENGKAP', 'YATIM_PIATU');

-- CreateEnum
CREATE TYPE "JenisTempatTinggal" AS ENUM ('RUMAH_SEDERHANA', 'RUMAH_MENENGAH');

-- DropForeignKey
ALTER TABLE "Penilaian" DROP CONSTRAINT "Penilaian_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Penilaian" DROP CONSTRAINT "Penilaian_subkriteriaId_fkey";

-- DropForeignKey
ALTER TABLE "Subkriteria" DROP CONSTRAINT "Subkriteria_kriteriaId_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "penilaianId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Penilaian" DROP COLUMN "mahasiswaId",
DROP COLUMN "subkriteriaId",
ADD COLUMN     "pekerjaan" "Pekerjaan" NOT NULL,
ADD COLUMN     "pendapatanKep" INTEGER NOT NULL,
ADD COLUMN     "statusKeluarga" "StatusKeluarga" NOT NULL,
ADD COLUMN     "tanggungan" INTEGER NOT NULL,
ADD COLUMN     "tempatTinggal" "JenisTempatTinggal" NOT NULL;

-- DropTable
DROP TABLE "Kriteria";

-- DropTable
DROP TABLE "Subkriteria";

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_penilaianId_key" ON "Mahasiswa"("penilaianId");

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_penilaianId_fkey" FOREIGN KEY ("penilaianId") REFERENCES "Penilaian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
