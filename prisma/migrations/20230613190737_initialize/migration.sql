-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFirebase" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "pesoInicial" DECIMAL NOT NULL,
    "altura" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Desafio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinal" DATETIME NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "meta" DECIMAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "Desafio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pesagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataPesagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso" DECIMAL NOT NULL,
    "idDesafio" INTEGER NOT NULL,
    CONSTRAINT "Pesagem_idDesafio_fkey" FOREIGN KEY ("idDesafio") REFERENCES "Desafio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
