import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario.module';
import { DesafioModule } from './desafio.module';
import { UsuarioService } from './usuario.service';
import { DesafioService } from './desafio.service';
import { UsuarioController } from './usuario.controller';
import { DesafioController } from './desafio.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsuarioModule, DesafioModule],
  controllers: [AppController, DesafioController, UsuarioController],
  providers: [AppService, DesafioService, UsuarioService, PrismaService],
})
export class AppModule {}
