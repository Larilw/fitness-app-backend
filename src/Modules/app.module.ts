import { Module } from '@nestjs/common';

import { AppController } from '../Controllers/app.controller';
import { UsuarioController } from '../Controllers/usuario.controller';
import { DesafioController } from '../Controllers/desafio.controller';
import { PesagemController } from '../Controllers/pesagem.controller';

import { UsuarioModule } from './usuario.module';
import { DesafioModule } from './desafio.module';
import { PesagemModule } from './pesagem.module';

import { AppService } from '../Services/app.service';
import { UsuarioService } from '../Services/usuario.service';
import { DesafioService } from '../Services/desafio.service';
import { PesagemService } from '../Services/pesagem.service';
import { PrismaService } from '../Services/prisma.service';

@Module({
  imports: [UsuarioModule, DesafioModule, PesagemModule],
  controllers: [
    AppController,
    DesafioController,
    UsuarioController,
    PesagemController,
  ],
  providers: [
    AppService,
    DesafioService,
    UsuarioService,
    PrismaService,
    PesagemService,
  ],
})
export class AppModule {}
