/*
  Warnings:

  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFirebase" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dataNascimento" BIGINT NOT NULL,
    "pesoInicial" DECIMAL NOT NULL,
    "altura" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("altura", "dataNascimento", "genero", "id", "idFirebase", "pesoInicial") SELECT "altura", "dataNascimento", "genero", "id", "idFirebase", "pesoInicial" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
