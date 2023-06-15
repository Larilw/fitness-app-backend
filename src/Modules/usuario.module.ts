import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Services/prisma.service';
import { UsuarioController } from '../Controllers/usuario.controller';
import { UsuarioService } from '../Services/usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [PrismaService, UsuarioService],
})
export class UsuarioModule {}
