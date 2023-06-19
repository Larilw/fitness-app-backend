/*
  Warnings:

  - You are about to alter the column `dataFinal` on the `Desafio` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `dataInicio` on the `Desafio` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `dataPesagem` on the `Pesagem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `dataNascimento` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `idFirebase` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Desafio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataInicio" INTEGER NOT NULL,
    "dataFinal" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "meta" DECIMAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "Desafio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Desafio" ("dataFinal", "dataInicio", "descricao", "id", "idUsuario", "meta", "titulo") SELECT "dataFinal", "dataInicio", "descricao", "id", "idUsuario", "meta", "titulo" FROM "Desafio";
DROP TABLE "Desafio";
ALTER TABLE "new_Desafio" RENAME TO "Desafio";
CREATE TABLE "new_Pesagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataPesagem" INTEGER NOT NULL,
    "peso" DECIMAL NOT NULL,
    "idDesafio" INTEGER NOT NULL,
    CONSTRAINT "Pesagem_idDesafio_fkey" FOREIGN KEY ("idDesafio") REFERENCES "Desafio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pesagem" ("dataPesagem", "id", "idDesafio", "peso") SELECT "dataPesagem", "id", "idDesafio", "peso" FROM "Pesagem";
DROP TABLE "Pesagem";
ALTER TABLE "new_Pesagem" RENAME TO "Pesagem";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFirebase" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dataNascimento" INTEGER NOT NULL,
    "pesoInicial" DECIMAL NOT NULL,
    "altura" INTEGER NOT NULL
);
INSERT INTO "new_Usuario" ("altura", "dataNascimento", "genero", "id", "idFirebase", "pesoInicial") SELECT "altura", "dataNascimento", "genero", "id", "idFirebase", "pesoInicial" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
