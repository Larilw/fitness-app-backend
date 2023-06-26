-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Desafio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataInicio" BIGINT NOT NULL,
    "dataFinal" BIGINT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "meta" DECIMAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "Desafio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Desafio" ("dataFinal", "dataInicio", "descricao", "id", "idUsuario", "meta", "titulo") SELECT "dataFinal", "dataInicio", "descricao", "id", "idUsuario", "meta", "titulo" FROM "Desafio";
DROP TABLE "Desafio";
ALTER TABLE "new_Desafio" RENAME TO "Desafio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
