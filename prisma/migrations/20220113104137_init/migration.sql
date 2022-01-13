-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('PRIA', 'WANITA');

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "noKk" TEXT NOT NULL,
    "noKontak" TEXT NOT NULL,
    "jk" "Sex" NOT NULL,
    "alamat" TEXT NOT NULL,
    "universitas" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kriteria" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "core" BOOLEAN NOT NULL,

    CONSTRAINT "Kriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subkriteria" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "kriteriaId" INTEGER NOT NULL,
    "bobot" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Subkriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penilaian" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subkriteriaId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,

    CONSTRAINT "Penilaian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subkriteria" ADD CONSTRAINT "Subkriteria_kriteriaId_fkey" FOREIGN KEY ("kriteriaId") REFERENCES "Kriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_subkriteriaId_fkey" FOREIGN KEY ("subkriteriaId") REFERENCES "Subkriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
