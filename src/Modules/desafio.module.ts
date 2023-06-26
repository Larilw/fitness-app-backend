import { Module } from '@nestjs/common';
import { DesafioService } from '../Services/desafio.service';
import { DesafioController } from '../Controllers/desafio.controller';
import { PrismaService } from '../Services/prisma.service';
import { PesagemService } from 'src/Services/pesagem.service';

@Module({
  controllers: [DesafioController],
  providers: [PrismaService, DesafioService, PesagemService],
})
export class DesafioModule {}
